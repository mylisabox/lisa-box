'use strict'

const Controller = require('trails/controller')

/**
 * @module ChatBotController
 * @description Generated Trails.js Controller.
 */
module.exports = class ChatBotController extends Controller {
  interact(req, res) {
    return this.app.services.ChatBotService.interact(req.user ? req.user.id : req.headers['device-id'],
      req.body.lang || req.params.lang || this.app.config.chatbot.defaultLang,
      req.body.sentence, req.body.id || req.params.id)
      .then(result => {
        result.context = req.body.context || {}
        return this.app.services.PluginService.interact(result).then(results => {
          return res.json(results)
        })
      }).catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }
}

