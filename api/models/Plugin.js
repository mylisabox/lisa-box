'use strict'

const Model = require('lisa-plugins-manager/api/models/Plugin')
const _ = require('lodash')

/**
 * @module Plugin
 * @description Plugin model
 */
module.exports = class Plugin extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Plugin.hasMany(models.Device, {
              as: 'devices',
              foreignKey: {
                name: 'pluginName',
                allowNull: false
              }
            })
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    const defaultSchema = Model.schema(app, Sequelize)

    const schema = {
      hideNotification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }

    return _.defaults(defaultSchema, schema)
  }
}
