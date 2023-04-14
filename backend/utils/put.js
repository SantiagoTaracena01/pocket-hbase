/**
 * Universidad del Valle de Guatemala
 * (CC3089) Bases de Datos 2
 * Proyecto 2 - Pocket HBase
 * Miembros del grupo 7:
 *   - Pedro Pablo Arriola Jiménez (20188)
 *   - Marco Pablo Orozco Saravia (20857)
 *   - Santiago Taracena Puga (20017)
 */

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
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  const [columnFamily, columnQualifier] = columnInfo.split(':')

  if (!json.columnFamilies.includes(columnFamily)) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Column family "${columnFamily}" does not exist in table "${table}"`,
    }
  }

  json.updated = new Date().getTime()

  const entryToUpdate = json.entries.find(
    (entry) =>
      entry.rowkey === rowKey &&
      entry.columnfamily === columnFamily &&
      entry.columnqualifier === columnQualifier
  )
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
    method: 'put',
    status: 'ok',
    type: 'table',
    data: { entries: [entryToReturn] },
  }
}

module.exports = { put }
