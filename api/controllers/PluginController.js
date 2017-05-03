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

  setGroupValue(req, res) {
    this.app.services.PluginService.setGroupValue(req.params.roomId, req.params.type, {
      key: req.body.key,
      value: req.body.value
    })
      .then(device => res.json(device))
      .catch(err => {
        this.log.error(err)
        res.status(404).json(err)
      })
  }

  setValue(req, res) {
    this.app.services.PluginService.setValue(req.params.device, {
      key: req.body.key,
      value: req.body.value,
      plugin: req.params.plugin
    })
      .then(device => res.json(device))
      .catch(err => {
        this.log.error(err)
        res.status(404).json(err)
      })
  }
}

