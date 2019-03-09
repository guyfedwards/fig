const opn = require('opn')
const get = require('./get')

const open = async ([name]) => {
  if (!name) {
    throw `Usage: \n$ fig open <name>`
  }
  const url = await get([name])
  opn(url)
}

module.exports = open
