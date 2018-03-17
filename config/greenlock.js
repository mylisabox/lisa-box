'use strict'

const domains = ['localhost']

if (process.env.DOMAIN) {
  domains.push(process.env.DOMAIN)
}

/**
 * Letsencrypt Configuration
 * (app.config.letsencrypt)
 *
 * Configure letsencrypt
 *
 * @see {@link https://git.daplie.com/Daplie/node-greenlock}
 */
module.exports = {
  enabled: false, // enable letsencrypt or not
  debug: true,
  server: 'staging', // Set to https://acme-v01.api.letsencrypt.org/directory in production
  email: process.env.EMAIL || 'john.doe@example.com',
  agreeTos: true,
  approveDomains: domains
}
