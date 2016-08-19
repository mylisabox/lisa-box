'use strict'

const winston = require('winston')

module.exports = {

  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    })
  },
  database: {
    models: {
      migrate: 'drop'
    }
  }

}
