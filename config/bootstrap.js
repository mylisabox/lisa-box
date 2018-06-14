/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
const LISA = require('../lisa')
const fs = require('fs')
const os = require('os')
const bonjour = require('bonjour')()
//const serialPort = require('serialport')

const initVoice = (app) => {
  const VoiceCommand = require('lisa-standalone-voice-command')
  const pico = require('lisa-standalone-voice-command/lib/speaker')
  const polly = require('lisa-speaker-polly')

  const language = app.env.LANG || 'en-US'
  const isPollyCredentialsPresent = fs.existsSync(os.homedir() + '/.aws/credentials')
  let voiceId
  switch (language) {
    case 'fr-FR':
      voiceId = 'Celine'
      break
    case 'ru-RU':
      voiceId = 'Tatyana'
      break
    default:
      voiceId = 'Kimberly'
  }

  const voiceCommand = new VoiceCommand({
    matrix: '127.0.0.1',
    log: app.log,
    speaker: {
      module: isPollyCredentialsPresent ? polly : pico,
      options: {
        voiceId: voiceId // see http://docs.aws.amazon.com/polly/latest/dg/voicelist.html for other voices
      }
    },
    url: 'http://127.0.0.1:3000',
    gSpeech: './config/speech/LISA-gfile.json',
    language: language
  })
  voiceCommand.on('hotword', () => app.log.debug('hey lisa detected'))
  voiceCommand.on('error', error => app.log.error(error))
  voiceCommand.on('final-result', sentence => app.log.debug(sentence + ' detected'))
  voiceCommand.on('bot-result', result => app.log.debug(result))

}

module.exports = (app) => {
  app.services.WebSocketService.init()
  app.services.IRService.init()
  app.services.MdnsService.init()
  app.lisa = new LISA(app)
  app.bonjour = bonjour

  if (app.env.VOICE_ACTIVATED === "true") {
    initVoice(app)
  }

  if (app.env.NODE_ENV !== 'testing') {
    /*eslint-disable */
    //FIXME plugins should be manage from an online store
    fs.readdirSync('./plugins').forEach(plugin => {
      if (plugin !== '.gitkeep') {
        try {
          app.orm.Plugin.find({ where: { name: plugin } }).then(existingPlugin => {
            if (existingPlugin) {
              return app.services.PluginService._updatePlugin(plugin).then(() => {
                return app.services.PluginService.enablePlugin(plugin)
              })
            } else {
              return app.services.PluginService._addPlugin(plugin).then(() => {
                return app.services.PluginService.enablePlugin(plugin)
              }).catch(err => {
                app.log.error(err)
              })
            }
          })
        }
        catch (e) {
          app.log.error(e)
        }
      }
    })
    /*eslint-enable */
  }
}
