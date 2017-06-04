'use strict'

const IRRecord = require('infrared').irrecord
const EventEmitter = require('events')

const STEP_BUTTON_TEXT = 'Please enter the name for the next button'
const STEP_TIMEOUT_TEXT = 'irrecord: no data for 10 secs, aborting'
const STEP_ERROR = 'Something went wrong'
const STEP_ERROR_NO_BINARY = 'execvp(3) failed.: No such file or directory'
const STEP_START_TEXT = 'This program will record the signals from your remote control and create a config file for lircd'
const STEP_DISCOVER = 'Press RETURN now to start recording'

module.exports = class IRrecord extends EventEmitter {
  constructor() {
    super()

    this._irrecord = new IRRecord()
    this._irrecord.on('stdout', data => {
      if (data.indexOf(STEP_START_TEXT) != -1) {
        this._irrecord.write()
      }
      else if (data.indexOf(STEP_DISCOVER) != -1) {
        this.emit('discover')
        this._irrecord.write()
      }
      else if (data.indexOf(STEP_BUTTON_TEXT) != -1) {
        this.emit('button')
      }
      else if (data.indexOf(STEP_TIMEOUT_TEXT) != -1) {
        this.emit('timeout')
      }
      else if (data.indexOf(STEP_ERROR) != -1 || data.indexOf(STEP_ERROR_NO_BINARY) != -1) {
        this.emit('error')
      }
    })
    this._irrecord.on('stderr', data => {
      this.emit('error', data)
    })
    this._irrecord.on('exit', () => {
      this.emit('stop')
    })
  }

  start(remoteName, options) {
    this.emit('start')
    this._irrecord.start(__dirname + '../templates/remotes/' + remoteName, options)
  }

  stop() {
    this._irrecord.write()
  }

  quit() {
    this._irrecord.quit()
  }

  setButtonName(name) {
    this._irrecord.write(name)
  }
}
