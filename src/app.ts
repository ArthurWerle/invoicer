import express from 'express';
import { InvoiceService } from './services/invoice.service';

const app = express();
app.use(express.json());

const invoiceService = new InvoiceService();

app.post('/invoices', async (req, res) => {
  try {
    const { customerName, customerEmail, totalAmount } = req.body;
    
    const result = await invoiceService.createAndSendInvoice({
      customerName,
      customerEmail,
      totalAmount
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

export default app;