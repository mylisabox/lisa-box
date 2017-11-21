'use strict'

/**
 * Letsencrypt Configuration
 * (app.config.greenlock)
 *
 * Configure letsencrypt
 *
 * @see {@link https://git.daplie.com/Daplie/node-greenlock}
 */
module.exports = {
  enabled: false, // enable letsencrypt or not
  server: 'staging', // Set to https://acme-v01.api.letsencrypt.org/directory in production
  email: 'john.doe@example.com',
  agreeTos: true,
  approvedDomains: ['example.com', 'www.example.com']
}
