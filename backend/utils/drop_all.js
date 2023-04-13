const fs = require('fs')
const { list } = require('./list')

const drop_all = (regex) => {
  const tables = list().data

  if (tables.length === 0) {
    return {
      method: 'drop_all',
      status: 'error',
      type: 'individual',
      data: `No tables exist`,
    }
  }

  const re = new RegExp(regex)
  let count = 0

  tables.forEach((table) => {
    if (re.test(table)) {
      let path = `./public/hfile-table-${table}.json`
      fs.unlinkSync(path)
      count++
    }
  })

  if (count === 0) {
    return {
      method: 'drop_all',
      status: 'warning',
      type: 'individual',
      data: `No tables match regex "${regex}"`,
    }
  }

  return {
    method: 'drop_all',
    status: 'ok',
    type: 'individual',
    data: `Succesfully dropped all tables matching regex "${regex}"`,
  }
}

module.exports = { drop_all }
