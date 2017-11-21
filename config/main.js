'use strict'

/**
 * Trailpack Configuration
 * (app.config.main)
 *
 * @see http://trailsjs.io/doc/config/main
 */
const path = require('path')

module.exports = {

  /**
   * Order does *not* matter. Each module is loaded according to its own
   * requirements.
   */
  packs: [
    require('trailpack-repl'),
    require('trailpack-router'),
    require('trailpack-express'),
    require('trailpack-sequelize'),
    require('trailpack-chatbot'),
    require('trailpack-cache'),
    require('trailpack-bootstrap'),
    require('trailpack-greenlock'),
    //require('trailpack-email'),
    //require('trailpack-cron'),
    require('trailpack-footprints'),
    //require('../api/trailpacks/trailpack-dynamic-config'),
    require('trailpack-passport'),
    require('trailpack-acl'),
    require('trailpack-realtime'),
    require('lisa-plugins-manager')
  ],

  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: path.resolve(__dirname, '..'),
    templates: path.resolve(__dirname, '..', 'api', 'templates')
  }
}
