'use strict'

const defaultBots = require('./bots')

/**
 * Chatbot Configuration
 * (app.config.chatbot)
 *
 * @see http://github.com/mylisabox/trailpack-chatbot
 */
module.exports = {
  bots: defaultBots,
  allowAnonymousUsers: false,
  defaultAnswer: (app, data) = > {
  data.action = 'UNKNOWN'
return Promise.resolve(data)
}
}
