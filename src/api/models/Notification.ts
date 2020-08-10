

const Model = require('trails/model')
const _ = require('lodash')
const NOTIFICATION_TYPE = require('../utils/enums').NOTIFICATION_TYPE

/**
 * @module Notification
 * @description Notification sms/email/web
 */
module.exports = class Notification extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        hooks: {
          afterCreate: (values, options, fn) => {
            app.config.database.stores.sqlite.define.hooks.afterCreate(values, options, fn)
            app.services.NotificationService
              .sendNotification(values)
              .catch(err => app.log.error(err))
            fn()
          }
        },
        classMethods: {
          associate: (models) => {
            models.Notification.belongsTo(models.User, {
              as: 'user',
              onDelete: 'CASCADE'
            })
            models.Notification.belongsTo(models.Plugin, {
              as: 'plugin',
              foreignKey: {
                name: 'pluginName',
                allowNull: true
              },
              onDelete: 'CASCADE'
            })
          }
        }
      }
    }
  }


  static schema(app, Sequelize) {
    const sEnum = Sequelize.ENUM
    const schema = {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      defaultAction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      addAction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: sEnum('UNREAD', 'READ'),
        defaultValue: 'UNREAD',
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: _.values(NOTIFICATION_TYPE),
        defaultValue: NOTIFICATION_TYPE.AUTO
      },
      pluginNotificationId: {
        type: Sequelize.STRING,
        allowNull: true
      }, /*
       data: {
       type: Sequelize.STRING,
       get: function () {
       return this.getDataValue('data') ? JSON.parse(this.getDataValue('data')) : undefined
       },
       set: function (value) {
       this.setDataValue('data', JSON.stringify(value))
       },
       allowNull: false
       },*/
      template: {
        type: Sequelize.STRING,
        defaultValue: 'default',
        allowNull: false
      }
    }

    return schema
  }
}
