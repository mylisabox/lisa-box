'use strict'

const Service = require('trails/service')

/**
 * @module FavoritesService
 * @description Service to manage favorite devices
 */
module.exports = class FavoritesService extends Service {
  populateFavorite(userId, devices) {
    return this.getFavorites(userId)
      .then(favorites => {
        devices.forEach(device => {
          if (favorites.filter(fav => fav.id === device.id).length === 1) {
            device.favorite = true
          }
        })
        return devices
      })
  }

  getFavorites(userId) {
    return this.app.services.FootprintService.findAssociation('user', userId, 'favorites').then(devices => {
      devices.forEach(device => {
        device.favorite = true
      })
      return devices
    }).then(devices => this.app.services.DeviceService.aggregateDevicesData(devices))
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

