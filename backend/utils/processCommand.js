const { create } = require('./create')
const { list } = require('./list')
const { disable } = require('./disable')
const { enable } = require('./enable')
const { is_enabled } = require('./is_enabled')
const { drop } = require('./drop')
const { drop_all } = require('./drop_all')

const { put } = require('./put')
const { get } = require('./get')
const { del } = require('./del')
const { delete_all } = require('./delete_all')

const { METHODS } = require('./methods')

const processCommand = (command) => {
  const method = command.split(' ')[0]
  const stringArgs = command.replace(`${method} `, '')

  if (!METHODS.includes(method)) {
    return {
      method: 'none',
      status: 'error',
      type: 'individual',
      data: `Method "${method}" not found`,
    }
  }

  if (method !== 'list' && method === stringArgs) {
    return {
      method: 'none',
      status: 'error',
      type: 'individual',
      data: `Can't execute command "${command}" with no arguments`,
    }
  }

  const args = stringArgs
    .split(',')
    .map((arg) => arg.trim().replaceAll('"', '').replaceAll("'", ''))

  let response = {
    method: 'none',
    status: 'error',
    type: 'individual',
    data: 'No result...',
  }

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
    case 'drop':
      response = drop(args[0])
      break
    case 'drop_all':
      response = drop_all(args[0])
      break
    case 'put':
      response = put(args[0], args[1], args[2], args[3])
      break
    case 'get':
      response = get(args[0], args[1])
      break
    case 'delete':
      response = del(args[0], args[1], args[2])
      break
    case 'delete_all':
      response = delete_all(args[0], args[1])
      break
    default:
      response = {
        method: 'none',
        status: 'error',
        type: 'individual',
        data: 'Something went wrong...',
      }
      break
  }

  console.log('response', response)
  return response
}

module.exports = { processCommand }
