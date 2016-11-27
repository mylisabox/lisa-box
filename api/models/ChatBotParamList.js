'use strict'

const Model = require('trails-model')

/**
 * @module ChatBotParamList
 * @description TODO document Model
 */
module.exports = class ChatBotParamList extends Model {

  static config() {
  }

  static schema(app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      values: {
        type: Sequelize.STRING,
        allowNull: false,
        get: function () {
          let data = null
          if (this.getDataValue('values')) {
            data = JSON.parse(this.getDataValue('values'))
          }
          return data
        },
        set: function (value) {
          if (value) {
            this.setDataValue('values', JSON.stringify(value))
          }
          else {
            this.setDataValue('values', null)
          }
        }
      }
    }
  }
}
