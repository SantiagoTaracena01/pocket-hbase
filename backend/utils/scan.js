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

const scan = (table, startRow = null, endRow = null) => {
  const tables = list().data

  if (!tables.includes(table)) {
    return {
      method: 'scan',
      status: 'error',
      type: 'individual',
      data: `Table "\${table}" does not exist`,
    }
  }

  const path = `./public/hfile-table-${table}.json`

  try {
    const data = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(data)

    if (!json.enabled) {
      return {
        method: 'scan',
        status: 'error',
        type: 'individual',
        data: `Table "\${table}" is disabled`,
      }
    }

    const entries = json.entries || []

    const filteredEntries = entries.filter((entry) => {
      if (startRow && entry.rowkey < startRow) {
        return false
      }
      if (endRow && entry.rowkey > endRow) {
        return false
      }
      return true
    })

    const results = filteredEntries.reduce((acc, entry) => {
      if (!acc[entry.rowkey]) {
        acc[entry.rowkey] = {}
      }
      if (!acc[entry.rowkey][entry.columnfamily]) {
        acc[entry.rowkey][entry.columnfamily] = {}
      }
      acc[entry.rowkey][entry.columnfamily][entry.columnqualifier] = {
        value: entry.value,
        timestamp: entry.timestamp,
      }
      return acc
    }, {})

    return {
      method: 'scan',
      status: 'ok',
      type: 'table',
      data: results,
    }
  } catch (err) {
    console.error(err)
    return {
      method: 'scan',
      status: 'error',
      type: 'individual',
      data: `An error occurred while scanning the table "\${table}"`,
    }
  }
}

module.exports = { scan }
