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

  const mdns = require('mdns-js');
  const service = mdns.createAdvertisement(mdns.tcp('_http'), app.config.web.port, {
    name: 'LISA',
    txt: {
      port: app.config.web.port,
      test: 'ok'
    }
  });
  service.start();
  /*
   bonjour.publish({
   name: 'LISA', txt: {
   host: app.config.web.host,
   type: 'http',
   port: app.config.web.port
   }, host: app.config.web.host, type: 'http', port: app.config.web.port
   })

  app.on('trails:stop', () => {
    bonjour.unpublishAll()
   })*/
  /*
   var mdns       = require('mdns');
   var txt_record = {
   name     : 'LISA',
   ip       : '192.168.1.16',
   isMaster : true
   };

   // advertise a http server on port 4321 for auto discover L.I.S.A. server from mobile/tablets
   var ad = mdns.createAdvertisement(mdns.tcp('http'), 4321, txt_record);
   ad.start();*/

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
   })
   app.services.PluginService._addPlugin('lisa-plugin-sony-vpl').then(plugin => {
   console.log(plugin, app)
   return app.services.PluginService.enablePlugin('lisa-plugin-sony-vpl')
   }).catch(err => {
   console.log(err)
   return app.services.PluginService.enablePlugin('lisa-plugin-sony-vpl')
   })*/
}
