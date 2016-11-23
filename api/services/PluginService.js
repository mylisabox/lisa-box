'use strict'

const Service = require('lisa-plugins-manager/api/services/PluginService')

/**
 * @module PluginService
 * @description Plugins services
 */
module.exports = class PluginService extends Service {
  image() {

  }

  video() {

  }

  setValue(deviceId, data) {
    return this.app.orm.Device.findById(deviceId).then(device => {

      if (device) {
        const key = data.key
        let value = data.value || false
        const plugin = data.plugin
        const controller = data.controller
        const action = data.action

        if (!isNaN(value)) {
          value = +value
        }
        if (value == 'true') {
          value = true
        }
        if (value == 'false') {
          value = false
        }

        return this.app.services.PluginService.callApiOnPlugin(plugin, 'controllers', controller, action,
          [device.toJSON(), key, value])
          .then(_ => {
            return Promise.resolve(device)
          })
      }
      else {
        return Promise.reject(new Error('Not found'))
      }
    })
  }
}

