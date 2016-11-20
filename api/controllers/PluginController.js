'use strict'

const Controller = require('trails-controller')

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
    this.app.orm.Device.findById(req.param('device')).then(device => {

      if (device) {
        const key = req.body.key
        let value = req.body.value || false
        const plugin = req.params.plugin
        const controller = req.params.controller
        const action = req.params.action

        if (!isNaN(value)) {
          value = +value
        }
        if (value == 'true') {
          value = true
        }
        if (value == 'false') {
          value = false
        }
        const data = device.toJSON().data
        data[key] = value
        data.id = device.id
        return this.app.services.PluginService.callApiOnPlugin(plugin, 'controllers', controller, action,
          [data, key, value])
          .then(_ => {
            res.json(data)
          })
      }
      else {
        return Promise.reject(new Error('Not found'))
      }
    }).catch(err => {
      res.status(404).json(err)
    })
  }
}

