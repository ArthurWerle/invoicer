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

export interface RecieverAttributes {
  id?: number
  name: string
  responsiblePersonName?: string
  country?: string
  email: string
  active: boolean
}

@Table({
  tableName: 'receivers',
  timestamps: true,
})
class Customer extends Model<RecieverAttributes> {
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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active!: boolean

  @HasMany(() => Invoice)
  invoices?: Invoice[]
}

export default Customer
