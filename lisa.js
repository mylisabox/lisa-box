'use strict'
const EventEmitter = require('events')

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
      if (obj.getFileName().toLowerCase().indexOf('plugin-') != -1) {
        break
      }
    }
    // Return caller's caller
    return obj.getFileName()
  }

  /**
   * Get name of the current plugin
   * @returns name
   */
  const getCurrentPlugin = () => {
    const pathString = getCaller()
    const parts = pathString.split('/')
    parts.pop() // remove script index.js from stack
    const name = parts[parts.length - 1].replace(/lisa\-/, '').replace(/plugin\-/, '').toCamelCase()
    return app.packs.pluginsManager[name].name || null
  }

  return class LISA extends EventEmitter {
    constructor(currentApp) {
      super()
      app = currentApp
    }

    toCamelCase(input) {
      return input.toCamelCase()
    }

    createOrUpdateDevices(data) {
      const plugin = getCurrentPlugin()
      this.log.debug(plugin)
    }

    findDevices(criteria) {
      criteria = criteria || {}
      const plugin = getCurrentPlugin()
      this.log.debug(plugin)
      criteria.plugin = plugin
      return app.orm.Plugin.findAll({
        where: criteria
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
