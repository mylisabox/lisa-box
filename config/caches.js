'use strict'
/**
 * Cache Configuration
 * (app.config.cache)
 *
 */
module.exports = {
  stores: [
    {
      name: 'chatbot',
      store: 'memory',
      max: 100,
      ttl: 0
    }
  ],
  defaults: ['chatbot']
}
