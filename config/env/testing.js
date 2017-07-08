'use strict'

const winston = require('winston')
const mongoStore = require('cache-manager-mongodb')

module.exports = {

  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: true,
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    })
  },
  routes: [
    {
      method: 'GET',
      path: '/api/v1',
      handler: 'DefaultController.test'
    }
  ],
  database: {
    stores: {

      /**
       * Define a store called "local" which uses SQLite3 to persist data.
       */
      sqlite: {
        database: 'lisa',
        storage: './test/lisa.sqlite',
        host: '127.0.0.1',
        dialect: 'sqlite',
        logging: false
      }
    },

    models: {
      defaultStore: 'sqlite',
      migrate: 'drop'
    }
  },
  caches: {
    stores: [
      {
        name: 'preferences',
        store: mongoStore,
        options: {
          host: 'localhost',
          port: '27017',
          database: 'lisaTest',
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
          database: 'lisaTest',
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
    ]
  }

}
