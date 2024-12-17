import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'

export class PDFService {
  static async generateInvoicePDF(invoiceData: {
    invoiceNumber: string
    recieverName: string
    recieverEmail: string
    totalAmount: number
  }): Promise<string> {
    // Ensure invoices directory exists
    const invoiceDir = path.join(process.cwd(), 'invoices')
    await fs.mkdir(invoiceDir, { recursive: true })

    // Create PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Set font and draw text
    page.setFont(font)
    page.drawText(`Invoice: ${invoiceData.invoiceNumber}`, {
      x: 50,
      y: height - 100,
      size: 24,
      color: rgb(0, 0, 0),
    })

    page.drawText(`Customer: ${invoiceData.recieverName}`, {
      x: 50,
      y: height - 150,
      size: 12,
      color: rgb(0, 0, 0),
    })

    page.drawText(`Email: ${invoiceData.recieverEmail}`, {
      x: 50,
      y: height - 170,
      size: 12,
      color: rgb(0, 0, 0),
    })

    page.drawText(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`, {
      x: 50,
      y: height - 200,
      size: 16,
      color: rgb(0, 0, 0),
    })

    // Save PDF
    const pdfPath = path.join(invoiceDir, `${invoiceData.invoiceNumber}.pdf`)
    const pdfBytes = await pdfDoc.save()
    await fs.writeFile(pdfPath, pdfBytes)

    return pdfPath
  }
}
