

import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
/**
 * @module ChatBotController
 * @description Generated Trails.js Controller.
 */
export class ChatBotController extends Controller {
  interact(req, res) {
    return this.app.services.ChatBotService.interact(req.user ? req.user.id : req.headers['device-id'],
      req.body.lang || req.params.lang || this.app.config.chatbot.defaultLang,
      req.body.sentence, req.body.id || req.params.id, req.body.context || {})
      .then(result => {
        this.log.debug(result)
        res.json(result)
      })
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }

  userBot(req, res) {
    return this.app.services.ChatBotService.getUserBot()
      .then(bot => res.json(bot))
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }

  saveUserBot(req, res) {
    return this.app.services.ChatBotService.setUserBot(req.body)
      .then(bot => res.json(bot))
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }

  deleteUserBot(req, res) {
    return this.app.services.ChatBotService.deleteUserBot(req.params.id)
      .then(bot => res.json(bot))
      .catch(err => {
        this.log.error(err)
        res.serverError(err)
      })
  }
}

