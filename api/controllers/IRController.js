'use strict'

const Controller = require('trails/controller')

/**
 * @module IRController
 * @description Generated Trails.js Controller.
 */
module.exports = class IRController extends Controller {
  start(req, res) {
    this.app.services.IRService.start(req.params.remoteName)
    res.send({})
  }

  stop(req, res) {
    this.app.services.IRService.stop()
    res.send({})
  }

  button(req, res) {
    this.app.services.IRService.setButtonName(req.params.button)
    res.send({})
  }

  quit(req, res) {
    this.app.services.IRService.quit()
    res.send({})
  }

}

