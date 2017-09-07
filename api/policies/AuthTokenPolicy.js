'use strict'

const Policy = require('trails/policy')

/**
 * @module RegisterPolicy
 * @description Protect registration when there already users in DB
 */
module.exports = class AuthTokenPolicy extends Policy {
  protect(req, res, next) {
    const header = req.headers['device-id']
    const nextPolicy = () => this.app.policies['Passport'].jwt(req, res, next)
    const checkHeaderKnownDevice = () => {
      if (header) {
        this.app.orm.Device.findAll({
          where: {
            pluginName: 'lisa-plugin-voice'
          }
        }).then(devices => {
          const results = devices.filter(device => device.privateData.identifier === header)
          if (!devices || devices.length === 0 || results.length === 0) {
            nextPolicy()
          }
          else {
            if (!req.body.context) {
              req.body.context = {}
            }
            //Device associated with a room, by default set the context to this room
            if (!req.body.context.room) {
              req.body.context.room = devices[0].roomId
            }
            next()
          }
        }).catch(err => nextPolicy())
      }
      else {
        nextPolicy()
      }
    }

    if (req.connection.remoteAddress === '127.0.0.1' ||
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1') {
      next()
    }
    else {
      checkHeaderKnownDevice()
    }

  }
}

