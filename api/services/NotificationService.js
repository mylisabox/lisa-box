'use strict'

const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module NotificationService
 * @description Service to send notifications
 */
module.exports = class NotificationService extends Service {
  /**
   * Send notification to the user(s)
   * @param to @optional associate user id to send the notif to
   * @param pluginName @optional associate plugin with the notif
   * @param title of the notif
   * @param description of the notif
   * @param image of the notif
   * @param defaultAction of the notif
   * @param action of the notif
   * @param lang of the notif
   * @param templateName of the notif not supported now
   * @returns Promise - notif data
   */
  sendNotification(to, pluginName, title, description, image, defaultAction, action, lang, templateName) {
    if (_.isObject(to)) {
      to = to.id
    }

    return this.app.orm.Notification.create({
      title: title,
      description: description,
      image: image,
      lang: lang,
      defaultAction: defaultAction,
      addAction: action,
      userId: to,
      pluginName: pluginName,
      template: templateName
    })
  }
}

