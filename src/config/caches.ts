'use strict'
/**
 * Cache Configuration
 * (app.config.cache)
 *
 */
export const caches = {
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
