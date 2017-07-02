/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
const LISA = require('../lisa')
//const serialPort = require('serialport')
const bonjour = require('bonjour')()

module.exports = (app) => {
  app.services.WebSocketService.init()

  app.lisa = new LISA(app)
  if (app.env.NODE_ENV !== 'testing') {
    // advertise an HTTP server on configured port
    const VoiceCommand = require('lisa-standalone-voice-command')
    const mdns = require('mdns-js')
    const service = mdns.createAdvertisement(mdns.tcp('_http'), app.config.web.port, {
      name: 'LISA',
      txt: {
        port: app.config.web.port
      }
    })
    service.start()

    //app.serialPort = serialPort
    app.mdns = mdns
    app.bonjour = bonjour

    const language = app.env.LANG || 'en-US'
    const voiceCommand = new VoiceCommand({
      mode: LISA.MODE_INTERNAL,
      //matrix: '192.168.1.20',
      gSpeech: './config/speech/LISA-gfile.json',
      language: language
    })

    app.on('stop', () => {
      voiceCommand.stop()
    })

    voiceCommand.on('hotword', () => app.log.debug('hey lisa detected'))
    voiceCommand.on('error', error => app.log.error(error))
    voiceCommand.on('final-result', sentence => {
      app.log.debug(sentence + ' detected')
      if (sentence && sentence !== '') {
        app.services.ChatBotService.interact(null, language.substring(0, 2) || this.app.config.chatbot.defaultLang,
          sentence, null)
          .then(result => {
            app.log.debug('bot results')
            app.log.debug(JSON.stringify(result))
            return app.services.PluginService.interact(result).then(results => {
              //app.log.debug('plugin results')
              //app.log.debug(results)
            })
          }).catch(err => {
          app.log.error(err)
        })
      }
    })

    /*eslint-disable */
    const plugins = ['lisa-plugin-hue', 'lisa-plugin-sony-vpl', 'lisa-plugin-kodi', 'lisa-plugin-cam-mjpeg']
    //FIXME later plugins will be manage automatically from a plugin store, for now let's do it manually here
    for (const plugin of plugins) {
      try {
        app.services.PluginService._addPlugin(plugin).then(plugin => {
          console.log(plugin, app)
          return app.services.PluginService.enablePlugin(plugin)
        }).catch(err => {
          return app.services.PluginService._updatePlugin(plugin).then(() => app.services.PluginService.enablePlugin(plugin))
        })
      }
      catch (e) {
        app.log.error(e)
      }
    }
    /*eslint-enable */
  }
}
