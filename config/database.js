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
            fn()
          },
          afterUpdate: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            app.sockets.room(modelName).send('update', modelName, instance)
            fn()
          },
          afterBulkUpdate: (instance, fn) => {
            if (!instance.attributes.id) return fn()

            const app = instance.model.sequelize.trailsApp
            const modelName = instance.model.name.toLowerCase()
            app.sockets.room(modelName).send('update', modelName, instance.attributes)
            fn()
          },
          afterDestroy: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            app.sockets.room(modelName).send('destroy', modelName, instance)
            fn()
          },
          afterBulkDestroy: (instance, fn) => {
            if (!instance.where.id) return fn()

            const app = instance.model.sequelize.trailsApp
            const modelName = instance.model.name.toLowerCase()

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
