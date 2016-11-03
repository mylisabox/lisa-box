'use strict'
/* global describe, it */

const assert = require('assert')

describe.skip('NotificationService', () => {
  let notificationService

  before(() => {
    notificationService = global.app.services.NotificationService
  })

  it('should exist', () => {
    assert(global.app.api.services.NotificationService)
    assert(notificationService)
  })

  it('should create a notification associate to user one', done => {
    notificationService.sendNotification(1, null, 'my title', 'desc', 'img', 'defaultAction', 'action', 'fr', 'template1').then(result => {
      assert(result)
      assert.equal(result.title, 'my title')
      assert.equal(result.description, 'desc')
      assert.equal(result.image, 'img')
      assert.equal(result.defaultAction, 'defaultAction')
      assert.equal(result.addAction, 'action')
      assert.equal(result.lang, 'fr')
      assert.equal(result.template, 'template1')
      assert.equal(result.userId, 1)
      done()
    }).catch(done)
  })

  it('should create a notification associate to a plugin', done => {
    notificationService.sendNotification(null, 'unknown', 'my title', 'desc', 'img', 'defaultAction', 'action', 'fr', 'template1').then(result => {
      assert(result)
      assert.equal(result.title, 'my title')
      assert.equal(result.description, 'desc')
      assert.equal(result.image, 'img')
      assert.equal(result.defaultAction, 'defaultAction')
      assert.equal(result.addAction, 'action')
      assert.equal(result.lang, 'fr')
      assert.equal(result.template, 'template1')
      assert.equal(result.pluginName, 'unknown')
      done()
    }).catch(done)
  })


  it('should create a notification associate to a plugin and a user', done => {
    notificationService.sendNotification(1, 'unknown', 'my title', 'desc', 'img', 'defaultAction', 'action', 'fr', 'template1').then(result => {
      assert(result)
      assert.equal(result.title, 'my title')
      assert.equal(result.description, 'desc')
      assert.equal(result.image, 'img')
      assert.equal(result.defaultAction, 'defaultAction')
      assert.equal(result.addAction, 'action')
      assert.equal(result.lang, 'fr')
      assert.equal(result.template, 'template1')
      assert.equal(result.pluginName, 'unknown')
      assert.equal(result.userId, 1)
      done()
    }).catch(done)
  })
})
