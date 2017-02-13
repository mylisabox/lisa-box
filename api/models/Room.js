'use strict'

const Model = require('trails/model')

/**
 * @module Room
 * @description Room model
 */
module.exports = class Room extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Room.hasMany(models.Dashboard, {
              as: 'dashboard',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'roomId',
                allowNull: true
              }
            })

            models.Room.hasMany(models.Device, {
              as: 'devices',
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


  static schema (app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
  }
}
