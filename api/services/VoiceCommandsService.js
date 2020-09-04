'use strict'

const Service = require('trails/service')
const fs = require('fs')

/**
 * @module VoiceCommandsService
 * @description Service to setup voice commands
 */
module.exports = class VoiceCommandsService extends Service {
  startVoiceCommands() {
    if (this.voiceCommand) {
      this.voiceCommand.stop();
    }

    // advertise an HTTP server on configured port
    const os = require('os')
    const polly = require('lisa-speaker-polly')
    const VoiceCommand = require('lisa-standalone-voice-command')
    const pico = require('lisa-standalone-voice-command/lib/speaker')

    //app.serialPort = serialPort

    const language = (this.app.env.LANG || 'en-US').substring(0, 5).replace('_', '-')
    this.log.info('set lang to ' + language)
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
        hotwords.push({
          file: './config/speech/' + file,
          hotword: file.replace('.pmdl', '')
        })
      }
    })

    const voiceCommand = new VoiceCommand({
      matrix: '127.0.0.1',
      log: this.app.log,
      speaker: {
        module: isPollyCredentialsPresent ? polly : pico,
        options: {
          voiceId: voiceId // see http://docs.aws.amazon.com/polly/latest/dg/voicelist.html for other voices
        }
      },
      url: (this.app.config.web.ssl == null ? 'http' : 'https') + '://127.0.0.1:' + this.app.config.web.port,
      gSpeech: './config/speech/LISA-gfile.json',
      hotwords: hotwords,
      language: language
    })
    voiceCommand.on('hotword', () => this.app.log.debug('hey lisa detected'))
    voiceCommand.on('error', error => this.app.log.error(error))
    voiceCommand.on('final-result', sentence => this.app.log.debug(sentence + ' detected'))
    voiceCommand.on('bot-result', result => this.app.log.debug(result))
    this.voiceCommand = voiceCommand;
  }
}

