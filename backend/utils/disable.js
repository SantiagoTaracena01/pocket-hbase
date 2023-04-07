const fs = require('fs')

const disable = (table) => {

  const path = `./public/hfile-table-${table}.json`

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)
  json.enabled = false

  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'disable',
    status: 'ok',
    type: 'individual',
    data: table,
  }
}

module.exports = { disable }
