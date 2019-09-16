'use strict'

const Model = require('trails/model')
const _ = require('lodash')

/**
 * @module DeviceTemplate
 * @description DeviceTemplate model
 */
module.exports = class Device extends Model {

  static config() {
    return {
      options: {
        instanceMethods: {

        },
        classMethods: {
          associate: (models) => {
            models.DeviceTemplate.belongsTo(models.Plugin, {
              as: 'plugin',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'pluginName',
                allowNull: true
              }
            })
          }
        }
      }
    }
  }

  static schema(app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      template: {
        type: Sequelize.TEXT,
        allowNull: false,
        get: function () {
          let data = this.getDataValue('template')
          if (_.isString(data)) {
            data = JSON.parse(this.getDataValue('template'))
          }
          return data
        },
        set: function (value) {
          if (value) {
            this.setDataValue('template', JSON.stringify(value))
          }
          else {
            this.setDataValue('template', null)
          }
        }
      }
    }
  }
}
