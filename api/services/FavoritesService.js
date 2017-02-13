'use strict'

const Service = require('trails/service')

/**
 * @module FavoritesService
 * @description Service to manage favorite devices
 */
module.exports = class FavoritesService extends Service {
  getFavorite(userId) {
    return this.app.services.FootprintService.findAssociation('user', userId, 'favorites')
  }

  putFavorite(userId, deviceId) {
    return this.app.orm.User.findById(userId).then(user => {
      return user.addFavorite(deviceId)
    })
  }

  destroyFavorite(userId, deviceId) {
    return this.app.orm.User.findById(userId).then(user => {
      return user.removeFavorite(deviceId)
    })
  }
}

