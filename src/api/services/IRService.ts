import { FabrixService as Service } from '@fabrix/fabrix/dist/common'

const LIRC = require('lisa-lirc')

/**
 * @module IRService
 * @description IR management service
 */
export class IRService extends Service {

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

