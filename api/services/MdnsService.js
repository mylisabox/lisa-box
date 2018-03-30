'use strict'

const Service = require('trailpack-chatbot/api/services/ChatBotService')

/**
 * @module MdnsService
 * @description Service to manage mdns
 */
module.exports = class MdnsService extends Service {
  init() {
    if (this.app.env.NODE_ENV !== 'testing') {
      this.mdns = require('mdns')
      this._createAdvertisement()
    }
  }

  _createAdvertisement() {
    try {
      this.ad = this.mdns.createAdvertisement(this.mdns.tcp('http'), this.app.config.web.port, {
        name: 'LISA',
        txtRecord: {
          port: this.app.config.web.port,
          secure: this.app.config.web.ssl !== undefined
        }
      })
      this.ad.on('error', this._handleError)
      this.ad.start()
    }
    catch (ex) {
      this._handleError(ex)
    }
  }

  _handleError(error) {
    switch (error.errorCode) {
    case this.mdns.kDNSServiceErr_Unknown:
      this.log.warn(error)
      setTimeout(this._createAdvertisement, 5000)
      break
    default:
      this.log.error(error)
      throw error
    }
  }

}
