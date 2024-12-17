import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'invoiceuser',
  password: process.env.DB_PASSWORD || 'invoicepass',
  database: process.env.DB_NAME || 'invoicedb',
  models: [path.join(__dirname, '../models')],
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
})

export async function initDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully.')

    await sequelize.sync({ alter: true })
    console.log('Database models synchronized.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}
