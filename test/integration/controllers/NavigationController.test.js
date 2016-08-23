'use strict'
/* global describe, it */

const assert = require('assert')

describe('NavigationController', () => {
  it('should exist', () => {
    assert(global.app.api.controllers['NavigationController'])
  })
})
