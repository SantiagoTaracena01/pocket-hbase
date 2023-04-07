const fs = require('fs')

const is_enabled = (table) => {

  const path = `./public/hfile-table-${table}.json`

  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const json = JSON.parse(data)

  return {
    method: 'is_enabled',
    status: 'ok',
    type: 'individual',
    data: (json.enabled) ? `Table "${table}" is enabled` : `Table "${table}" is disabled`,
  }
}

module.exports = { is_enabled }
