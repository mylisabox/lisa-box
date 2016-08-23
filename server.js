/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict'

require('angular2-universal/polyfills')
const gulp = require('gulp')
require('./gulpfile')

const run = () => {
  const app = require('./')
  const TrailsApp = require('trails')
  const server = new TrailsApp(app)

  server.start().catch(err => server.stop(err))
}

gulp.start(process.env.NODE_ENV === 'production' ? 'production' : 'default', run)

