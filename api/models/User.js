'use strict'

const _ = require('lodash')
const ModelPassport = require('trailpack-passport/api/models/User')
const ModelPermissions = require('trailpack-acl/api/models/User')

/**
 * @module User
 * @description User model
 */
module.exports = class User extends ModelPassport {

  static config (app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            ModelPassport.config(app, Sequelize).options.classMethods.associate(models)
            ModelPermissions.config(app, Sequelize).options.classMethods.associate(models)
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    const userTrailpackSchema = ModelPassport.schema(app, Sequelize)
    delete userTrailpackSchema.username //disable username

    const schema = {}

    return _.defaults(userTrailpackSchema, schema)
  }
}
