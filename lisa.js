'use strict'
const EventEmitter = require('events')
const _ = require('lodash')
const NOTIFICATION_TYPE = require('./api/utils/enums').NOTIFICATION_TYPE

module.exports = (function () {
  //private
  let app

  /**
   * Prepare data like model attributes
   * @param data to prepare
   * @returns object new data model
   */
  const prepareDeviceData = function (data) {
    return {
      name: data.name,
      pluginName: data.pluginName,
      roomId: data.roomId,
      data: data
    }
  }

  /**
   * Get native stack
   * @returns array of javascript calls
   */
  const getStack = function () {
    // Save original Error.prepareStackTrace
    const origPrepareStackTrace = Error.prepareStackTrace
    // Override with function that just returns `stack`
    Error.prepareStackTrace = (_, stack) => stack

    // Create a new `Error`, which automatically gets `stack`
    const err = new Error()
    // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
    const stack = err.stack
    // Restore original `Error.prepareStackTrace`
    Error.prepareStackTrace = origPrepareStackTrace
    // Remove superfluous function call on stack
    stack.shift() // getStack --> Error
    return stack
  }

  /**
   * Get path of the current plugin
   * @returns path
   */
  const getCaller = () => {
    const stack = getStack()
    stack.shift()
    let obj
    for (let i = 0; i < stack.length; i++) {
      obj = stack[i]
      if (obj.getFileName().toLowerCase().indexOf('plugin-') != -1) {
        break
      }
    }
    // Return caller's caller
    return obj.getFileName()
  }

  /**
   * Get name of the current plugin
   * @returns string name
   */
  const getCurrentPlugin = () => {
    const pathString = getCaller()
    const parts = pathString.split('/')
    let part = parts.find(part => part.indexOf('lisa-plugin') != -1)
    if (!part) {
      part = 'unknown'
    }
    const name = part.replace(/lisa\-/, '').replace(/plugin\-/, '').toCamelCase()
    return app.packs.pluginsManager.plugins[name] ? app.packs.pluginsManager.plugins[name].fullName : 'unknown'
  }

  return class LISA extends EventEmitter {
    get NOTIFICATION_TYPE() {
      return NOTIFICATION_TYPE
    }

    constructor(currentApp) {
      super()
      app = currentApp
    }

    toCamelCase(input) {
      return input.toCamelCase()
    }

    getRooms() {
      return app.orm.Room.findAll().then(rooms => {
        return Promise.resolve(rooms.map(room => room.toJSON()))
      })
    }

    createRoom(name) {
      return app.orm.Room.create({name: name}).then(room => {
        return Promise.resolve(room.toJSON())
      })
    }

    createOrUpdateDevices(data, criteria) {
      const plugin = getCurrentPlugin()
      data.pluginName = plugin
      this.log.debug(plugin)
      let promise

      if (Array.isArray(data)) {
        const toCreate = data.filter(element => !element.id)
        const toUpdate = data.filter(element => element.id)
        const todo = []

        if (toCreate.length > 0) {
          toCreate.forEach(device => prepareDeviceData(data))
          todo.push(app.orm.Device.bulkCreate(toCreate))
        }
        if (toUpdate.length > 0) {
          //todo.push(app.orm.Plugin.bulkUpdate(toUpdate))
          this.log.warn('bulk update from array is not supported yet')
          todo.push(Promise.reject('bulk update from array is not supported yet'))
        }
        promise = Promise.all(todo)
      }
      else {
        if (data.id) {
          promise = app.orm.Device.update(prepareDeviceData(data), {
            where: {
              id: data.id
            }
          })
        }
        else if (criteria) {
          criteria.pluginName = plugin
          promise = app.orm.Device.update(prepareDeviceData(data), {
            where: criteria
          })
        }
        else {
          promise = app.orm.Device.create(prepareDeviceData(data))
        }
      }

      return promise.then(device => _.isArray(device) ? device :
        _.merge({id: device.id, roomId: device.roomId, createdAt: device.createdAt}, device.toJSON().data))
    }

    /**
     *
     * @param criteria to retrieve specific devices
     * @returns Promise
     */
    findDevices(criteria) {
      criteria = criteria || {}
      const plugin = getCurrentPlugin()
      this.log.debug(plugin)
      criteria.pluginName = plugin

      const promise = criteria.id ? app.orm.Device.find({
        where: criteria
      }) : app.orm.Device.findAll({
        where: criteria
      })

      return promise.then(devices => {
        if (Array.isArray(devices)) {
          return devices.map(device => {
            device = device.toJSON()
            device.data.id = device.id
            device.data.roomId = device.roomId
            return device.data
          })
        }
        else {
          devices = devices.toJSON()
          devices.data.id = devices.id
          devices.data.roomId = devices.roomId
          return devices.data
        }
      })
    }

    /**
     * Send notification to the user(s)
     * @param to @optional user id to send the notif to
     * @param title of the notif
     * @param desc of the notif
     * @param image of the notif
     * @param defaultAction of the notif
     * @param action of the notif
     * @param lang of the notif
     * @returns Promise - notif data
     */
    sendNotification(to, title, type, desc, image, defaultAction, action, lang) {
      const plugin = getCurrentPlugin()
      return app.services.NotificationService.sendNotification(to, plugin, title, type, desc, image, defaultAction,
        action, lang, 'default').then(notification => notification.toJSON())
    }

    /**
     * Retrieve plugin preferences
     * @returns {Promise} preferences or error
     */
    getPreferences() {
      const plugin = getCurrentPlugin()
      this.log.debug(plugin)
      const cache = app.services.CacheService.getCaches('mongo-store')

      return new Promise((resolve, reject) => {
        cache.get(plugin + '_prefs', (err, preferences) => {
          if (err) {
            reject(err)
          }
          resolve(preferences)
        })
      })
    }

    /**
     * Set plugin preferences
     * @param preferences to save
     * @returns {Promise} saved preferences or error
     */
    setPreferences(preferences) {
      const plugin = getCurrentPlugin()
      this.log.debug(plugin)
      const cache = app.services.CacheService.getCaches('mongo-store')

      return new Promise((resolve, reject) => {
        cache.set(plugin + '_prefs', preferences, err => {
          if (err) {
            reject(err)
          }
          resolve(preferences)
        })
      })
    }

    get log() {
      return app.log
    }

    get _() {
      return app._
    }

    get i18n() {
      return app._
    }

    get bonjour() {
      return app.bonjour
    }

    get serialPort() {
      return app.serialPort
    }
  }
})()
