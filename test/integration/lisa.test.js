'use strict'
/* global describe, it */

const assert = require('assert')

describe('LISA', () => {
  let lisa
  before(() => {
    lisa = global.app.lisa

    return Promise.all([global.app.orm.Plugin.create({
      name: 'unknown',
      internalName: 'unknown',
      version: '1.0.0',
      camelName: 'unknown'
    }),
      global.app.orm.Room.create({
        name: 'bedroom'
      })
    ])
  })

  describe('Rooms management', () => {
    it('should retrieve rooms', () => {
      return lisa.getRooms().then(rooms => {
        assert.equal(rooms.length, 1)
        assert.equal(rooms[0].name, 'bedroom')
        assert.equal(rooms[0].id, 1)
      })
    })

    it('should create a new room', () => {
      return lisa.createRoom('kitchen').then(room => {
        assert.equal(room.name, 'kitchen')
        assert.equal(room.id, 2)
      })
    })
  })

  describe('Device management', () => {
    it('should add a device', () => {
      return lisa.createOrUpdateDevices({
        name: 'test',
        data: {
          attr1: 'attr1',
          attr2: 'attr2'
        },
        template: 'ok'
      }).then(device => {
        assert.equal(device.id, 1)
        assert.equal(device.name, 'test')
        assert.equal(device.pluginName, 'unknown')
        assert.equal(device.data.attr1, 'attr1')
        assert.equal(device.data.attr2, 'attr2')
        assert.equal(device.template, 'ok')
        assert(device.createdAt)
      })
    })

    it('should retrieve devices for current plugin', () => {
      return lisa.findDevices().then(devices => {
        assert.equal(devices.length, 1)
        assert.equal(devices[0].name, 'test')
        assert.equal(devices[0].pluginName, 'unknown')
        assert.equal(devices[0].data.attr1, 'attr1')
        assert.equal(devices[0].data.attr2, 'attr2')
        assert.equal(devices[0].template, 'ok')
      })
    })

    it('should retrieve specific device for current plugin', () => {
      return lisa.findDevices({id: 1}).then(device => {
        assert.equal(device.name, 'test')
        assert.equal(device.pluginName, 'unknown')
        assert.equal(device.data.attr1, 'attr1')
        assert.equal(device.data.attr2, 'attr2')
        assert.equal(device.template, 'ok')
      })
    })

    it('should update a device', () => {
      return lisa.createOrUpdateDevices({
        id: 1,
        name: 'test updated',
        data: {
          attr1: 'attr1 updated',
          attr2: 'attr2 updated'
        },
        template: 'ok'
      }).then(devices => {
        assert.equal(devices.length, 1)
        assert.equal(devices[0], 1)
        return global.app.orm.Device.find({where: {id: 1}}).then(device => {
          assert.equal(device.id, 1)
          assert.equal(device.name, 'test updated')
          assert.equal(device.pluginName, 'unknown')
          assert.equal(device.data.attr1, 'attr1 updated')
          assert.equal(device.data.attr2, 'attr2 updated')
          assert.equal(device.template, 'ok')
          assert(!device.attr1)
          assert(!device.attr2)
        })
      })
    })
  })

  describe('Notification management', () => {
    it('should send a notification with an associate user', () => {
      return lisa.sendNotification(1, 'my title', lisa.NOTIFICATION_TYPE.WEB, 'desc', 'img', 'defaultAction', 'action', 'fr', 'default')
        .then(result => {
          assert(result)
          assert.equal(result.title, 'my title')
          assert.equal(result.description, 'desc')
          assert.equal(result.icon, 'img')
          assert.equal(result.defaultAction, 'defaultAction')
          assert.equal(result.addAction, 'action')
          assert.equal(result.lang, 'fr')
          assert.equal(result.template, 'default')
          assert.equal(result.pluginName, 'unknown')
          assert.equal(result.userId, 1)
        })
    })

    it('should send a notification without an associate user', () => {
      return lisa.sendNotification(null, 'my title', lisa.NOTIFICATION_TYPE.WEB, 'desc', 'img', 'defaultAction', 'action', 'fr')
        .then(result => {
          assert(result)
          assert.equal(result.title, 'my title')
          assert.equal(result.description, 'desc')
          assert.equal(result.icon, 'img')
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
