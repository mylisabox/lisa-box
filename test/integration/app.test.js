'use strict'
/* global describe, it */

const assert = require('assert')

describe('App', () => {
  it('should have lisa plugin manage installed', () => {
    assert(global.app.packs.pluginsManager)
  })
})
