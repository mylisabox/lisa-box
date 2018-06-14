/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict'

const app = require('./')
const TrailsApp = require('trails')
const server = new TrailsApp(app)

server.start().catch(err => server.stop(err))

process.on('unhandledRejection', (reason, p) => {
  server.log.error("Unhandled Rejection at: Promise ", p, " reason: ", reason)
})
process.on('uncaughtException', exception => {
  server.log.error(exception)
})
