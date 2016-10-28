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
          }
        }
      }
    }
  }


  static schema(app, Sequelize) {
    const schema = {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.STRING,
        get: function () {
          return this.getDataValue('data') ? JSON.parse(this.getDataValue('data')) : undefined
        },
        set: function (value) {
          this.setDataValue('data', JSON.stringify(value))
        },
        allowNull: false
      },
      date: {
        type: Sequelize.DATE
      },
      template: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }

    return schema
  }
}
