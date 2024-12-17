import Invoice from '../models/invoice.model'
import { InvoiceNumberGenerator } from '../utils/invoice-number-generator'
import { PDFService } from './pdf.service'
import { EmailService } from './email.service'
import Reciever from '../models/reciever.model'
import Sender from '../models/sender.model'

export class InvoiceService {
  private emailService: EmailService
  private number: string
  private pdfPath: string
  private reciever: Reciever | null
  private sender: Sender | null
  private price: number

  constructor() {
    this.emailService = new EmailService()
    this.number = '0'
    this.pdfPath = ''
    this.price = 0
    this.reciever = null
    this.sender = null
  }

  setSender(sender: Sender) {
    this.sender = sender

    return this
  }

  setReciever(reciever: Reciever) {
    this.reciever = reciever

    return this
  }

  setPrice(price: number) {
    this.price = price

    return this
  }

  async send() {
    try {
      if (!this.reciever?.email) {
        throw new Error('No reciever email found :(')
      }

      const messageId = await this.emailService.sendInvoiceEmail({
        invoiceNumber: this.number,
        receiverEmail: this.reciever?.email,
        pdfPath: this.pdfPath,
      })

      return messageId
    } catch (e) {
      console.error(e)
      throw new Error('Error sending invoice!')
    }
  }

  async create() {
    try {
      const invoiceNumber = await InvoiceNumberGenerator.generateInvoiceNumber()

      if (!this.reciever) {
        throw new Error(
          'You need to add a reciever in order to create an invoice'
        )
      }

      if (!this.sender) {
        throw new Error(
          'You need to add a sender in order to create an invoice'
        )
      }

      if (!this.price) {
        throw new Error('You need to add a price in order to create an invoice')
      }

      const pdfPath = await PDFService.generateInvoicePDF({
        invoiceNumber,
        recieverName: this.reciever?.name,
        recieverEmail: this.reciever?.email,
        totalAmount: this.price,
      })

      const invoice = await Invoice.create({
        recieverId: this.reciever.id,
        senderId: this.sender?.id,
        invoiceNumber,
        totalAmount: this.price,
        filePath: pdfPath,
        sent: false,
      })

      await invoice.update({ sent: true })

      return this
    } catch (error) {
      console.error('Error creating and sending invoice:', error)
      throw error
    }
  }
}
