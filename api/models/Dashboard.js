'use strict'

const Model = require('trails/model')
const _ = require('lodash')

/**
 * @module Dashboard
 * @description Dashboard per room to display widgets
 */
module.exports = class Dashboard extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Dashboard.belongsTo(models.Room, {
              as: 'room',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'roomId',
                allowNull: true
              }
            })
            models.Dashboard.belongsTo(models.User, {
              as: 'user',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'userId',
                allowNull: false
              }
            })
          }
        }
      }
    }
  }


  static schema(app, Sequelize) {
    return {
      widgets: {
        type: Sequelize.STRING,
        allowNull: false,
        get: function () {
          let data = this.getDataValue('widgets')
          if (_.isString(data)) {
            data = JSON.parse(this.getDataValue('widgets'))
          }
          return data
        },
        set: function (value) {
          if (value) {
            this.setDataValue('widgets', JSON.stringify(value))
          }
        }
      }
    }
  }
}
