'use strict'

const Controller = require('trails/controller')
const _ = require('lodash')
const path = require('path')
const manageErrors = require('../utils/error')

/**
 * @module PluginController
 * @description Generated Trails.js Controller.
 */
module.exports = class PluginController extends Controller {
  image(req, res) {
    let filePath = path.resolve(__dirname + '/../../plugins/' + req.params.id + '/images/' + req.params.name)
    if (req.params.subname) {
      filePath += '/' + req.params.subname
    }
    res.sendFile(filePath)
  }

  search(req, res) {
    const query = req.query.query
    delete req.query.query

    if (!req.query.query || req.query.query === "") {
      this._find(req).then(elements => {
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
    else {
      //TODO DO SEARCH
    }
  }

  _find(req) {
    const footprintService = this.app.services.FootprintService
    const options = this.app.packs.express.getOptionsFromQuery(req.query)
    const criteria = this.app.packs.express.getCriteriaFromQuery(req.query)
    const id = req.params.id
    let response
    if (id) {
      response = footprintService.find('plugin', id, options)
        .then(plugins => this._translatePlugin(req.user.lang, plugins))
    }
    else {
      response = footprintService.find('plugin', criteria, options)
        .then(plugins => this._translatePlugin(req.user.lang, plugins))
    }
    return response
  }

  find(req, res) {
    this._find(req).then(elements => {
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

  _translatePlugin(lang, plugins) {
    const results = []
    for (let plugin of plugins) {
      plugin = plugin.toJSON()
      const infos = plugin.infos

      const image = this._translateField(lang, infos.image)

      const pluginData = {
        id: plugin.name,
        name: this._translateField(lang, infos.name),
        description: this._translateField(lang, infos.description),
        image: image ? '/plugin/' + plugin.name + '/images/' + image : null,
        settings: this._translateSettings(lang, plugin.settings),
        devicesSettings: this._translateDevices(lang, plugin, plugin.devicesSettings)
      }
      results.push(pluginData)
    }
    return results
  }

  _translateDevices(lang, plugin, devices) {
    const translatedDevices = []
    for (let device of devices) {
      const image = this._translateField(lang, device.image)
      const settings = this._translateSettings(lang, device.settings)
      translatedDevices.push({
        name: this._translateField(lang, device.name),
        description: this._translateField(lang, device.description),
        image: image ? '/plugin/' + plugin.name + '/images/' + image : null,
        settings: [{
          controlType: 'textbox',
          type: 'text',
          name: 'name',
          regexp: '^[a-zA-Z0-9_ -]+$',
          minLength: 3,
          maxLength: 20,
          label: this._translateField(lang, {en: 'Name', fr: 'Nom'}),
          required: true
        },
          {
            controlType: 'textbox',
            type: 'hidden',
            name: 'pluginName',
            defaultValue: plugin.name,
            required: true
          }].concat(settings),
        pairing: device.pairing
      })
    }
    return translatedDevices
  }

  _translateSettings(lang, settings) {
    const translatedSettings = []
    if (settings) {
      for (let setting of settings) {
        translatedSettings.push({
          controlType: setting.controlType,
          type: setting.type,
          maxLength: setting.maxLength || 255,
          minLength: setting.minLength || 0,
          regexp: this._translateField(lang, setting.regexp),
          defaultValue: setting.defaultValue,
          name: setting.name,
          label: this._translateField(lang, setting.label),
          help: this._translateField(lang, setting.help),
          required: setting.required,
          private: setting.private,
        })
      }
    }
    return translatedSettings
  }

  _translateField(lang, field) {
    let result
    if (field) {
      if (_.isString(field)) {
        result = field
      }
      else if (field[lang]) {
        result = field[lang]
      }
      else {
        result = field['en']
      }
    }
    return result
  }
}

