'use strict'

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

  /**
   * CORS options
   * Can be true/false or an object of CORS options
   * @see {@link https://github.com/expressjs/cors#configuring-cors}
   */
  cors: false,

  /**
   * Middlewares to load (in order)
   */
  middlewares: {

    /*
    //middlewares loading order
    order: [
      'addMethods',
      'cookieParser',
      'bodyParser',
      'methodOverride',
      'www',
      'router',
      '404',
      '500'
    ]*/

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
  //host: process.env.HOST || 'localhost',

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 3000

  /**
   * Alternate method to add multiple template engine, for single view template use config.views.engine
   */
  /*
  views: {
    engines: {
      // html: require('some-view-engine')
    },
    path: 'views'
  },
  */

  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   */
  /*
  ssl: {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.pem')
    //OR pfx: fs.readFileSync('path/to/server.pfx')
  },
   */
  /**
   * Automatically redirect HTTP to HTTPS
   * Create an HTTP server who redirect to HTTPS server
   * Work only if SSL is enabled
   */
  //redirectToHttps: false,

  /**
   * Http port to use if you want to enable http and https
   * SSL need to be enabled
   */
  //portHttp: 80
}
