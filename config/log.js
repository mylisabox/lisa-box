/**
 * Logging Configuration
 * (app.config.log)
 *
 * @see http://trailsjs.io/doc/config/log
 */
const winston = require('winston')

module.exports = {

  /**
   * Specify the logger to use.
   * @see https://github.com/winstonjs/winston#instantiating-your-own-logger
   *
   * Exposed on app.log
   */
  logger: winston.createLogger({
    level: 'debug',
    exitOnError: true,
    format: winston.format.combine(
      winston.format.colorize({all: true}),
      winston.format.cli(),
    ),
    transports: [
      new winston.transports.Console()
    ]
  }),

  pluginLogger: winston.createLogger({
    level: 'debug',
    exitOnError: true,
    format: winston.format.combine(
      winston.format.colorize({all: true}),
      winston.format.cli(),
    ),
    transports: [
      new winston.transports.Console()
    ]
  })

}
