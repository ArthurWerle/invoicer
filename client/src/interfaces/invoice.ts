export type InvoiceData = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromCompany: string;
  fromName: string;
  fromCountry: string;
  fromEmail: string;
  toCompany: string;
  toName: string;
  toCountry: string;
  toEmail: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}