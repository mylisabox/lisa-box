'use strict'

const Service = require('lisa-plugins-manager/api/services/PluginService')
const _ = require('lodash')

/**
 * @module PluginService
 * @description Plugins services
 */
module.exports = class PluginService extends Service {
  _translatePlugin(lang, plugins) {
    const results = []
    for (let plugin of plugins) {
      plugin = plugin.toJSON()
      const infos = plugin.infos

      const image = this._translateField(lang, infos.image)

      const pluginData = {
        id: plugin.name,
        name: this._translateField(lang, infos.name),
        description: this._translateField(lang, infos.description),
        image: image ? '/plugin/' + plugin.name + '/images/' + image : null,
        settings: this._translateSettings(lang, plugin.settings),
        devicesSettings: this._translateDevices(lang, plugin, plugin.devicesSettings)
      }
      results.push(pluginData)
    }
    return results
  }

  _translateDevices(lang, plugin, devices) {
    const translatedDevices = []
    for (const device of devices) {
      const image = this._translateField(lang, device.image)
      const settings = this._translateSettings(lang, device.settings)
      translatedDevices.push({
        name: this._translateField(lang, device.name),
        description: this._translateField(lang, device.description),
        template: device.template,
        driver: device.driver,
        pluginName: plugin.name,
        type: device.type,
        image: image ? '/plugin/' + plugin.name + '/images/' + image : null,
        settings: settings,
        pairing: device.pairing
      })
    }
    return translatedDevices
  }

  _translateSettings(lang, settings) {
    const translatedSettings = ['labelText', 'text', 'hintText', 'errorText', 'counterText', 'helperText', 'prefixText', 'suffixText']
    if (settings) {
      for (const setting in settings) {
        if(typeof settings[setting] === 'object') {
          settings[setting] = this._translateSettings(lang, settings[setting])
        } else {
          if(translatedSettings.includes(setting)) {
            settings[setting] = this._translateField(lang, settings[setting])
          }
        }
      }
    }
    return settings
  }

  _translateField(lang, field) {
    let result
    if (field) {
      if (_.isString(field)) {
        result = field
      }
      else if (field[lang]) {
        result = field[lang]
      }
      else {
        result = field['en']
      }
    }
    return result
  }

  find(lang, criteria, options) {
    const footprintService = this.app.services.FootprintService
    return footprintService.find('plugin', criteria, options)
      .then(plugins => this._translatePlugin(lang, plugins))
  }

  pairing(plugin, driver, data) {
    return this.app.services.PluginService.callOnPluginDriver('pairing', plugin, driver, [data]).then(results => {
      return Promise.resolve(results)
    }).catch(err => {
      if (err.step) {
        return Promise.resolve(err)
      }
      return Promise.reject(err)
    })
  }

  getDevicesForPairing(plugin, driver) {
    return this.app.services.PluginService.callOnPluginDriver('getDevices', plugin, driver, []).then(results => {
      return Promise.resolve(results)
    }).catch(err => {
      return Promise.reject(err)
    })
  }

  setGroupValue(roomId, groupId, data) {
    const type = 'light' //FIXME for now only light is supported, but find a way to have this type from somewhere
    return this.app.orm.Device.findAll({
      where: {
        roomId: roomId
      }
    }).then(devices => {
      const filteredDevices = devices.filter(device => device.type === type)
      const pluginFilteredDevices = {}
      filteredDevices.forEach(device => {
        const pluginName = device.pluginName
        if (pluginFilteredDevices[pluginName]) {
          pluginFilteredDevices[pluginName].push(device)
        }
        else {
          pluginFilteredDevices[pluginName] = [device]
        }
      })
      const key = data.key
      const value = data.value || false
      const promises = []
      _.forEach(pluginFilteredDevices, (devices, pluginName) => {
        promises.push(this.setDevicesValue(pluginName, [devices.map(device => device.toRawData()), key, value]))
      })
      return Promise.all(promises)
    })
  }

  setValue(deviceId, data) {
    if (process.env.DEMO_MODE) {
      return this.app.orm.Device.findById(deviceId).then(device => {
        if (device) {
          const key = data.key
          let value = data.value || false

          if (!isNaN(value)) {
            value = +value
          }
          if (value === 'true') {
            value = true
          }
          if (value === 'false') {
            value = false
          }
          device = device.toRawData()
          device.data[key] = value
          return this.app.orm.Device.update(device, { where: { id: device.id } }).then(result => device)
        }
        else {
          return Promise.reject(new Error('Not found'))
        }
      })
    }
    else {
      return this.app.orm.Device.findById(deviceId).then(device => {
        if (device) {
          const key = data.key
          let value = data.value || false
          const plugin = data.plugin

          if (!isNaN(value)) {
            value = +value
          }
          if (value === 'true') {
            value = true
          }
          if (value === 'false') {
            value = false
          }

          return this.setDeviceValue(plugin, [device.toRawData(), key, value])
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

  interact(infos) {
    if (infos.action === 'UNKNOWN') {
      return Promise.resolve(infos)
    }
    else {
      const roomPromise = []

      const keys = Object.keys(_.omit(infos.fields, ['room']))

      if (infos.fields.room) {
        roomPromise.push(this.app.orm.Room.find({
          where: {
            name: {
              $like: infos.fields.room
            }
          }
        }))
      }
      else {
        roomPromise.push(Promise.resolve())
      }
      if (infos.fields.device) {
        roomPromise.push(this.app.orm.Device.find({
            where: {
              name: {
                $like: infos.fields.device
              }
            }
          })
        )
      }
      else {
        roomPromise.push(Promise.resolve())
      }
      keys.forEach(key => {
        const param = this.app.config.chatbot.params[key]
        if (param) {
          if (_.isPlainObject(param)) {
            roomPromise.push(new Promise((resolve, reject) => {
              infos.fields[key] = param[infos.fields[key]]
              resolve()
            }))
          }
          else if (_.isFunction(param)) {
            roomPromise.push(param(this.app).then(result => {
                if (_.isPlainObject(param)) {
                  infos.fields[key] = {
                    name: infos.fields[key],
                    value: result[infos.fields[key]]
                  }
                }
              })
            )
          }
        }
      })

      return Promise.all(roomPromise).then(results => {
        const room = results[0]
        if (room) {
          infos.fields.room = room.toJSON()
        }
        else {
          infos.fields.room = null
        }
        const device = results[1]
        if (device) {
          infos.fields.device = device.toRawData()
        }
        else {
          infos.fields.device = null
        }
        return this.callOnPlugins('interact', [infos.action, infos])
          .then(results => {
            return Promise.resolve(results.action ? results : infos)
            }
          )
      })
    }
  }
}

