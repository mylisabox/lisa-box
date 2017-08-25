'use strict'

const Controller = require('trails/controller')
const path = require('path')
const manageErrors = require('../utils/error')

/**
 * @module PluginController
 * @description Generated Trails.js Controller.
 */
module.exports = class PluginController extends Controller {
  image(req, res) {
    let filePath = path.resolve(__dirname + '/../../plugins/' + req.params.id + '/assets/images/' + req.params.name)
    if (req.params.subname) {
      filePath += '/' + req.params.subname
    }
    res.sendFile(filePath)
  }

  search(req, res) {
    const query = req.query.query
    delete req.query.query
    this.log.debug(query)
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = req.params.id || this.app.packs.express.getCriteriaFromQuery(req.query)
    this.app.services.PluginService.find(req.user.lang, criteria, options).then(elements => {
      res.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code === 'E_VALIDATION') {
        res.status(400).json(error)
      }
      else if (error.code === 'E_NOT_FOUND') {
        res.status(404).json(error)
      }
      else {
        res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
      }
    })
  }

  find(req, res) {
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = req.params.id || this.app.packs.express.getCriteriaFromQuery(req.query)

    this.app.services.PluginService.find(req.user.lang, criteria, options).then(elements => {
      res.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code === 'E_VALIDATION') {
        res.status(400).json(error)
      }
      else if (error.code === 'E_NOT_FOUND') {
        res.status(404).json(error)
      }
      else {
        res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
      }
    })
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

  pairing(req, res) {
    const plugin = req.params.id
    const driver = req.params.driver
    const data = req.body

    this.app.services.PluginService.pairing(plugin, driver, data).then(results => {
      res.json(results)
    }).catch(err => {
      res.status(500).send(res.boom.wrap(manageErrors(this.app, err), 500))
    })
  }


  getDevicesForPairing(req, res) {
    const plugin = req.params.id
    const driver = req.params.driver

    this.app.services.PluginService.getDevicesForPairing(plugin, driver).then(results => {
      res.json(results)
    }).catch(err => {
      res.status(500).send(res.boom.wrap(manageErrors(this.app, err), 500))
    })
  }

}

