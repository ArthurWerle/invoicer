import Invoice from '../models/invoice.model';
import { InvoiceNumberGenerator } from '../utils/invoice-number-generator';
import { PDFService } from './pdf.service';
import { EmailService } from './email.service';

export class InvoiceService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async createAndSendInvoice(customerData: {
    customerName: string;
    customerEmail: string;
    totalAmount: number;
  }) {
    try {
      // Generate invoice number
      const invoiceNumber = await InvoiceNumberGenerator.generateInvoiceNumber();

      // Generate PDF
      const pdfPath = await PDFService.generateInvoicePDF({
        ...customerData,
        invoiceNumber
      });

      // Create invoice record
      const invoice = await Invoice.create({
        ...customerData,
        invoiceNumber,
        filePath: pdfPath,
        sent: false
      });

      // Send email
      const messageId = await this.emailService.sendInvoiceEmail({
        invoiceNumber,
        customerEmail: customerData.customerEmail,
        pdfPath
      });

      // Update invoice as sent
      await invoice.update({ sent: true });

      return { invoice, messageId };
    } catch (error) {
      console.error('Error creating and sending invoice:', error);
      throw error;
    }
  }
}