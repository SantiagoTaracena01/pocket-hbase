const fs = require('fs')

const put = (tableName, rowKey, columnInfo, value) => {

  const [columnFamily, columnQualifier] = columnInfo
    .replace('<', '')
    .replace('>', '')
    .split(':')

  const path = `./public/hfile-table-${tableName}.json`

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)

  if (!json.enabled) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Table "${tableName}" is disabled`,
    }
  }

  const entryToUpdate = json.entries.find((entry) => entry.rowkey === rowKey && entry.columnfamily === columnFamily && entry.columnqualifier === columnQualifier)
  let entryToReturn = entryToUpdate

  if (entryToUpdate) {
    const indexToRemove = json.entries.indexOf(entryToUpdate)
    json.entries.splice(indexToRemove, 1)
    entryToUpdate.value = value
    json.entries.push(entryToUpdate)
  } else {
    entryToReturn = {
      rowkey: rowKey,
      columnfamily: columnFamily,
      columnqualifier: columnQualifier,
      value: value,
    }
    json.entries.push(entryToReturn) 
  }

  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'put',
    status: 'ok',
    type: 'table',
    data: { entries: [entryToReturn] },
  }
}

module.exports = { put }
