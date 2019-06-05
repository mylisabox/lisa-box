'use strict'

const Service = require('trails/service')
const LisaDiscovery = require('lisa-discovery')

/**
 * @module DiscoveryService
 * @description Service to manage service discovery
 */
module.exports = class DiscoveryService extends Service {
  init() {
    const serviceDiscovery = new LisaDiscovery({
      multicastAddress: '239.9.9.9',
      multicastPort: 5544,
      trigger: 'lisa-server-search',
      callback: (input, address) => {
        console.log(input, address);
        let data = 'lisa-server-response '
        data += JSON.stringify({port: this.app.config.web.port, isSecure: this.app.config.web.ssl !== undefined})
        return data
      }
    })
    serviceDiscovery.start()
  }

}
