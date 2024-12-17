import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

export interface PriceAttributes {
  id?: number
  value: number
  active: boolean
}

@Table({
  tableName: 'price',
  timestamps: true,
})
class Customer extends Model<PriceAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  value!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active!: boolean
}

export default Customer
