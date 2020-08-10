'use strict'
const EventEmitter = require('events')
const NOTIFICATION_TYPE = require('./src/api/utils/enums').NOTIFICATION_TYPE
const DEVICE_TYPE = require('./src/api/utils/enums').DEVICE_TYPE

module.exports = (function () {
  //private
  let app

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
      if (obj.getFileName().toLowerCase().indexOf('plugin-') !== -1) {
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
    let part = parts.find(part => part.indexOf('lisa-plugin') !== -1)
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

    get DEVICE_TYPE() {
      return DEVICE_TYPE
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

    createOrUpdateDevices(device, criteria) {
      const plugin = getCurrentPlugin()
      //app.log.debug(plugin)
      let promise

      if (Array.isArray(device)) {
        const toCreate = device.filter(element => !element.id).map(device => {
          device.pluginName = plugin
          return device
        })
        const toUpdate = device.filter(element => element.id)
        const todo = []

        if (toCreate.length > 0) {
          todo.push(app.orm.Device.bulkCreate(toCreate))
        }
        if (toUpdate.length > 0) {
          for (const deviceToUpdate of toUpdate) {
            todo.push(this.createOrUpdateDevices(deviceToUpdate))
          }
        }
        promise = Promise.all(todo)
      }
      else {
        device.pluginName = plugin
        if (device.id) {
          promise = app.orm.Device.update(device, {
            where: {
              id: device.id
            }
          })
        }
        else if (criteria) {
          criteria.pluginName = plugin
          promise = app.orm.Device.update(device, {
            where: criteria
          })
        }
        else {
          promise = app.orm.Device.create(device)
        }
      }

      return promise.then(device => {
        if (Array.isArray(device)) {
          return device.map(item => {
            if (item.toRawData) {
              return item.toRawData()
            }
            return item
          })
        }
        else {
          if (device.toRawData) {
            return device.toRawData()
          }
          return device
        }
      })
    }

    /**
     *
     * @param criteria to retrieve specific devices
     * @returns Promise
     */
    findDevices(criteria) {
      criteria = criteria || {}
      const plugin = getCurrentPlugin()
      //app.log.debug(plugin)
      criteria.pluginName = plugin

      const promise = criteria.id ? app.orm.Device.find({
        where: criteria
      }) : app.orm.Device.findAll({
        where: criteria
      })

      return promise.then(devices => {
        if (Array.isArray(devices)) {
          return devices.map(device => device.toRawData())
        }
        else {
          return devices.toRawData()
        }
      })
    }

    /**
     * Send notification to the user(s)
     * @param to @optional user id to send the notif to
     * @param title of the notif
     * @param type
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
      app.log.debug(plugin)
      return app.orm.Preference.findById(plugin + '_prefs').then(preferences => {
        return preferences ? preferences.value : {}
      })
    }

    /**
     * Set plugin preferences
     * @param preferences to save
     * @returns {Promise} saved preferences or error
     */
    setPreferences(preferences) {
      const plugin = getCurrentPlugin()
      app.log.debug(plugin)
      return app.orm.Preference.upsert({
        key: plugin + '_prefs',
        value: preferences
      }).then(() => {
        return preferences
      })
    }

    addChatBot(botId, botData) {
      const plugin = getCurrentPlugin()
      botData.pluginName = plugin
      return app.services.ChatBotService.addBot(botId, botData).then(chatBot => Promise.resolve(chatBot.toJSON()))
    }

    getChatBot(botId = null) {
      const plugin = getCurrentPlugin()
      const where = {
        pluginName: plugin
      }
      if (botId) {
        where.name = botId
      }
      return app.orm.ChatBot.findAll({
        where: where
      }).then(chatBots => Promise.resolve(chatBots.map(bot => bot.toJSON())))
    }

    updateChatBot(botId, botData) {
      const plugin = getCurrentPlugin()
      botData.pluginName = plugin
      return app.services.ChatBotService.updateBot(botId, botData).then(_ => Promise.resolve())
    }

    deleteChatBot(botId) {
      //const plugin = getCurrentPlugin()
      return app.services.ChatBotService.deleteBot(botId).then(_ => Promise.resolve())
    }

    get log() {
      const getArguments = (args) => {
        const plugin = getCurrentPlugin()
        const mainArguments = Array.prototype.slice.call(args)
        return [plugin + ':'].concat(mainArguments)
      }
      const logger = app.config.log.pluginLogger
      return {
        debug: function () {
          logger.debug(JSON.stringify(getArguments(arguments)))
        },
        info: function () {
          logger.info(JSON.stringify(getArguments(arguments)))
        },
        error: function () {
          logger.error(JSON.stringify(getArguments(arguments)))
        },
        silly: function () {
          logger.silly(JSON.stringify(getArguments(arguments)))
        },
        verbose: function () {
          logger.verbose(JSON.stringify(getArguments(arguments)))
        },
        warn: function () {
          logger.warn(JSON.stringify(getArguments(arguments)))
        }
      }
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

    get mdns() {
      return app.mdns
    }

    get serialPort() {
      return app.serialPort
    }

    get ir() {
      return {
        send: (remote, action) => {
          return app.services.IRService.send(remote, action)
        }
      }
    }
  }
})()
