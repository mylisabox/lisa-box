'use strict'
/* global describe, it */

const assert = require('assert')

describe('Plugin Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Plugin'])
  })
})
