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
  defaultLang: 'fr',
  defaultAnswer: (app, data) => {
    data.action = 'UNKNOWN'
    return Promise.resolve(data)
  },
  /**
   * Params that can be used to parse the answer
   * myKey : rexExp, Array<String> or function
   */
  params: {
    room: app => {
      return app.orm.Room.findAll().then(rooms => {
        return rooms.map(room => room.name);
      })
    },
    color: {'rouge': '#FF0000', 'bleu': '#0000FF'}
  }
}
