const fs = require('fs')
const { list } = require('./list')

const put_many = (table, newData) => {
  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'put_many',
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

  if (!json.enabled) {
    return {
      method: 'put_many',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  const rowKeys = newData.filter((_, index) => index % 3 == 0)
  const columnInfos = newData.filter((_, index) => index % 3 == 1)
  const values = newData.filter((_, index) => index % 3 == 2)

  if (rowKeys.length != columnInfos.length || rowKeys.length != values.length) {
    return {
      method: 'put_many',
      status: 'error',
      type: 'individual',
      data: `Invalid data format`,
    }
  }

  const entries = []

  for (let i = 0; i < rowKeys.length; i++) {
    const [columnFamily, columnQualifier] = columnInfos[i].split(':')

    if (!json.columnFamilies.includes(columnFamily)) {
      return {
        method: 'put_many',
        status: 'error',
        type: 'individual',
        data: `Column family "${columnFamily}" does not exist in table "${table}"`,
      }
    }
  
    const entry = {
      rowkey: rowKeys[i],
      columnfamily: columnFamily,
      columnqualifier: columnQualifier,
      value: values[i],
      timestamp: new Date().getTime(),
    }

    entries.push(entry)
  }

  entries.forEach((entry) => {
    const entryToUpdate = json.entries.find(
      (jsonEntry) =>
        entry.rowkey === jsonEntry.rowkey &&
        entry.columnfamily === jsonEntry.columnfamily &&
        entry.columnqualifier === jsonEntry.columnqualifier
    )

    if (entryToUpdate) {
      const indexToRemove = json.entries.indexOf(entryToUpdate)
      json.entries.splice(indexToRemove, 1)
    }

    json.entries.push(entry)
  })

  json.updated = new Date().getTime()

  json.entries.sort((a, b) => {
    if (a.rowkey < b.rowkey) {
      return -1
    }
    if (a.rowkey > b.rowkey) {
      return 1
    }
    return 0
  })

  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'put_many',
    status: 'ok',
    type: 'individual',
    data: `Successfully put all data in table "${table}"`,
  }
}

module.exports = { put_many }
