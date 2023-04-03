const fs = require('fs')

const create = (tableName, columnFamilies) => {
  const data = { tableName: tableName, columnFamilies: columnFamilies, enabled: true }
  const path = `./public/hfile-table-${tableName}.json`
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })
  console.log('everything is ok')
  return { method: 'create', status: 'ok', result: data }
}

module.exports = { create }
