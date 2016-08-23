'use strict'
/* global describe, it */

const assert = require('assert')

describe('Room Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Room'])
  })
})
