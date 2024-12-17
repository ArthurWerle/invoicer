import generateInvoice from './app'
import { initDatabase } from './config/database'
import dotenv from 'dotenv'

dotenv.config()

async function run() {
  try {
    await initDatabase()
    await generateInvoice()
  } catch (error) {
    console.error('Failed to run:', error)
    process.exit(1)
  }
}

run()
