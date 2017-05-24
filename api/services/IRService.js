'use strict'

const Service = require('trails/service')
const IRRecord = require('../utils/irrecord')

/**
 * @module IRService
 * @description IR management service
 */
module.exports = class IRService extends Service {
  constructor(app) {
    super(app)

    this.irrecord = new IRRecord()

    this.irrecord.on('error', error => {
      app.sockets.room('ir').send('error', error)
    })

    this.irrecord.on('exit', () => {
      app.sockets.room('exit').send('exit')
    })

    this.irrecord.on('timeout', () => {
      app.sockets.room('timeout').send('timeout')
    })

    this.irrecord.on('discover', () => {
      app.sockets.room('discover').send('discover')
    })

    this.irrecord.on('button', () => {
      app.sockets.room('button').send('button')
    })
  }

  start(remoteName) {
    this.irrecord.start(remoteName)
  }

  stop() {
    this.irrecord.stop()
  }

  quit() {
    this.irrecord.quit()
  }

  setButtonName(name) {
    this.irrecord.setButtonName(name)
  }
}

