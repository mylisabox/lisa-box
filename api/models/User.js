'use strict'

const _ = require('lodash')
const ModelPassport = require('trailpack-passport/api/models/User')
const ModelPermissions = require('trailpack-acl/api/models/User')

/**
 * @module User
 * @description User model
 */
module.exports = class User extends ModelPassport {

  static config(app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            ModelPassport.config(app, Sequelize).options.classMethods.associate(models)
            ModelPermissions.config(app, Sequelize).options.classMethods.associate(models)

            models.User.hasMany(models.Dashboard, {
              as: 'dashboards',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'userId',
                allowNull: false
              }
            })
            models.User.belongsToMany(models.Device, {
              as: 'favorites',
              through: 'usersFavorites'
            })
            models.User.hasMany(models.Notification, {
              as: 'notifications',
              foreignKey: {
                name: 'userId'
              }
            })
          }
        }
      }
    }
  }

  static schema(app, Sequelize) {
    const userTrailpackSchema = ModelPassport.schema(app, Sequelize)
    const schema = {
      firstname: {
        type: Sequelize.STRING
      },
      lang: {
        type: Sequelize.STRING,
        defaultValue: 'en'
      },
      lastname: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      }
    }

    return _.assign({}, userTrailpackSchema, schema)
  }
}
