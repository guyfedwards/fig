const columns = require('cli-columns')
const db = require('./db')

const list = ([], flags) => {
  return db.getAll()
    .then(all => {
      return columns(Object.keys(all).sort(), { width: 60 })
    })
    .catch(err => {
      if (!flags.silent) {
        return err
      }
    })
}

module.exports = list
