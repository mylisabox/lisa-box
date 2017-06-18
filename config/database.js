const logger = require('./log').logger
/**
 * Database Configuration
 * (app.config.database)
 *
 * Configure the ORM layer, connections, etc.
 *
 * @see {@link http://trailsjs.io/doc/config/database}
 */
module.exports = {

  /**
   * Define the database stores. A store is typically a single database.
   *
   * Use the SQLite3 by default for development purposes.
   *
   * Set production connection info in config/env/production.js
   */
  stores: {

    /**
     * Define a store called "local" which uses SQLite3 to persist data.
     */
    sqlite: {
      database: 'lisa',
      storage: './lisa.sqlite',
      host: '127.0.0.1',
      dialect: 'sqlite',
      logging: logger.debug,
      define: {
        hooks: {
          afterCreate: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            //For notification we send event only to user room not globally
            if (modelName === 'notification') {
              app.services.NotificationService.sendWebNotification(instance)
            }
            else {
              app.sockets.room(modelName).send('create', modelName, instance)
            }
            if (modelName === 'room' || modelName.toLowerCase() === 'chatbotparamlist') {
              app.services.ChatBotService.reloadBots().then(() => fn()).catch(err => fn())
            }
            else {
              fn()
            }

          },
          afterUpdate: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            app.sockets.room(modelName).send('update', modelName, instance)

            if (modelName === 'room' || modelName === 'chatbotparamlist') {
              app.services.ChatBotService.reloadBots().then(() => fn()).catch(err => {
                app.log.error(err)
                fn()
              })
            }
            else {
              fn()
            }
          },
          afterBulkUpdate: (instance, fn) => {
            if (!instance.attributes.id) return fn()

            const app = instance.model.sequelize.trailsApp
            const modelName = instance.model.name.toLowerCase()

            if (modelName === 'room' || modelName.toLowerCase() === 'chatbotparamlist') {
              app.services.ChatBotService.reloadBots().then(() => {
              }).catch(err => {
                app.log.error(err)
              })
            }

            instance.model.findAll({where: instance.where}).then(models => {
              if (modelName === 'device') {
                instance.model.findAll({where: {roomID: models[0].roomId}}).then(devices => {
                  const group = app.services.DashboardService.getAdditionalGroupDevice(models[0].roomId, devices, models[0].type)
                  for (let m of group) {
                    app.sockets.room(modelName).send('update', modelName, m)
                  }
                }).catch(err => app.log.error(err))
              }

              for (let m of models) {
                app.sockets.room(modelName).send('update', modelName, m)
              }
              fn()
            })
          },
          afterDestroy: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()

            if (modelName === 'room' || modelName.toLowerCase() === 'chatbotparamlist') {
              app.services.ChatBotService.reloadBots().then(() => {
              }).catch(err => {
                app.log.error(err)
              })
            }
            app.sockets.room(modelName).send('destroy', modelName, instance)
            fn()
          },
          afterBulkDestroy: (instance, fn) => {
            if (!instance.where.id) return fn()

            const app = instance.model.sequelize.trailsApp
            const modelName = instance.model.name.toLowerCase()

            if (modelName === 'room' || modelName.toLowerCase() === 'chatbotparamlist') {
              app.services.ChatBotService.reloadBots().then(() => {
              }).catch(err => {
                app.log.error(err)
              })
            }

            app.sockets.room(modelName).send('destroy', modelName, instance.where.id)

            fn()
          },
        }
      }
    }
  },

  models: {
    defaultStore: 'sqlite',
    migrate: 'alter'
  }
}
