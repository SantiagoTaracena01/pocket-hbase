const fs = require('fs')
const { list } = require('./list')

const put = (table, rowKey, columnInfo, value) => {

  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'disable',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" does not exist`,
    }
  }

  const [columnFamily, columnQualifier] = columnInfo.split(':')

  const path = `./public/hfile-table-${table}.json`

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)

  if (!json.columnFamilies.includes(columnFamily)) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Column family "${columnFamily}" does not exist in table "${table}"`,
    }
  }

  if (!json.enabled) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  json.updated = new Date().getTime()

  const entryToUpdate = json.entries.find((entry) => entry.rowkey === rowKey && entry.columnfamily === columnFamily && entry.columnqualifier === columnQualifier)
  let entryToReturn = entryToUpdate

  if (entryToUpdate) {

    const indexToRemove = json.entries.indexOf(entryToUpdate)
    json.entries.splice(indexToRemove, 1)
    entryToUpdate.value = value
    entryToUpdate.timestamp = new Date().getTime()
    json.entries.push(entryToUpdate)

  } else {

    entryToReturn = {
      rowkey: rowKey,
      columnfamily: columnFamily,
      columnqualifier: columnQualifier,
      value: value,
      timestamp: new Date().getTime(),
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
