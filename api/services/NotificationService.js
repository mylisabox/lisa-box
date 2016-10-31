'use strict'

const Service = require('trails-service')
const _ = require('lodash')
const ejs = require('ejs')
const path = require('path')
const NOTIFICATION_TYPE = require('../utils/enums').NOTIFICATION_TYPE

/**
 * @module NotificationService
 * @description Service to send notifications
 */
module.exports = class NotificationService extends Service {

  _buildTemplate(type, templateName, data) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(path.join(this.app.config.main.paths.templates, type, templateName + '.ejs'), data, {}, (err, str) => {
        // str => Rendered HTML string
        if (err) {
          return reject(err)
        }
        else {
          return resolve(str)
        }
      })
    })
  }

  dispatchNotification(notification) {
    return this.app.orm.Notification.create(notification).then(notification => {
      this.sendWebNotification(notification)

      if (notification.userId) {
        notification.getUser().then(user => {
          //Should send an sms
          if (user.mobile && (notification.type === NOTIFICATION_TYPE.AUTO || notification.type === NOTIFICATION_TYPE.SMS)) {
            return this._buildTemplate(NOTIFICATION_TYPE.SMS, notification.template, {
              user: user,
              notification: notification
            }).then(str => {
              return this.app.services.TwilioService.sendSMSTo(user.mobile, str)
            }).then(() => notification)
          }
          //Send an email
          else {
            return this._buildTemplate(NOTIFICATION_TYPE.EMAIL, notification.template, {
              user: user,
              notification: notification
            }).then(str => {
              return this.app.services.EmailService.send({
                to: user.email,
                subject: notification.subject,
                html: str
              }).then(() => notification)
            })
          }
        })
      }
      return notification
    })
  }

  sendWebNotification(notification) {
    if (notification.userId) {
      this.app.sockets.room('user_' + notification.userId).send('notification', notification)
    }
    else {
      this.app.sockets.room('admins').send('notification', notification)
    }
  }

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

    return this.dispatchNotification({
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

