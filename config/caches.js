'use strict'

/**
 * Cache Configuration
 * (app.config.cache)
 *
 */
module.exports = {
  stores: [
    {
      name: 'mongo',
      type: 'mongo',
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
      name: 'memory',
      type: 'memory',
      max: 100,
      ttl: 60
    }
  ],
  defaults: ['memory']
}
