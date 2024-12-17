import { InvoiceService } from './services/invoice.service'
import { Op } from 'sequelize'
import Sender from './models/sender.model'
import Reciever from './models/reciever.model'
import Price from './models/price.model'

const invoiceService = new InvoiceService()

const generateInvoice = async () => {
  try {
    const sender = await Sender.findOne()

    if (!sender) throw new Error("Couldn't find any sender!")

    const activeReciever = await Reciever.findOne({
      where: {
        active: {
          [Op.eq]: true,
        },
      },
    })

    if (!activeReciever) throw new Error("Couldn't find any active reciever!")

    const activePrice = await Price.findOne({
      where: {
        active: {
          [Op.eq]: true,
        },
      },
    })

    if (!activePrice) throw new Error("Couldn't find any active price!")

    const result = await invoiceService
      .setSender(sender)
      .setReciever(activeReciever)
      .setPrice(activePrice.value)
      .create()
      .then(({ send }) => send())

    console.log('Done!', { result })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default generateInvoice
