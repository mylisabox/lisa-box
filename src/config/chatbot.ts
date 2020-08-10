'use strict'

const defaultBots = require('./bots')
const escapeRegExp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

/**
 * Chatbot Configuration
 * (app.config.chatbot)
 *
 * @see http://github.com/mylisabox/trailpack-chatbot
 */
export const chatbot = {
  bots: defaultBots,
  allowAnonymousUsers: true,
  defaultLang: (process.env.LANG || 'en').substr(0, 2),
  defaultAnswer: (app, data) => {
    data.action = 'UNKNOWN'
    switch (data.lang) {
      case 'fr':
        data.responses = ['Je n\'ai pas compris votre phrase']
        break
      case 'en':
        data.responses = ['I didn\'t understand your command']
        break
      case 'ru':
        data.responses = ['Не понимаю команды']
        break
    }
    data.response = data.responses[0]
    return Promise.resolve(data)
  },
  /**
   * Params that can be used to parse the answer
   * myKey : rexExp, Array<String> or function
   */
  params: {
    room: app => {
      return app.orm.Room.findAll().then(rooms => {
        return rooms.map(room => escapeRegExp(room.name))
      })
    },
    device: app => {
      return app.orm.Device.findAll().then(devices => {
        return devices.map(device => escapeRegExp(device.name))
      })
    },
    movie: '([0-9a-zA-Z ]+)',
    song: '([0-9a-zA-Z ]+)',
    playlist: '([0-9a-zA-Z ]+)',
    show: '([0-9a-zA-Z ]+)',
    color: {
      'red': {
        keywords: ['red', 'rouge'],
        value: '#f00'
      },
      'green': {
        keywords: ['green', 'vert', 'verre'],
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
