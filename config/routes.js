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
  },
  {
    method: 'GET',
    path: '/isAlive',
    handler: 'DefaultController.isAlive'
  },
  {
    method: 'GET',
    path: '/',
    handler: 'NavigationController.publicRoutes'
  },
  {
    method: 'GET',
    path: '/login',
    handler: 'NavigationController.publicRoutes'
  },
  {
    method: 'GET',
    path: '/logout',
    handler: 'NavigationController.privateRoutes'
  }
]
