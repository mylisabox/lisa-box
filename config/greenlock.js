'use strict'

const approvedDomains = []

if (process.env.HOST) {
  approvedDomains.push(process.env.HOST)
}

/**
 * Letsencrypt Configuration
 * (app.config.greenlock)
 *
 * Configure letsencrypt
 *
 * @see {@link https://git.daplie.com/Daplie/node-greenlock}
 */
module.exports = {
  enabled: process.env.SSL_EMAIL || false, // enable letsencrypt or not
  server: 'staging', // Set to https://acme-v01.api.letsencrypt.org/directory in production
  email: process.env.SSL_EMAIL || 'john.doe@example.com',
  agreeTos: true,
  approvedDomains: approvedDomains, //example ['example.com', 'www.example.com']
  debug: true
}
