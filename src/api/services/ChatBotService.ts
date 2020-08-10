

import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
const uuid = require('uuid')
const CUSTOM_BOT_ID = 'userCustom'
/**
 * @module ChatBotService
 * @description Service to manage chatbot
 */
export class ChatBotService extends Service {

  _getUserChatBot() {
    return this.app.orm.ChatBot.find({
      where: { name: CUSTOM_BOT_ID }
    })
  }

  executeUserActions(requestId, lang, context, result) {
    return this._getUserChatBot().then(bot => {
      const index = this._findExistingDataIndex(bot.context, { name: result.action })
      const commands = bot.context[index].data.commands
      const actions = []

      for (const command of commands) {
        actions.push(this.interact(requestId, lang, command, undefined, context).catch(err => Promise.resolve()))
      }
      return Promise.all(actions).then(() => result)
    })
  }

  interact(requestId, lang, sentence, botId, context) {
    let before
    if (context.roomId) {
      before = this.app.orm.Room.findById(context.roomId)
    }
    else {
      before = Promise.resolve()
    }

    return before.then(room => {
      return super.interact(requestId, lang, sentence, botId)
        .then(result => {
          context.room = room || context.room
          result.context = context || {}
          if (result.botId === CUSTOM_BOT_ID) {
            return this.executeUserActions(requestId, lang, context, result)
          }
          else {
            return this.app.services.PluginService.interact(result)
          }
        })
    })
  }

  getUserBot() {
    return this._getUserChatBot().then(bot => {
      let data = []
      if (bot && bot.context) {
        data = bot.context
      }
      return data
    })
  }

  deleteUserBot(actionId) {
    return this._getUserChatBot().then(bot => {
      const index = this._findExistingDataIndex(bot.context, { name: actionId })
      const context = bot.context
      context.splice(index, 1)
      const states = this._buildCustomBotFromContext(context)

      return this.updateBot(CUSTOM_BOT_ID, {
        'name': 'User custom command',
        'freeStates': states,
        'nestedStates': {},
        'links': [],
        'context': context
      })
    })
  }

  setUserBot(data) {
    return this._getUserChatBot().then(bot => {
      const context = this._buildContext(bot, data)
      const states = this._buildCustomBotFromData(bot, data)
      if (bot) {
        return this.updateBot(CUSTOM_BOT_ID, {
          'name': 'User custom command',
          'freeStates': states,
          'nestedStates': {},
          'links': [],
          'context': context
        })
      }
      else {
        return this.addBot(CUSTOM_BOT_ID, {
          'name': 'User custom command',
          'freeStates': states,
          'nestedStates': {},
          'links': [],
          'context': context
        })
      }
    })
  }

  _buildCustomBotFromContext(context) {
    const states = {}
    for (const entry of context) {
      const sentences = {}
      sentences[this.app.env.LANG.substr(0, 2)] = entry.data.sentences
      const responses = {}
      responses[this.app.env.LANG.substr(0, 2)] = entry.data.responses
      states[entry.name] = {
        'name': entry.displayName,
        'sentences': sentences,
        'responses': responses
      }
    }
    return states
  }

  _buildCustomBotFromData(bot, data) {
    const context = this._buildContext(bot, data)
    return this._buildCustomBotFromContext(context)
  }

  _findExistingDataIndex(botContext, data) {
    return botContext.findIndex(entry => data.name === entry.name)
  }

  _buildContext(bot, data) {
    const context = bot && bot.context || []
    const dataIndex = this._findExistingDataIndex(context, data)
    if (dataIndex === -1) {
      if (!data.name || data.name === '') {
        data.name = uuid()
      }
      context.push(data)
    }
    else {
      context[dataIndex] = data
    }
    return context
  }
}

