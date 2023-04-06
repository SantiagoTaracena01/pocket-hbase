const { create } = require('./create')
const { list } = require('./list')

const processCommand = (command) => {
  const [method, ...args] = command.split(' ')
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
    default:
      response = { method: 'none', status: 'error', result: 'no such method' }
      break
  }
  return response
}

module.exports = { processCommand }
