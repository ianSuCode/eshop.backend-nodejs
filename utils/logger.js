const { format } = require('date-fns')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const _levels = ['info', 'warn', 'error']

const writeLog = async (level, message) => {
  try {
    if (_levels.indexOf(level) === -1)
      throw new Error('The Parameter Is Incorrect!')

    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', `${level}.log`),
      `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}\t${message}\n`
    )
  } catch (err) {
    console.error(err)
  }
}

const writeInfo = async (message) => await writeLog('info', message)
const writeWarn = async (message) => await writeLog('warn', message)
const writeError = async (message) => await writeLog('error', message)

module.exports = { writeInfo, writeWarn, writeError }
