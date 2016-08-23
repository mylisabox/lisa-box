'use strict'

require('angular2-universal/polyfills')
const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('../'))
  return global.app.start().catch(global.app.stop)
})

after(() => {
  return global.app.stop()
})
