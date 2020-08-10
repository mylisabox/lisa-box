/**
 * Bootstrap function called when Trails server is ready
 * @param app Trails application
 */
const LISA = require('../../lisa')
const fs = require('fs')
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

export const bootstrap = (app) => {
  app.services.WebSocketService.init()
  app.services.IRService.init()
  app.services.DiscoveryService.init()
  app.lisa = new LISA(app)

  app.bonjour = bonjour
  app.mdns = mdns
  const args = getArgs()
  if (args['enable-voice-commands']) {

    // advertise an HTTP server on configured port
    const os = require('os')
    const polly = require('lisa-speaker-polly')
    const VoiceCommand = require('lisa-standalone-voice-command')
    const pico = require('lisa-standalone-voice-command/lib/speaker')

    //app.serialPort = serialPort

    const language = app.env.LANG || 'en-US'
    app.log.info('set lang to ' + language)
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

    const hotwords = [{
      file: './node_modules/lisa-standalone-voice-command/speech/hey_lisa.pmdl',
      hotword: 'hey lisa'
    }]

    fs.readdirSync('./config/speech').forEach(file => {
      if (file.endsWith('.pmdl')) {
        console.log(file)
        hotwords.push({
          file: './config/speech/'+file,
          hotword: file.replace('.pmdl', '')
        })
      }
    })

    const voiceCommand = new VoiceCommand({
      matrix: '127.0.0.1',
      log: app.log,
      speaker: {
        module: isPollyCredentialsPresent ? polly : pico,
        options: {
          voiceId: voiceId // see http://docs.aws.amazon.com/polly/latest/dg/voicelist.html for other voices
        }
      },
      url: (app.config.web.ssl == null ? 'http' : 'https')+'://127.0.0.1:'+app.config.web.port,
      gSpeech: './config/speech/LISA-gfile.json',
      hotwords: hotwords,
      language: language
    })
    voiceCommand.on('hotword', () => app.log.debug('hey lisa detected'))
    voiceCommand.on('error', error => app.log.error(error))
    voiceCommand.on('final-result', sentence => app.log.debug(sentence + ' detected'))
    voiceCommand.on('bot-result', result => app.log.debug(result))
  }

  if(app.env.NODE_ENV !== 'testing') {
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
