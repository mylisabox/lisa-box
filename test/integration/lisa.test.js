'use strict'
/* global describe, it */

const assert = require('assert')

describe('LISA', () => {
  let lisa
  before(() => {
    lisa = global.app.lisa

    return global.app.orm.Plugin.create({
      name: 'unknown',
      internalName: 'unknown',
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
        assert.equal(device.attr1, 'attr1')
        assert.equal(device.attr2, 'attr2')
        assert(device.createdAt)
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

  describe('Notification management', () => {
    it('should send a notification with an associate user', () => {
      return lisa.sendNotification(1, 'my title', 'desc', 'img', 'defaultAction', 'action', 'fr', 'template1')
        .then(result => {
          assert(result)
          assert.equal(result.title, 'my title')
          assert.equal(result.description, 'desc')
          assert.equal(result.image, 'img')
          assert.equal(result.defaultAction, 'defaultAction')
          assert.equal(result.addAction, 'action')
          assert.equal(result.lang, 'fr')
          assert.equal(result.template, 'default')
          assert.equal(result.pluginName, 'unknown')
          assert.equal(result.userId, 1)
        })
    })

    it('should send a notification without an associate user', () => {
      return lisa.sendNotification(null, 'my title', 'desc', 'img', 'defaultAction', 'action', 'fr')
        .then(result => {
          assert(result)
          assert.equal(result.title, 'my title')
          assert.equal(result.description, 'desc')
          assert.equal(result.image, 'img')
          assert.equal(result.defaultAction, 'defaultAction')
          assert.equal(result.addAction, 'action')
          assert.equal(result.lang, 'fr')
          assert.equal(result.template, 'default')
          assert.equal(result.pluginName, 'unknown')
          assert.equal(result.userId, undefined)
        })
    })
  })

  describe('Preferences management', () => {
    it('should save preferences', () => {
      return lisa.setPreferences({pref: 'ok'})
    })

    it('should retrieve preferences', () => {
      return lisa.getPreferences().then(prefs => {
        assert(prefs)
        assert.equal(prefs.pref, 'ok')
      })
    })
  })
})
