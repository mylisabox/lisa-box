'use strict'

const winston = require('winston')

module.exports = {

  log: {/*
    logger: winston.createLogger({
      level: 'info',
      exitOnError: true,
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    })¨
   */
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
        name: 'chatbot',
        store: 'memory',
        max: 100,
        ttl: 0
      }
    ]
  }

}
