'use strict'

const winston = require('winston')

module.exports = {
  greenlock: {
    enabled: false,
    debug: false,
    server: 'https://acme-v01.api.letsencrypt.org/directory'
  },
  database: {
    stores: {

      /**
       * Define a store called "local" which uses SQLite3 to persist data.
       */
      sqlite: {
        database: 'lisa',
        storage: './lisa.sqlite',
        host: '127.0.0.1',
        dialect: 'sqlite',
        logging: false
      }
    },

    models: {
      defaultStore: 'sqlite',
      migrate: 'none'
    }
  },
  web: {
    port: process.env.PORT || 443,
    portHttp: process.env.PORT_HTTP || 80
  },
  log: {/*
    logger: winston.createLogger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        }),
        new winston.transports.File({
          name: 'info-file',
          level: 'info',
          filename: 'trails-info.log',
          timestamp: true
        }),
        new winston.transports.File({
          name: 'error-file',
          level: 'error',
          filename: 'trails-error.log',
          timestamp: true
        })
      ]
    })*/
  }

}
