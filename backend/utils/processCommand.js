const { create } = require('./create')
const { list } = require('./list')
const { disable } = require('./disable')
const { enable } = require('./enable')
const { is_enabled } = require('./is_enabled')

const { put } = require('./put')
const { get } = require('./get')

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
    case 'disable':
      response = disable(args[0])
      break
    case 'enable':
      response = enable(args[0])
      break
    case 'is_enabled':
      response = is_enabled(args[0])
      break
    case 'put':
      response = put(args[0], args[1], args[2], args[3])
      break
    case 'get':
      response = get(args[0], args[1])
      break
    default:
      response = { method: 'none', status: 'error', data: 'no such method' }
      break
  }
  return response
}

module.exports = { processCommand }
