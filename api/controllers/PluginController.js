'use strict'

const Controller = require('trails/controller')

/**
 * @module PluginController
 * @description Generated Trails.js Controller.
 */
module.exports = class PluginController extends Controller {
  image(req, res) {

  }

  video(req, res) {

  }

  setValue(req, res) {
    this.app.services.PluginService.setValue(req.param('device'), {
      key: req.body.key,
      value: req.body.value,
      plugin: req.params.plugin,
      controller: req.params.controller,
      action: req.params.action
    })
      .then(device => res.json(device))
      .catch(err => {
        this.log.error(err)
        res.status(404).json(err)
      })
  }
}

