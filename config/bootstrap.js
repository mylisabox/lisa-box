/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
const LISA = require('../lisa')
//const serialPort = require('serialport')
const mdns = require('mdns-js')
const bonjour = require('bonjour')()

function getArgs() {
  const args = {};
  process.argv
    .slice(2, process.argv.length)
    .forEach( arg => {
      // long arg
      if (arg.slice(0,2) === '--') {
        const longArg = arg.split('=');
        const longArgFlag = longArg[0].slice(2,longArg[0].length);
        const longArgValue = longArg.length > 1 ? longArg[1] : true;
        args[longArgFlag] = longArgValue;
      }
      // flags
      else if (arg[0] === '-') {
        const flags = arg.slice(1,arg.length).split('');
        flags.forEach(flag => {
          args[flag] = true;
        });
      }
    });
  return args;
}

module.exports = (app) => {
  app.services.WebSocketService.init()
  app.services.IRService.init()
  app.services.DiscoveryService.init()
  app.lisa = new LISA(app)

  app.bonjour = bonjour
  app.mdns = mdns
  const args = getArgs()
  if (args['enable-voice-commands']) {
    app.services.VoiceCommandsService.startVoiceCommands()
  }
}
