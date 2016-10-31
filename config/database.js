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
              app.sockets.room(modelName).send('create', instance)
            }
            fn()
          },
          afterUpdate: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            //For notification we send event only to user room not globally
            if (modelName === 'notification') {
              app.services.NotificationService.sendWebNotification(instance)
            }
            else {
              app.sockets.room(modelName).send('update', instance)
            }
            fn()
          },
          afterDestroy: (instance, options, fn) => {
            const app = instance.sequelize.trailsApp
            const modelName = instance.Model.name.toLowerCase()
            //For notification we send event only to user room not globally
            if (modelName === 'notification') {
              instance.getUser().then(user => {
                app.sockets.room('user_' + user.id).send('destroy', instance)
              })
            }
            else {
              app.sockets.room(modelName).send('destroy', instance)
            }
            fn()
          }
        }
      }
    }
  },

  models: {
    defaultStore: 'sqlite',
    migrate: 'drop'
  }
}
