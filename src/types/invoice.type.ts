export interface InvoiceAttributes {
  id?: number;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  invoiceDate?: Date;
  filePath?: string;
  sent?: boolean;
}