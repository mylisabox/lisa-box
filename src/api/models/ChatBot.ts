

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
    schema.context = {
      type: Sequelize.STRING,
      get: function () {
        let data = null
        if (this.getDataValue('context')) {
          data = JSON.parse(this.getDataValue('context'))
        }
        return data
      },
      set: function (value) {
        if (value) {
          this.setDataValue('context', JSON.stringify(value))
        }
        else {
          this.setDataValue('context', null)
        }
      },
      allowNull: true
    }
    return schema
  }
}
