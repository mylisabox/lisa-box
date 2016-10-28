'use strict'
/* global describe, it */

const assert = require('assert')

describe('LISA', () => {
  let lisa
  before(() => {
    lisa = global.app.lisa

    return global.app.orm.Plugin.create({
      name: 'unknown',
      version: '1.0.0',
      camelName: 'unknown'
    })
  })

  describe('Device management', () => {
    it('should add a device', () => {
      return lisa.createOrUpdateDevices({
        name: 'test',
        attr1: 'attr1',
        attr2: 'attr2'
      }).then(device => {
        assert.equal(device.id, 1)
        assert.equal(device.name, 'test')
        assert.equal(device.pluginName, 'unknown')
        assert.equal(device.data.name, 'test')
        assert.equal(device.data.pluginName, 'unknown')
        assert.equal(device.data.attr1, 'attr1')
        assert.equal(device.data.attr2, 'attr2')
        assert(!device.attr1)
        assert(!device.attr2)
      })
    })

    it('should retrieve devices for current plugin', () => {
      return lisa.findDevices().then(devices => {
        assert.equal(devices.length, 1)
        assert.equal(devices[0].name, 'test')
        assert.equal(devices[0].pluginName, 'unknown')
        assert.equal(devices[0].attr1, 'attr1')
        assert.equal(devices[0].attr2, 'attr2')
      })
    })

    it('should retrieve specific device for current plugin', () => {
      return lisa.findDevices({id: 1}).then(device => {
        assert.equal(device.name, 'test')
        assert.equal(device.pluginName, 'unknown')
        assert.equal(device.attr1, 'attr1')
        assert.equal(device.attr2, 'attr2')
      })
    })

    it('should update a device', () => {
      return lisa.createOrUpdateDevices({
        id: 1,
        name: 'test updated',
        attr1: 'attr1 updated',
        attr2: 'attr2 updated'
      }).then(devices => {
        assert.equal(devices.length, 1)
        assert.equal(devices[0], 1)
        return global.app.orm.Device.find({where: {id: 1}}).then(device => {
          assert.equal(device.id, 1)
          assert.equal(device.name, 'test updated')
          assert.equal(device.pluginName, 'unknown')
          assert.equal(device.data.name, 'test updated')
          assert.equal(device.data.pluginName, 'unknown')
          assert.equal(device.data.attr1, 'attr1 updated')
          assert.equal(device.data.attr2, 'attr2 updated')
          assert(!device.attr1)
          assert(!device.attr2)
        })
      })
    })
  })
})
