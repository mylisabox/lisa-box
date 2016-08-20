'use strict'

module.exports = class LISA {
  constructor(currentApp) {
    this.log = currentApp.log
    this._ = currentApp._
    this.i18n = currentApp._
    this.bonjour = currentApp.bonjour
  }

}
