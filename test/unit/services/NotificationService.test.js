'use strict'
/* global describe, it */

const assert = require('assert')

describe('NotificationService', () => {
  it('should exist', () => {
    assert(global.app.api.services['NotificationService'])
  })
})
