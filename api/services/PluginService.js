'use strict'

const Service = require('lisa-plugins-manager/api/services/PluginService')
const _ = require('lodash')

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
    if (process.env.DEMO_MODE) {
      return this.app.orm.Device.findById(deviceId).then(device => {
        if (device) {
          const key = data.key
          let value = data.value || false

          if (!isNaN(value)) {
            value = +value
          }
          if (value == 'true') {
            value = true
          }
          if (value == 'false') {
            value = false
          }
          device = device.toRawData()
          device.data[key] = value
          return this.app.orm.Device.update(device, {where: {id: device.id}}).then(result => device)
        }
        else {
          return Promise.reject(new Error('Not found'))
        }
      });
    }
    else {
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

          return this.callApiOnPlugin(plugin, 'controllers', controller, action,
            [device.toRawData(), key, value])
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
    if (infos.action == 'UNKNOWN') {
      return Promise.resolve(infos)
    }
    else {
      const plugin = infos.bot.pluginName
      infos.bot = infos.bot.toJSON()
      const roomPromise = []

      const keys = Object.keys(_.omit(infos.fields, ['room']))

      if (infos.fields.room) {
        roomPromise.push(this.app.orm.Room.find({
            where: {
              name: {
                $like: infos.fields.room
              }
            }
          })
        )
      }
      keys.forEach(key => {
        const param = this.app.config.chatbot.params[key]
        if (param) {
          if (_.isPlainObject(param)) {
            roomPromise.push(new Promise((resolve, reject) => {
              infos.fields[key] = {
                name: infos.fields[key],
                value: param[infos.fields[key]]
              }
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
        return this.callOnPlugins('interact', [infos.action, infos])
          .then(result => {
              return Promise.resolve(result)
            }
          )
      })
    }
  }
}

