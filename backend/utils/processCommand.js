const { create } = require('./create')
const { list } = require('./list')
const { disable } = require('./disable')
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
  console.log('response', response)
  return response
}

module.exports = { processCommand }
