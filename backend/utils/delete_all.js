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

const delete_all = (table, rowKey, args = []) => {
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

  json.updated = new Date().getTime()

  if (args.length === 0) {
    const entriesToDelete = json.entries.filter(
      (entry) => entry.rowkey === rowKey
    )
    const entriesToKeep = json.entries.filter(
      (entry) => entry.rowkey !== rowKey
    )
    json.entries = entriesToKeep

    fs.writeFile(path, JSON.stringify(json), (err) => {
      if (err) {
        console.log(err)
      }
    })

    if (entriesToDelete.length === 0) {
      return {
        method: 'delete',
        status: 'warning',
        type: 'individual',
        data: `No entries found in table "${table}" with rowkey "${rowKey}"`,
      }
    }

    return {
      method: 'delete',
      status: 'ok',
      type: 'individual',
      data: `Succesfully deleted ${entriesToDelete.length} entries from table "${table}"`,
    }
  } else if (args.length === 1) {
    const [columnFamily, columnQualifier] = args[0].split(':')
    const entriesToDelete = json.entries.filter(
      (entry) =>
        entry.rowkey === rowKey &&
        entry.columnfamily === columnFamily &&
        entry.columnqualifier === columnQualifier
    )
    const entriesToKeep = json.entries.filter(
      (entry) =>
        entry.rowkey !== rowKey ||
        entry.columnfamily !== columnFamily ||
        entry.columnqualifier !== columnQualifier
    )
    json.entries = entriesToKeep

    fs.writeFile(path, JSON.stringify(json), (err) => {
      if (err) {
        console.log(err)
      }
    })

    if (entriesToDelete.length === 0) {
      return {
        method: 'delete',
        status: 'warning',
        type: 'individual',
        data: `No entries found in table "${table}" with rowkey "${rowKey}", column family "${columnFamily}" and column qualifier "${columnQualifier}"`,
      }
    }

    return {
      method: 'delete',
      status: 'ok',
      type: 'individual',
      data: `Succesfully deleted ${entriesToDelete.length} entries from table "${table}"`,
    }
  } else if (args.length === 2) {
    const [columnFamily, columnQualifier] = args[0].split(':')
    const timestamp = args[1]
    const entriesToDelete = json.entries.filter(
      (entry) =>
        entry.rowkey === rowKey &&
        entry.columnfamily === columnFamily &&
        entry.columnqualifier === columnQualifier &&
        entry.timestamp === timestamp
    )
    const entriesToKeep = json.entries.filter(
      (entry) =>
        entry.rowkey !== rowKey ||
        entry.columnfamily !== columnFamily ||
        entry.columnqualifier !== columnQualifier ||
        entry.timestamp !== timestamp
    )
    json.entries = entriesToKeep

    fs.writeFile(path, JSON.stringify(json), (err) => {
      if (err) {
        console.log(err)
      }
    })

    if (entriesToDelete.length === 0) {
      return {
        method: 'delete',
        status: 'warning',
        type: 'individual',
        data: `No entries found in table "${table}" with rowkey "${rowKey}", column family "${columnFamily}", column qualifier "${columnQualifier}" and timestamp "${timestamp}"`,
      }
    }

    return {
      method: 'delete',
      status: 'ok',
      type: 'individual',
      data: `Succesfully deleted ${entriesToDelete.length} entries from table "${table}"`,
    }
  } else {
    return {
      method: 'delete',
      status: 'error',
      type: 'individual',
      data: `Cannot execute delete with ${args.length} arguments`,
    }
  }
}

module.exports = { delete_all }
