'use strict'

const Model = require('trails/model')
const _ = require('lodash')
const DEVICE_TYPE = require('../utils/enums').DEVICE_TYPE

/**
 * @module Device
 * @description Device model
 */
module.exports = class Device extends Model {

  static config() {
    return {
      options: {
        instanceMethods: {
          toJSON: function () {
            const values = this.dataValues
            values.data = this.data
            values.template = this.template
            delete values.privateData
            return values
          },
          toRawData: function () {
            const values = this.dataValues
            values.data = this.data
            values.privateData = this.privateData
            values.template = this.template
            return values
          }
        },
        classMethods: {
          associate: (models) => {
            models.Device.belongsTo(models.Plugin, {
              as: 'plugin',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'pluginName',
                allowNull: false
              }
            })
            models.Device.belongsToMany(models.User, {
              as: 'users',
              through: 'usersFavorites'
            })
            models.Device.belongsTo(models.Room, {
              as: 'room',
              foreignKey: {
                name: 'roomId',
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: DEVICE_TYPE.OTHER
      },
      favorite: {
        type: Sequelize.VIRTUAL,
        set: function (val) {
          this.setDataValue('favorite', val)
        }
      },
      driver: {
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
      },
      data: {
        type: Sequelize.TEXT,
        get: function () {
          let data = this.getDataValue('data')
          if (_.isString(data)) {
            data = JSON.parse(this.getDataValue('data'))
          }
          return data
        },
        set: function (value) {
          if (value) {
            this.setDataValue('data', JSON.stringify(value))
          }
        }
      },
      privateData: {
        type: Sequelize.TEXT,
        get: function () {
          let data = this.getDataValue('privateData')
          if (_.isString(data)) {
            data = JSON.parse(this.getDataValue('privateData'))
          }
          return data
        },
        set: function (value) {
          if (value) {
            this.setDataValue('privateData', JSON.stringify(value))
          }
        }
      }
    }
  }
}
