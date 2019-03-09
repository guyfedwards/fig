const fs = require('fs')
const os = require('os')
const path = require('path')
const { promisify } = require('util')
const { configDir } = require('./config')

const writeFileP = promisify(fs.writeFile)
const readFileP = promisify(fs.readFile)

const dbPath = path.join(configDir, 'fig.db')

const getAll = () => {
  return readFileP(dbPath, {encoding: 'utf8', flag: 'a+'})
    .then(data => {
      return data ? JSON.parse(data) : {}
    })
    .catch(err => {
      throw new Error(err)
      process.exit(1)
    })
}

const getOne = async name => {
  const all = await getAll()
  if (!all[name]) {
    throw `${name} does not exist.`
  }
  return all[name]
}

const add = async (name, url, force) => {
  const all = await getAll()

  if (all[name] && !force) {
    throw `${name} already exists, use --force to override.`
  }

  const data = JSON.stringify({
    ...all,
    [name]: {
      url
    }
  })

  return writeFileP(dbPath, data, 'utf8')
    .catch(err => {
      throw new Error(err)
      process.exit(1)
    })
}


module.exports = {
  add,
  getAll,
  getOne
}
