const Controller = require('trails/controller')

/**
 * @module VoiceCommandsController
 * @description REST api to setup voice commands.
 */
module.exports = class VoiceCommandsController extends Controller {
  setupVoiceCommands(req, res) {
    req.app.multerVoiceConfig.single('config')(req, res, err => {
      if (err) {
        res.serverError(err)
      }
      else {
        this.app.services.VoiceCommandsService.startVoiceCommands();
        res.json({})
      }
    })
  }
}
