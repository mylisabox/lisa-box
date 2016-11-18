'use strict'

const footprintsConfig = require('./footprints')

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
    path: '/isAlive',
    handler: 'DefaultController.isAlive'
  },
  {
    method: 'GET',
    path: `${footprintsConfig.prefix}/favorite`,
    handler: 'FavoritesController.getFavorite'
  },
  {
    method: 'PUT',
    path: `${footprintsConfig.prefix}/favorite/{id}`,
    handler: 'FavoritesController.putFavorite'
  },
  {
    method: 'DELETE',
    path: `${footprintsConfig.prefix}/favorite/{id}`,
    handler: 'FavoritesController.destroyFavorite'
  }
]
