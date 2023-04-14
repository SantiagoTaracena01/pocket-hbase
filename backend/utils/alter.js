const fs = require('fs');
const { list } = require('./list');

const alter = (table, type, columnFamily) => {
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
        data: `Column family must be specified for ALTER operation`,
      };
    }
  
    if (type === 'add' && !json.columnFamilies.includes(columnFamily)) {
      json.columnFamilies.push(columnFamily);
      json.updated = new Date().getTime();
    } else if (type === 'delete' && json.columnFamilies.includes(columnFamily)) {
      json.columnFamilies = json.columnFamilies.filter(cf => cf !== columnFamily);
      json.updated = new Date().getTime();
    } else {
      return {
        method: 'alter',
        status: 'error',
        type: 'individual',
        data: `Column family "${columnFamily}" already exists or does not exist in table "${table}"`,
      };
    }
  
    fs.writeFile(path, JSON.stringify(json), (err) => {
      if (err) {
        console.log(err)
      }
    })
  
    return {
      method: 'alter',
      status: 'ok',
      type: 'table',
      data: { columnFamilies: json.columnFamilies },
    }
  }
  
  module.exports = { alter }
  