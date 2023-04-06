const { create } = require('./create')
const { list } = require('./list')
const { put } = require('./put')

const processCommand = (command) => {
  const method = command.split(' ')[0]
  const args = command.replace(`${method} `, '').split(', ')
  let response = { method: 'none', status: 'ok', result: 'no result' }
  switch (method) {
    case 'create':
      response = create(args[0], args.slice(1))
      break
    case 'list':
      response = list()
      break
    case 'put':
      response = put(args[0], args[1], args[2], args[3])
      break
    default:
      response = { method: 'none', status: 'error', data: 'no such method' }
      break
  }
  return response
}

module.exports = { processCommand }
