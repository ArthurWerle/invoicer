import express, { Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import nodemailer from "nodemailer"
import { Sequelize, DataTypes } from "sequelize"

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize("postgres://postgres:admin@localhost:5432/invoicer");

const Invoice = sequelize.define("Invoice", {
  title: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  sent: DataTypes.BOOLEAN,
  month: DataTypes.INTEGER,
});


app.post("/send-email", async (req: Request, res: Response) => {
  const { email, title, quantity, price } = req.body;
  const total = quantity * price;
  const transporter = nodemailer.createTransport({ /* SMTP settings */ });

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Your Invoice",
    text: `Invoice: ${title}\nTotal: ${total}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent");
  });
});


app.post("/invoices", async (req: Request, res: Response) => {
  const { title, quantity, price } = req.body;
  const currentMonth = new Date().getMonth();
  
  const existingInvoice = await Invoice.findOne({ where: { month: currentMonth } });
  if (existingInvoice) {
    return res.status(400).send("Invoice already sent this month");
  }

  await Invoice.create({ title, quantity, price, sent: true, month: currentMonth });
  res.status(201).send("Invoice saved and email sent");
});

app.listen(4000, () => console.log("Server running on port 4000"));
