'use strict'

const Service = require('trails/service')

module.exports = class DeviceService extends Service {
  find(criteria, options = {}) {
    const footprintService = this.app.services.FootprintService
    options.include = [{
      model: this.app.orm.Plugin, as: 'plugin', where: {
        activated: 1
      }
    }]

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

    const devicesByPlugin = this._sortDevicesByPlugin(devices)

    for (const pluginName in devicesByPlugin) {
      for (const driverName in devicesByPlugin[pluginName]) {
        if (process.env.DEMO_MODE) {
          fullData.push(Promise.resolve(devicesByPlugin[pluginName][driverName]))
        }
        else {
          fullData.push(
            pluginService.callOnPluginDriver('getDevicesData', pluginName, driverName,
              [devicesByPlugin[pluginName][driverName]]
            )
              .catch(e => e))
        }
      }
    }
    return Promise.all(fullData).then(devicesData => {
      let devices = []
      for (const deviceData of devicesData) {
        if (Array.isArray(deviceData)) {
          devices = devices.concat(deviceData)
        }
        else {
          this.log.error('Retrieving some device data failed', deviceData)
        }
      }
      return devices
    })
  }

  _sortDevicesByPlugin(devices) {
    const devicesByPlugin = {}
    for (const device of devices) {
      if (!devicesByPlugin[device.pluginName]) {
        devicesByPlugin[device.pluginName] = {}
      }
      if (!devicesByPlugin[device.pluginName][device.driver]) {
        devicesByPlugin[device.pluginName][device.driver] = []
      }
      devicesByPlugin[device.pluginName][device.driver].push(device.toRawData())
    }
    return devicesByPlugin
  }
}
