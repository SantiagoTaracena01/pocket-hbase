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

  const re = new RegExp(regex)
  let count = 0

  tables.forEach((table) => {
    if (re.test(table)) {
      let path = `./public/hfile-table-${table}.json`

      let data = fs.readFileSync(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
      })

      let json = JSON.parse(data)
      if (!json.enabled) return

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
    data: `Succesfully dropped ${count} tables matching regex "${regex}"`,
  }
}

module.exports = { drop_all }
