import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  PrimaryKey, 
  AutoIncrement 
} from 'sequelize-typescript';
import { InvoiceAttributes } from '../types/invoice.type';

@Table({
  tableName: 'invoices',
  timestamps: true
})
class Invoice extends Model<InvoiceAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  invoiceNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  customerName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  customerEmail!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  filePath?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  sent?: boolean;
}

export default Invoice;