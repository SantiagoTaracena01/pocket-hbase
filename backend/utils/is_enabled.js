const fs = require('fs')
const { list } = require('./list')

const is_enabled = (table) => {

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

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)

  return {
    method: 'is_enabled',
    status: 'ok',
    type: 'individual',
    data: (json.enabled) ? `Table "${table}" is enabled` : `Table "${table}" is disabled`,
  }
}

module.exports = { is_enabled }
