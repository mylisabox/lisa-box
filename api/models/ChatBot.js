'use strict'

const Model = require('trailpack-chatbot/api/models/ChatBot')

/**
 * @module ChatBot
 * @description ChatBot model
 */
module.exports = class ChatBot extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.ChatBot.belongsTo(models.Plugin, {
              as: 'plugin',
              onDelete: 'CASCADE',
              allowNull: true,
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
    const schema = Model.schema(app, Sequelize)
    return schema
  }
}
