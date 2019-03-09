const db = require('./db')

const get = ([ name ]) => {
  return db.getOne(name)
    .then(item => {
      return item.url
    })
    .catch(err => {
      return err
    })
}

module.exports = get
