import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import Reciever from './reciever.model'
import Sender from './sender.model'

export interface InvoiceAttributes {
  id?: number
  invoiceNumber: string
  senderId: number
  recieverId: number
  totalAmount: number
  filePath?: string
  sent?: boolean
}

@Table({
  tableName: 'invoices',
  timestamps: true,
})
class Invoice extends Model<InvoiceAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  invoiceNumber!: string

  @ForeignKey(() => Sender)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  senderId!: number

  @BelongsTo(() => Sender)
  sender?: Sender

  @ForeignKey(() => Reciever)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recieverId!: number

  @BelongsTo(() => Reciever)
  reciever?: Reciever

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalAmount!: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  filePath?: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  sent?: boolean
}

export default Invoice
