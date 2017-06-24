'use strict'
const mongoStore = require('cache-manager-mongodb')
/**
 * Cache Configuration
 * (app.config.cache)
 *
 */
module.exports = {
  stores: [
    {
      name: 'preferences',
      store: mongoStore,
      options: {
        host: 'localhost',
        port: '27017',
        database: 'lisa',
        collection: 'preferencesManager',
        compression: false,
        poolSize: 5,
        auto_reconnect: true
      }
    },
    {
      name: 'settings',
      store: mongoStore,
      options: {
        host: 'localhost',
        port: '27017',
        database: 'lisa',
        collection: 'settingsManager',
        compression: false,
        poolSize: 5,
        auto_reconnect: true
      }
    },
    {
      name: 'chatbot',
      store: 'memory',
      max: 100,
      ttl: 0
    }
  ],
  defaults: ['chatbot']
}
