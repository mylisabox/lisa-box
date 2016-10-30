'use strict'

const Model = require('trails-model')

/**
 * @module Notification
 * @description Notification sms/email/web
 */
module.exports = class Notification extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Notification.belongsTo(models.User, {
              as: 'user',
              onDelete: 'CASCADE'
            })
            models.Notification.belongsTo(models.Plugin, {
              as: 'plugin',
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
      image: {
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
