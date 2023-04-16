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

const alter = (table, type, columnFamily, newColumnFamily) => {
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
      method: 'alter',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  if (!columnFamily) {
    return {
      method: 'alter',
      status: 'error',
      type: 'individual',
      data: `Column family must be specified for alter operation`,
    }
  }

  switch (type) {
    case 'add':
      if (json.columnFamilies.includes(columnFamily)) {
        return {
          method: 'alter',
          status: 'warning',
          type: 'individual',
          data: `Column family "${columnFamily}" already exists in table "${table}"`,
        }
      }
      json.columnFamilies.push(columnFamily)
      json.updated = new Date().getTime()

      fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) {
          console.log(err)
        }
      })    

      return {
        method: 'alter',
        status: 'ok',
        type: 'individual',
        data: `Column family "${columnFamily}" added to table "${table}"`,
      }

    case 'update':
      if (!newColumnFamily) {
        return {
          method: 'alter',
          status: 'error',
          type: 'individual',
          data: `New column family must be specified for update operation`,
        }
      }
      if (!json.columnFamilies.includes(columnFamily)) {
        return {
          method: 'alter',
          status: 'warning',
          type: 'individual',
          data: `Column family "${columnFamily}" does not exist in table "${table}"`,
        }
      }
      if (json.columnFamilies.includes(newColumnFamily)) {
        return {
          method: 'alter',
          status: 'warning',
          type: 'individual',
          data: `Column family "${newColumnFamily}" already exists in table "${table}"`,
        }
      }
      json.columnFamilies = json.columnFamilies.map((cf) =>
        cf === columnFamily ? newColumnFamily : cf
      )
      json.entries = json.entries.map((entry) =>
        entry.columnfamily === columnFamily
          ? { ...entry, columnfamily: newColumnFamily }
          : entry
      )
      json.updated = new Date().getTime()

      fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) {
          console.log(err)
        }
      })

      return {
        method: 'alter',
        status: 'ok',
        type: 'individual',
        data: `Column family "${columnFamily}" updated to "${newColumnFamily}" in table "${table}"`,
      }

    case 'delete':
      if (!json.columnFamilies.includes(columnFamily)) {
        return {
          method: 'alter',
          status: 'warning',
          type: 'individual',
          data: `Column family "${columnFamily}" does not exist in table "${table}"`,
        }
      }
      json.columnFamilies = json.columnFamilies.filter(
        (cf) => cf !== columnFamily
      )
      json.entries = json.entries.filter(
        (entry) => entry.columnfamily !== columnFamily
      )
      json.updated = new Date().getTime()

      fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) {
          console.log(err)
        }
      })    

      return {
        method: 'alter',
        status: 'ok',
        type: 'individual',
        data: `Column family "${columnFamily}" and entries deleted from table "${table}"`,
      }

    default:
      return {
        method: 'alter',
        status: 'error',
        type: 'individual',
        data: `Invalid alter operation type "${type}"`,
      }
  }
}

module.exports = { alter }
