const db = require('./db')

const get = ([ name ], { silent }) => {
  if (!name) {
    throw `Usage: \n$ fig get <name>`
  }

  return db.getOne(name)
    .then(item => {
      return item.url
    })
    .catch(err => {
      if (!silent) {
        return err
      }
    })
}

module.exports = get
