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

const list = () => {
  const files = fs.readdirSync('./public')
  const tables = files.filter((file) => file.startsWith('hfile-table-'))
  const tableNames = tables.map((table) =>
    table.replace('hfile-table-', '').replace('.json', '')
  )

  return {
    method: 'list',
    status: 'ok',
    type: 'array',
    data: tableNames,
  }
}

module.exports = { list }
