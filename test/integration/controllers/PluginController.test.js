'use strict'
/* global describe, it */

const assert = require('assert')

describe('PluginController', () => {
  it('should exist', () => {
    assert(global.app.api.controllers['PluginController'])
  })
})
