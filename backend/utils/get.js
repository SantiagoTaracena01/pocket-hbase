const fs = require('fs')

const get = (tableName, rowKey) => {
  const path = `./public/hfile-table-${tableName}.json`
  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)
  const entries = json.entries.filter((entry) => entry.rowkey === rowKey)

  return {
    method: 'get',
    status: 'ok',
    type: 'table',
    data: { entries: entries },
  }
}

module.exports = { get }
