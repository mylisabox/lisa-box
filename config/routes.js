'use strict'

/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */
module.exports = [

/**
 * Render the home view
 */
  {
    method: 'GET',
    path: '/node_modules',
    handler: {
      directory: {
        path: 'node_modules'
      }
    }
  }
]
