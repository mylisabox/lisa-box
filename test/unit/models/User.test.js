'use strict'
/* global describe, it */

const assert = require('assert')

describe('User Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['User'])
  })
})
