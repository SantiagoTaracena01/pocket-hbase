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

const scan = (table) => {
  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'scan',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" does not exist`,
    }
  }

  const path = `./public/hfile-table-${table}.json`

  const data = fs.readFileSync(path, 'utf8')
  const json = JSON.parse(data)

  if (!json.enabled) {
    return {
      method: 'scan',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  return {
    method: 'scan',
    status: 'ok',
    type: 'scan',
    data: { entries: json.entries },
  }
}

module.exports = { scan }
