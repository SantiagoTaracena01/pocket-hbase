const fs = require('fs')

const create = (tableName, columnFamilies) => {
  const data = {
    tableName: tableName,
    columnFamilies: columnFamilies,
    enabled: true,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    entries: [],
  }
  const path = `./public/hfile-table-${tableName}.json`
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })
  return {
    method: 'create',
    status: 'ok',
    type: 'individual',
    data: `Succesfully created table "${tableName}"`,
  }
}

module.exports = { create }
