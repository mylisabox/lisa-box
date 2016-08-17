'use strict'
/* global describe, it */

const assert = require('assert')

describe('DefaultController', () => {
  it('should exist', () => {
    assert(global.app.api.controllers['DefaultController'])
  })
})
