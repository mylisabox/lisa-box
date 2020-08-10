/**
 * Trailpack Configuration
 * (app.config.main)
 *
 * @see http://trailsjs.io/doc/config/main
 */
import { resolve } from 'path'

export const main = {

  /**
   * Order does *not* matter. Each module is loaded according to its own
   * requirements.
   */
  spools: [
    require('@fabrix/spool-repl'),
    require('@fabrix/spool-router'),
    require('@fabrix/spool-express'),
    require('@fabrix/spool-sequelize'),
    require('@fabrix/spool-chatbot'),
    require('@fabrix/spool-greenlock'),
    require('@fabrix/spool-cache'),
    require('@fabrix/spool-bootstrap'),
    // require('@fabrix/spool-email'),
    // require('@fabrix/spool-cron'),
    require('@fabrix/spool-footprints'),
    require('@fabrix/spool-passport'),
    require('@fabrix/spool-acl'),
    require('@fabrix/spool-realtime'),
    require('lisa-plugins-manager')
  ],

  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: resolve(__dirname, '..'),
    templates: resolve(__dirname, '..', 'api', 'templates'),
    www: resolve(__dirname, '..', 'web')
  }
}
