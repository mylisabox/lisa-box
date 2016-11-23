'use strict'
/* global describe, it */

const assert = require('assert')

describe('DashboardService', () => {
  it('should exist', () => {
    assert(global.app.api.services['DashboardService'])
  })
})
