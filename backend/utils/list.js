const fs = require('fs')

const list = () => {
  const files = fs.readdirSync('./public')
  const tables = files.filter((file) => file.startsWith('hfile-table-'))
  const tableNames = tables.map((table) => table.replace('hfile-table-', '').replace('.json', ''))
  return {
    method: 'list',
    status: 'ok',
    type: 'array',
    data: { entries: tableNames },
  }
}

module.exports = { list }
