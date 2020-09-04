'use strict'

const Controller = require('trails/controller')
const path = require('path')
const _ = require('lodash')
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
    const criteria = req.params.id || {where: options}

    this.app.services.PluginService.find(req.user.lang, criteria, options).then(elements => {
      res.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code === 'E_VALIDATION') {
        res.status(400).json(error)
      } else if (error.code === 'E_NOT_FOUND') {
        res.status(404).json(error)
      } else {
        res.status(500).send(res.boom.wrap(manageErrors(this.app, error), 500))
      }
    })
  }

  find(req, res) {
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = req.params.id || options

    this.app.services.PluginService.find(req.user.lang, criteria, options).then(elements => {
      res.status(elements ? 200 : 404).json(elements || {})
    }).catch(error => {
      if (error.code === 'E_VALIDATION') {
        res.status(400).json(error)
      } else if (error.code === 'E_NOT_FOUND') {
        res.status(404).json(error)
      } else {
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

  installPlugin(req, res) {
    const plugin = req.body.id
    const from = req.body.from || 'github'
    const version = req.body.version || 'master'
    this.app.services.PluginService.installPlugin(plugin, version, from).then(results => {
      res.json(results)
    }).catch(err => {
      res.status(500).send(res.boom.wrap(manageErrors(this.app, err), 500))
    })
  }

  uninstallPlugin(req, res) {
    const plugin = req.params.id
    this.app.services.PluginService.uninstalSlPlugin(plugin).then(results => {
      res.json(results)
    }).catch(err => {
      res.status(500).send(res.boom.wrap(manageErrors(this.app, err), 500))
    })
  }

  async getStorePlugins(req, res) {
    const footprintService = this.app.services.FootprintService
    const installedPlugins = await footprintService.find('plugin', {}, {})
    const plugins = [
      {
        id: 'lisa-plugin-hue',
        name: 'HUE Philips',
        description: 'Manage HUE Philips devices from L.I.S.A. and voice commands'
      },
      {
        id: 'lisa-plugin-kodi',
        name: 'Kodi, XBMC',
        description: 'Manage Kodi instance from voice commands'
      },
      {
        id: 'lisa-plugin-sony-vpl',
        name: 'Sony VPL Projector',
        description: 'Manage video projector from L.I.S.A. and voice commands'
      },
      {
        id: 'lisa-plugin-ir',
        name: 'Infra red',
        description: 'Launch infra red signals from L.I.S.A. if the server has IR emitter'
      },
      {
        id: 'lisa-plugin-voice',
        name: 'L.I.S.A. voice',
        description: 'Add additional voice command devices if you have some'
      },
      {
        id: 'lisa-plugin-cam-mjpeg',
        name: 'IP Cam',
        description: 'Add IP camera with mjpeg streams to your L.I.S.A.'
      },
      {
        id: 'lisa-plugin-bose-soundtouch',
        name: 'Bose Soundtouch',
        description: 'Manage Bose Soundtouch devices from L.I.S.A.'
      },
    ]

    plugins.forEach((plugin) => {
      plugin.installed = installedPlugins.find((installedPlugin) => plugin.id === installedPlugin.name) != null
    })

    res.json(plugins);
  }
}

