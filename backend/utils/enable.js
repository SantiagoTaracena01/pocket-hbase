const fs = require('fs')

const enable = (table) => {

  const path = `./public/hfile-table-${table}.json`

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)
  json.enabled = true

  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) {
      console.log(err)
    }
  })

  return {
    method: 'enable',
    status: 'ok',
    type: 'individual',
    data: `Table "${table}" has been enabled`,
  }
}

module.exports = { enable }
