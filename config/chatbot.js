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
  allowAnonymousUsers: true,
  defaultLang: (process.env.LANG || 'en').substr(0, 2),
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
        return rooms.map(room => room.name)
      })
    },
    movie: '([0-9a-zA-Z ]+)',
    show: '([0-9a-zA-Z ]+)',
    color: {'rouge': '#FF0000', 'bleu': '#0000FF'}
  }
}
