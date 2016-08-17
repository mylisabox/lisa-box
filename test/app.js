const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'test',
    version: '1.0.0'
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
