'use strict'
/* global describe, it */

const assert = require('assert')

describe('NotificationService', () => {
  let notificationService

  before(() => {
    notificationService = global.app.services.NotificationService
  })

  it('should exist', () => {
    assert(global.app.api.services.NotificationService)
    assert(notificationService)
  })

  it('should create a notification associate to user one', done => {
    notificationService.sendNotification(1, 'my title', 'fr', 'template1', {name: 'jim'}).then(result => {
      assert(result)
      assert.equal(result.title, 'my title')
      assert.equal(result.lang, 'fr')
      assert.equal(result.template, 'template1')
      assert.equal(result.userId, 1)
      assert.deepEqual(result.data, {name: 'jim'})
      done()
    }).catch(done)
  })
})
