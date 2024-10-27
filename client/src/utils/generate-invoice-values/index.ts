import { format, setDate } from 'date-fns'
import { InvoiceData } from '@interfaces/invoice'

export const generateDynamicInvoiceValues = (): InvoiceData => {
  const today = new Date()
  const currentMonth = format(today, 'MMMM')
  const currentYear = format(today, 'yyyy')
  
  const dueDate = setDate(today, 28)
  
  return {
    invoiceNumber: "0018",
    issueDate: format(today, 'yyyy-MM-dd'),
    dueDate: format(dueDate, 'yyyy-MM-dd'),
    fromCompany: import.meta.env.VITE_FROM_COMPANY,
    fromName: import.meta.env.VITE_FROM_NAME,
    fromCountry: import.meta.env.VITE_FROM_COUNTRY,
    fromEmail: import.meta.env.VITE_FROM_EMAIL,
    toCompany: import.meta.env.VITE_TO_COMPANY,
    toName: import.meta.env.VITE_TO_NAME,
    toCountry: import.meta.env.VITE_TO_COUNTRY,
    toEmail: import.meta.env.VITE_TO_EMAIL,
    items: [
      {
        description: `${currentMonth} ${currentYear} Coding & Programming`,
        quantity: 1,
        unitPrice: Number(import.meta.env.VITE_VALUE),
        total: Number(import.meta.env.VITE_VALUE)
      }
    ]
  }
}