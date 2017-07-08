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
    color: {
      'red': {
        keywords: ['red', 'rouge'],
        value: '#f00'
      },
      'green': {
        keywords: ['green', 'vert'],
        value: '#0f0'
      },
      'beige': {
        keywords: ['beige'],
        value: '#f5f5dc'
      },
      'fuchsia': {
        keywords: ['fuchsia'],
        value: '#ff00ff'
      },
      'indigo': {
        keywords: ['indigo'],
        value: '#4b0082'
      },
      'lavender': {
        keywords: ['lavender', 'lavande'],
        value: '#e6e6fa'
      },
      'orange': {
        keywords: ['orange'],
        value: '#ffa500'
      },
      'gold': {
        keywords: ['gold', 'or'],
        value: '#ffd700'
      },
      'pink': {
        keywords: ['pink', 'rose'],
        value: '#ffc0cb'
      },
      'plum': {
        keywords: ['plum', 'prune'],
        value: '#dda0dd'
      },
      'purple': {
        keywords: ['purple', 'violet'],
        value: '#800080'
      },
      'salmon': {
        keywords: ['salmon', 'saumon'],
        value: '#fa8072'
      },
      'turquoise': {
        keywords: ['cyan', 'turquoise'],
        value: '#0ff'
      },
      'blue': {
        keywords: ['blue', 'bleu'],
        value: '#00f'
      },
      'brown': {
        keywords: ['brown', 'marron'],
        value: '#a52a2a'
      },
      'magenta': {
        keywords: ['magenta'],
        value: '#f0f'
      },
      'yellow': {
        keywords: ['yellow', 'jaune'],
        value: '#ff0'
      },
      'white': {
        keywords: ['white', 'blanc'],
        value: '#fff'
      }
    }
  }
}
