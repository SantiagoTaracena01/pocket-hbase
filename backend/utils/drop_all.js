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

const drop_all = (regex) => {
  const tables = list().data

  if (tables.length === 0) {
    return {
      method: 'drop_all',
      status: 'error',
      type: 'individual',
      data: `No tables exist`,
    }
  }

  const re = new RegExp(regex)
  let count = 0

  tables.forEach((table) => {
    if (re.test(table)) {
      let path = `./public/hfile-table-${table}.json`
      fs.unlinkSync(path)
      count++
    }
  })

  if (count === 0) {
    return {
      method: 'drop_all',
      status: 'warning',
      type: 'individual',
      data: `No tables matched regex "${regex}"`,
    }
  }

  return {
    method: 'drop_all',
    status: 'ok',
    type: 'individual',
    data: `Succesfully dropped all tables matching regex "${regex}"`,
  }
}

module.exports = { drop_all }
