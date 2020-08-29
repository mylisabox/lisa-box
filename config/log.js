/**
 * Logging Configuration
 * (app.config.log)
 *
 * @see http://trailsjs.io/doc/config/log
 */
const winston = require('winston')

const defaultLogger = winston.createLogger({
  level: 'debug',
  exitOnError: true,
  format: winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.cli(),
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = {

  /**
   * Specify the logger to use.
   * @see https://github.com/winstonjs/winston#instantiating-your-own-logger
   *
   * Exposed on app.log
   */
  logger: {
    silly: function () {
      defaultLogger.silly([].slice.call(arguments).join(' '))
    },
    error: function () {
      defaultLogger.error([].slice.call(arguments).join(' '))
    },
    debug: function () {
      defaultLogger.debug([].slice.call(arguments).join(' '))
    },
    info: function () {
      defaultLogger.info([].slice.call(arguments).join(' '))
    },
    warn: function () {
      defaultLogger.warn([].slice.call(arguments).join(' '))
    },
    alert: function () {
      defaultLogger.alert([].slice.call(arguments).join(' '))
    },
    crit: function () {
      defaultLogger.crit([].slice.call(arguments).join(' '))
    },
    verbose: function () {
      defaultLogger.verbose([].slice.call(arguments).join(' '))
    },
    warning: function () {
      defaultLogger.warning([].slice.call(arguments).join(' '))
    }
  },

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
