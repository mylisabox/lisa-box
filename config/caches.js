'use strict'

/**
 * Cache Configuration
 * (app.config.cache)
 *
 */
module.exports = {
  stores: [
    {
      name: 'mongo-store',
      type: 'mongodb',
      host: 'loclahost',
      port: '27017',
      database: 'lisa',
      collection: 'preferencesManager',
      compression: false,
      server: {
        poolSize: 5,
        auto_reconnect: true
      },
      ttl: 0
    },
    {
      name: 'memory-store',
      type: 'memory',
      max: 100,
      ttl: 0
    },
    {
      name: 'fs-store',
      type: 'fs',
      max: 100,
      ttl: 0
    }
  ],
  defaults: ['memory-store']
}
