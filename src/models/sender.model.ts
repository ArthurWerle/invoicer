import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript'
import Invoice from './invoice.model'

export interface SenderAttributes {
  id?: number
  name: string
  responsiblePersonName?: string
  country?: string
  email: string
}

@Table({
  tableName: 'senders',
  timestamps: true,
})
class Receiver extends Model<SenderAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  responsiblePersonName?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country?: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string

  @HasMany(() => Invoice)
  invoices?: Invoice[]
}

export default Receiver
