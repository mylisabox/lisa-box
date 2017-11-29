'use strict'

const Model = require('trails/model')
const _ = require('lodash')

/**
 * @module Preference
 * @description Preference for plugins
 */
module.exports = class Preference extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        hooks: {},
        classMethods: {
          associate: (models) => {

          }
        }
      }
    }
  }


  static schema(app, Sequelize) {
    const schema = {
      key: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        get: function () {
          let data = this.getDataValue('value')
          if (_.isString(data)) {
            data = JSON.parse(data)
          }
          return data ? data : {}
        },
        set: function (value) {
          if (!value) {
            value = {}
          }
          this.setDataValue('value', JSON.stringify(value))
        },
        allowNull: true
      }
    }

    return schema
  }
}
