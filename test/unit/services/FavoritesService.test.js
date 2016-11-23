'use strict'
/* global describe, it */

const assert = require('assert')

describe('FavoritesService', () => {
  it('should exist', () => {
    assert(global.app.api.services['FavoritesService'])
  })
})
