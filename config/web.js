'use strict'
const fs = require('fs')
const multer = require('multer')
const sslKeyPath = __dirname + '/ssl/server.key'
const sslCertPath = __dirname + '/ssl/server.crt'
const storageAvatar = multer({dest: 'uploads/'})
const storageVoiceConfig = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'config/speech/')
    }, filename: function (req, file, cb) {
      cb(null, 'LISA-gfile.json')
    }
  })
})

let ssl = undefined
if (fs.existsSync(sslKeyPath)) {
  ssl = {
    key: fs.readFileSync(sslKeyPath, 'utf8'),
    cert: fs.readFileSync(sslCertPath, 'utf8'),
    //passphrase: 'mylisabox'
    //OR pfx: fs.readFileSync('path/to/server.pfx')
  }
}

/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */
module.exports = {
  express: require('express'),
  init: (app, express) => {
    express.multerAvatar = storageAvatar
    express.multerVoiceConfig = storageVoiceConfig
  },
  /**
   * CORS options
   * Can be true/false or an object of CORS options
   * @see {@link https://github.com/expressjs/cors#configuring-cors}
   */
  cors: true,

  /**
   * Middlewares to load (in order)
   */
  middlewares: {
    //proxyAssets: ['/images', assetsProxy],

    //middlewares loading order
    order: [
      'addMethods',
      'cookieParser',
      'passportInit',
      'bodyParser',
      'compression',
      'methodOverride',
      'www',
      'router',
      '404',
      '500'
    ]

    /**
     * Middlewares to load for body parsing
     bodyParser: [
     bodyParser.json(),
     bodyParser.urlencoded({extended: false})
     ]
     */

  },

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Express static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Express will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  cache: 31557600000,

  /**
   * The host to bind the web server to
   */
  host: process.env.HOST || '0.0.0.0',

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 3000,

  /**
   * Alternate method to add multiple template engine, for single view template use config.views.engine
   */
  //views: {}

  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   */
  ssl: ssl,

  /**
   * Automatically redirect HTTP to HTTPS
   * Create an HTTP server who redirect to HTTPS server
   * Work only if SSL is enabled
   */
  redirectToHttps: false,

  /**
   * Http port to use if you want to enable http and https
   * SSL need to be enabled
   */
  //portHttp: 80
}
