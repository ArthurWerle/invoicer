import AWS from 'aws-sdk';
import fs from 'fs';

export class EmailService {
  private ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({
      region: process.env.AWS_REGION || 'us-east-1'
    });
  }

  async sendInvoiceEmail(params: {
    invoiceNumber: string;
    customerEmail: string;
    pdfPath: string;
  }): Promise<string> {
    const { invoiceNumber, customerEmail, pdfPath } = params;

    const emailParams: AWS.SES.SendEmailRequest = {
      Source: process.env.SENDER_EMAIL || 'sender@example.com',
      Destination: {
        ToAddresses: [customerEmail]
      },
      Message: {
        Subject: {
          Data: `Invoice ${invoiceNumber}`
        },
        Body: {
          Text: {
            Data: `Please find attached invoice ${invoiceNumber}`
          }
        }
      },
      Attachments: [
        {
          Filename: `${invoiceNumber}.pdf`,
          Content: fs.readFileSync(pdfPath)
        }
      ]
    };

    try {
      const result = await this.ses.sendEmail(emailParams).promise();
      return result.MessageId || '';
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}