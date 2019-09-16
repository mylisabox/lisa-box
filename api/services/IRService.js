'use strict'

const Service = require('trails/service')
const LIRC = require('lisa-lirc')

/**
 * @module IRService
 * @description IR management service
 */
module.exports = class IRService extends Service {

  init() {
    return LIRC.init().catch(err => this.log.error(err))
  }

  send(remote, action) {
    return new Promise((resolve, reject) => {
      LIRC.irsend.send_once(remote, action, () => {
        resolve()
      })
    })
  }

}

