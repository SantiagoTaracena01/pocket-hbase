const fs = require('fs')
const { list } = require('./list')

const create = (table, columnFamilies) => {

  const tables = list().data

  if (tables.includes(table)) {
    return {
      method: 'create',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" already exists`,
    }
  }

  const data = {
    tableName: table,
    columnFamilies: columnFamilies,
    enabled: true,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    entries: [],
  }

  const path = `./public/hfile-table-${table}.json`

  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'create',
    status: 'ok',
    type: 'individual',
    data: `Succesfully created table "${table}"`,
  }
}

module.exports = { create }
