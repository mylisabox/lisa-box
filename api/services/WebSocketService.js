'use strict'

const Service = require('trails-service')
const _ = require('lodash')
const rooms = require('primus-rooms')
const emitter = require('primus-emitter')

/**
 * @module WebSocketService
 * @description WebSocket management service
 */
module.exports = class WebSocketService extends Service {
  /**
   * Authenticate the user for websocket connection from query param ?token=
   * @param req
   * @param authorized
   * @returns {*}
   * @private
   */
  _authorize(req, authorized) {
    const token = req.query.token

    if (!token) {
      return authorized(new Error('No auth token'))
    }

    const jwtConfig = this.app.config.passport.strategies.jwt
    const jwtOptions = _.clone(jwtConfig.tokenOptions)
    jwtOptions.algorithms = jwtOptions.algorithm
    delete jwtOptions.algorithm

    const jwtVerifier = jwtConfig.strategy.JwtVerifier
    jwtVerifier(token, jwtConfig.options.secretOrKey, jwtOptions, (err, payload) => {
      if (err) {
        authorized(err)
      }
      else {
        req.user = payload.user
        authorized()
      }
    })
  }

  init() {
    this.app.sockets.use('rooms', rooms)
    this.app.sockets.use('emitter', emitter)
    this.app.sockets.authorize(this._authorize)

    this.app.sockets.on('connection', spark => {
      const user = spark.request.user // Retrieve connected user
      spark.join('user_' + user.id)
      spark.on('join', (room, fn) => {
        this.app.services.PermissionService.isUserAllowed(user, room, 'access').then(perm => {
          if (perm && perm.length > 0) {
            spark.join(room, fn)
          }
        }).catch(err => this.log.error(err))
      })
      spark.on('leave', (room, fn) => {
        spark.leave(room, fn)
      })

      spark.on('data', data => {

        //spark.room('user_' + user.id).write(data + ' ' + user.email)
        this.log.debug(spark.id, 'received message:', data, spark.rooms())
      })
    })
    this.app.sockets.on('disconnection', spark => {
      const user = spark.request
      spark.leave('user_' + user.id)
    })
  }
}

