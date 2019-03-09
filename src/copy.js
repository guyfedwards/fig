const clipboardy = require('clipboardy')
const get = require('./get')

const open = async ([ name ]) => {
  if (!name) {
    throw `Usage: \n$ fig copy <name>`
  }

  const url = await get([name])
  clipboardy.writeSync(url)

  return `Copied ${name} to clipboard!`
}

module.exports = open
