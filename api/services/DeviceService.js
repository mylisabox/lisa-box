'use strict'

const Service = require('trails/service')
const _ = require('lodash')

module.exports = class DeviceService extends Service {
  find(criteria, options) {
    const footprintService = this.app.services.FootprintService

    return footprintService.find('device', criteria, options)
      .then(devices => this.aggregateDevicesData(devices))
  }

  findWithFavorites(userId, criteria, options) {
    const favoritesService = this.app.services.FavoritesService
    return this.find(criteria, options).then(devices => favoritesService.populateFavorite(userId, devices))
  }

  aggregateDevicesData(devices) {
    const pluginService = this.app.services.PluginService
    const fullData = []
    //TODO sort all devices by driver to call plugin once with all his devices
    for (let device of devices) {
      if (process.env.DEMO_MODE) {
        fullData.push(Promise.resolve([device]))
      }
      else {
        fullData.push(pluginService.callOnPluginDriver('getDevicesData', device.pluginName, device.driver, [[device]])
          .catch(e => e))
      }
    }
    return Promise.all(fullData).then(devicesData => {
      let devices = []
      for (let deviceData of devicesData) {
        if (_.isArray(deviceData)) {
          devices = devices.concat(deviceData)
        }
        else {
          this.log.error('Retrieving some device data failed', deviceData)
        }
      }
      return devices
    })
  }
}
