'use strict'
/* global describe, it */

const assert = require('assert')

describe('Device Model', () => {
  it('should exist', () => {
    assert(global.app.api.models.Device)
    assert(global.app.orm.Device)
  })

  it('should allow data attribute in JSON', () => {
    const device = global.app.orm.Device.build({
      name: 'test',
      data: {
        test: 'ok'
      }
    })
    assert.equal(device.name, 'test')
    //data store as string
    assert.equal(device.dataValues.data, '{"test":"ok"}')
    //data retrieve as JSON
    assert.deepEqual(device.data, {test: 'ok'})

  })
})
