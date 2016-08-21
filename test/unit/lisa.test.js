'use strict'
/* global describe, it */

const assert = require('assert')
const EventEmitter = require('events')
const LISA = require('../../lisa')

describe('LISA', () => {
  let lisa
  before(() => {
    lisa = new LISA({
      log: console.log,
      _: 'i18n',
      bonjour: 'bonjour',
      serialPort: 'serialPort'
    })
  })

  it('should expose some app attributes', () => {
    assert.equal(lisa._, 'i18n')
    assert.equal(lisa.i18n, 'i18n')
    assert.equal(lisa.bonjour, 'bonjour')
    assert.equal(lisa.serialPort, 'serialPort')
    assert.equal(lisa.log, console.log)
  })
  it('should be an event emitter', () => {
    assert(lisa.emit)
    assert(lisa.on)
    assert(lisa instanceof EventEmitter)
  })
})
