const fs = require('fs')
const { list } = require('./list')

const drop = (table) => {

  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'disable',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" does not exist`,
    }
  }

  const path = `./public/hfile-table-${table}.json`

  fs.unlinkSync(path)

  return {
    method: 'drop',
    status: 'ok',
    type: 'individual',
    data: `Succesfully dropped table "${table}"`,
  }
}

module.exports = { drop }
