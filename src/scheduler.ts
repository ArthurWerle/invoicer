import schedule from 'node-schedule'
import { exec } from 'child_process'
import { promisify } from 'util'

const EVERY_14TH_DAY_OF_MONTH = '0 0 14 * *'

const execAsync = promisify(exec)

async function task() {
  try {
    console.log(`Running monthly task on ${new Date().toISOString()}`)

    const { stdout, stderr } = await execAsync('npx ts-node ./index.ts')

    if (stdout) console.log(`Task output: ${stdout}`)
    if (stderr) console.error(`Task errors: ${stderr}`)
  } catch (error) {
    console.error('Execution error:', error)
  }
}

const job = schedule.scheduleJob(EVERY_14TH_DAY_OF_MONTH, task)

process.on('SIGINT', () => {
  console.log('Shutting down scheduler...')
  job.cancel()
  process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})
