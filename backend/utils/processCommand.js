const { create } = require('./create')
// const { put } = require('./put')
// const { get } = require('./get')

const processCommand = (command) => {
  const [method, ...args] = command.split(' ')
  let response = { method: 'none', status: 'ok', result: 'no result' }
  switch (method) {
    case 'create':
      response = create(args[0], args.slice(1))
    case 'get':
      response = get(args[0])
  }
  return response
}

module.exports = { processCommand }
