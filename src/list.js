const db = require('./db')

const list = ([], flags) => {
  return db.getAll()
    .then(all => {
      return Object.keys(all).sort().join('\n')
    })
    .catch(err => {
      if (!flags.silent) {
        return err
      }
    })
}

module.exports = list
