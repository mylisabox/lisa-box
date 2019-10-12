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

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack);
});
