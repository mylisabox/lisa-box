'use strict'

const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module NotificationService
 * @description Service to send notifications
 */
module.exports = class NotificationService extends Service {
  sendNotification(to, title, lang, templateName, templateData) {
    if (_.isObject(to)) {
      to = to.id
    }

    return this.app.orm.Notification.create({
      title: title,
      lang: lang,
      userId: to,
      template: templateName,
      data: templateData
    })
  }
}

