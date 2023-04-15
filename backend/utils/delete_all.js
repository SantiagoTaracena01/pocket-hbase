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

const delete_all = (table, rowKey) => {
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

  const entriesToDelete = json.entries.filter(
    (entry) => entry.rowkey === rowKey
  )
  const entriesToKeep = json.entries.filter((entry) => entry.rowkey !== rowKey)
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
}

module.exports = { delete_all }
