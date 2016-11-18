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
  bonjour.publish({ name: 'LISA', type: 'http', port: app.config.web.port })

  app.on('trails:stop', () => {
    bonjour.unpublishAll()
  })
  app.serialPort = serialPort
  app.bonjour = bonjour
  app.lisa = new LISA(app)
  /*
   app.services.PluginService._addPlugin('lisa-plugin-hue').then(plugin => {
   console.log(plugin, app)
   return app.services.PluginService.enablePlugin('lisa-plugin-hue')
   }).catch(err => {
   console.log(err)
   return app.services.PluginService.enablePlugin('lisa-plugin-hue')
   })*/
}
