'use strict'
/* global describe, it */

const assert = require('assert')

describe('Dashboard Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Dashboard'])
  })
})
