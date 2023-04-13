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

const create = (table, columnFamilies) => {
  if (columnFamilies.length === 0) {
    return {
      method: 'create',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" must have at least one column family`,
    }
  }

  const tables = list().data

  if (tables.includes(table)) {
    return {
      method: 'create',
      status: 'warning',
      type: 'individual',
      data: `Table "${table}" already exists`,
    }
  }

  const data = {
    tableName: table,
    columnFamilies: columnFamilies,
    enabled: true,
    created: new Date().getTime(),
    updated: new Date().getTime(),
    entries: [],
  }

  const path = `./public/hfile-table-${table}.json`

  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'create',
    status: 'ok',
    type: 'individual',
    data: `Succesfully created table "${table}"`,
  }
}

module.exports = { create }
