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
const { enable } = require('./enable')
const { drop } = require('./drop')
const { create } = require('./create')

const truncate = (table) => {
  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'truncate',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" does not exist`,
    }
  }

  const data = fs.readFileSync(`./public/hfile-table-${table}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)

  if (!json.enabled) {
    return {
      method: 'truncate',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is not enabled`,
    }
  }

  const columnFamilies = json.columnFamilies

  enable(table)
  drop(table)
  create(table, columnFamilies)

  return {
    method: 'truncate',
    status: 'ok',
    type: 'individual',
    data: `Table "${table}" has been truncated`,
  }
}

module.exports = { truncate }
