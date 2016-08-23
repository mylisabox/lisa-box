'use strict'

const Model = require('trails-model')

/**
 * @module Dashboard
 * @description Dashboard per room to display widgets
 */
module.exports = class Dashboard extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Dashboard.belongsTo(models.Room, {
              as: 'room',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'roomId',
                primaryKey: true
              }
            })
            models.Dashboard.belongsTo(models.User, {
              as: 'user',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'userId',
                primaryKey: true
              }
            })
          }
        }
      }
    }
  }


  static schema (app, Sequelize) {
    const array = Sequelize.ARRAY
    return {
      //FIXME Hack into sequelize to make primary key on foreign key
      action: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: 'dashboard'
      },
      widget: {
        type: array(Sequelize.INTEGER)
      }
    }
  }
}
