'use strict'
/* global describe, it */

const assert = require('assert')

describe('Device Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Device'])
  })
})
