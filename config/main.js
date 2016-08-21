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
    require('trailpack-core'),
    require('trailpack-repl'),
    require('trailpack-router'),
    require('trailpack-express'),
    require('trailpack-sequelize'),
    require('lisa-plugins-manager'),
    require('trailpack-bootstrap'),
    require('trailpack-email'),
    require('trailpack-twilio'),
    require('trailpack-footprints'),
    //require('../api/trailpacks/trailpack-dynamic-config'),
    require('trailpack-passport'),
    require('trailpack-acl'),
    require('trailpack-realtime')
  ],

  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: path.resolve(__dirname, '..'),
    temp: path.resolve(__dirname, '..', 'dist'),
    templates: path.resolve(__dirname, '..', 'api', 'templates'),
    www: path.resolve(__dirname, '..', 'dist', 'app')
  }
}
