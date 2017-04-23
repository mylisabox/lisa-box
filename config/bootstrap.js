/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
const LISA = require('../lisa')
const serialPort = require('serialport')
const bonjour = require('bonjour')()

module.exports = (app) => {
  app.services.WebSocketService.init()
  // advertise an HTTP server on configured port

  const mdns = require('mdns-js')
  const service = mdns.createAdvertisement(mdns.tcp('_http'), app.config.web.port, {
    name: 'LISA',
    txt: {
      port: app.config.web.port,
      test: 'ok'
    }
  })
  service.start()

  app.serialPort = serialPort
  app.bonjour = bonjour
  app.lisa = new LISA(app)

  const Sonus = require('sonus')
  const speech = require('@google-cloud/speech')({
    keyFilename: './config/speech/LISA-gfile.json'
  })

  const hotwords = [{file: './config/speech/hey_lisa.pmdl', hotword: 'hey lisa'}]
  const language = 'fr-FR'
  const sonus = Sonus.init({hotwords, language}, speech)
  Sonus.start(sonus)
  sonus.on('hotword', (index, keyword) => app.log.debug('hey lisa detected'))
  sonus.on('final-result', sentence => {
    app.log.debug(sentence + ' detected')
    app.services.ChatBotService.interact(null, language.substring(0, 2) || this.app.config.chatbot.defaultLang,
      sentence, null)
      .then(result => {
        app.log.debug('bot results')
        app.log.debug(JSON.stringify(result))
        return app.services.PluginService.interact(result).then(results => {
          app.log.debug('plugin results')
          app.log.debug(results)
        })
      }).catch(err => {
      app.log.error(err)
    })
  })

  /*
   app.services.PluginService._addPlugin('lisa-plugin-hue').then(plugin => {
   console.log(plugin, app)
   return app.services.PluginService.enablePlugin('lisa-plugin-hue')
   }).catch(err => {
   console.log(err)
   return app.services.PluginService.enablePlugin('lisa-plugin-hue')
   })
   app.services.PluginService._addPlugin('lisa-plugin-sony-vpl').then(plugin => {
   console.log(plugin, app)
   return app.services.PluginService.enablePlugin('lisa-plugin-sony-vpl')
   }).catch(err => {
   console.log(err)
   return app.services.PluginService.enablePlugin('lisa-plugin-sony-vpl')
   })*/
}
