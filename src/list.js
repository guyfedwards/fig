const db = require('./db')

const list = ([ name ]) => {
  return db.getAll()
    .then(all => {
      return Object.keys(all).join('\n')
    })
    .catch(err => {
      return err
    })
}

module.exports = list
