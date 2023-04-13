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

const get = (table, rowKey) => {
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

  const entries = json.entries.filter((entry) => entry.rowkey === rowKey)

  if (entries.length === 0) {
    return {
      method: 'get',
      status: 'error',
      type: 'individual',
      data: `Row key "${rowKey}" does not exist in table "${table}"`,
    }
  }

  return {
    method: 'get',
    status: 'ok',
    type: 'table',
    data: { entries: entries },
  }
}

module.exports = { get }
