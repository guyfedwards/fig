const db = require('./db')

const add = ([name, url], flags) => {
  if (!name || !url) {
    throw `Usage: \n$ fig add <name> <url>`
  }

  return db.add(name, url, flags.force)
    .then(() => {
      return `${name} added`
    })
    .catch(err => {
      return err
    })
}

module.exports = add
