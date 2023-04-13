const fs = require('fs')
const { list } = require('./list')

const put = (table, rowKey, columnInfo, value) => {
  // list().data retorna una lista con las tablas ['users', 'products', ...]
  const tables = list().data

  // Esto retorna que la tabla no existe si no está en la lista de tablas
  if (!tables.includes(table)) {
    return {
      method: 'disable',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" does not exist`,
    }
  }

  // Column family y column qualifier que se separan porque la sintaxis es columnfamily:columnqualifier
  const [columnFamily, columnQualifier] = columnInfo.split(':')

  // Path del archivo a escribir
  const path = `./public/hfile-table-${table}.json`

  // Lectura del archivo JSON
  const data = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
  })

  // Parseo del JSON de string a objeto
  const json = JSON.parse(data)

  // Si no existe la columna en la tabla, retornar error
  if (!json.columnFamilies.includes(columnFamily)) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Column family "${columnFamily}" does not exist in table "${table}"`,
    }
  }

  // Si la tabla está deshabilitada, retornar error
  if (!json.enabled) {
    return {
      method: 'put',
      status: 'error',
      type: 'individual',
      data: `Table "${table}" is disabled`,
    }
  }

  // Actualizar la fecha de actualización de la tabla
  json.updated = new Date().getTime()

  // Buscar la entrada a actualizar
  const entryToUpdate = json.entries.find(
    (entry) =>
      entry.rowkey === rowKey &&
      entry.columnfamily === columnFamily &&
      entry.columnqualifier === columnQualifier
  )
  let entryToReturn = entryToUpdate

  // Si existe la entrada, actualizarla
  if (entryToUpdate) {
    // Actualización de la entrada (se actualiza el valor y el timestamp nada más)
    const indexToRemove = json.entries.indexOf(entryToUpdate)
    json.entries.splice(indexToRemove, 1)
    entryToUpdate.value = value
    entryToUpdate.timestamp = new Date().getTime()
    json.entries.push(entryToUpdate)

    // Si no existe la entrada, crearla
  } else {
    // Creación de la entrada
    entryToReturn = {
      rowkey: rowKey,
      columnfamily: columnFamily,
      columnqualifier: columnQualifier,
      value: value,
      timestamp: new Date().getTime(),
    }

    // Agregar la entrada a la tabla
    json.entries.push(entryToReturn)
  }

  // Escribir el archivo JSON con las actualizaciones
  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) {
      console.log(err)
    }
  })

  // Retornar la entrada actualizada
  return {
    method: 'put',
    status: 'ok',
    type: 'table',
    data: { entries: [entryToReturn] },
  }
}

module.exports = { put }
