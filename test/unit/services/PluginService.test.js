'use strict'
/* global describe, it */

const assert = require('assert')

describe('PluginService', () => {
  it('should exist', () => {
    assert(global.app.api.services['PluginService'])
  })
})
