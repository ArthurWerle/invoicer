import { Op } from 'sequelize';
import Invoice from '../models/invoice.model';

export class InvoiceNumberGenerator {
  static async generateInvoiceNumber(): Promise<string> {
    const currentDate = new Date();
    const yearMonth = currentDate.toISOString().slice(0, 7).replace('-', '');

    // Find the last invoice for this month
    const lastInvoice = await Invoice.findOne({
      where: {
        invoiceNumber: {
          [Op.like]: `INV-${yearMonth}%`
        }
      },
      order: [['id', 'DESC']]
    });

    let sequenceNumber = 1;
    if (lastInvoice) {
      const lastInvoiceNumber = lastInvoice.invoiceNumber;
      const lastSequence = parseInt(lastInvoiceNumber.split('-')[2], 10);
      sequenceNumber = lastSequence + 1;
    }

    return `INV-${yearMonth}-${sequenceNumber.toString().padStart(4, '0')}`;
  }
}