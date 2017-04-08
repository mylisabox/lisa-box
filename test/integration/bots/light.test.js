'use strict'
/* global describe, it */

const assert = require('assert')

describe('LIGHT bot', () => {
  let service, ChatBot
  before(() => {
    service = global.app.services.ChatBotService
    ChatBot = global.app.orm.ChatBot
    return global.app.orm.Room.create({name: 'Salon'}).then(() => {
      return global.app.services.ChatBotService.reloadBots()
    })
  })

  it('should exist', () => {
    return ChatBot.find({
      where: {
        name: 'lights'
      }
    }).then(chatbot => {
      assert(chatbot)
      assert.equal(chatbot.name, 'lights')
      assert.equal(chatbot.displayName, 'Lights')
      assert(chatbot.data)
    })
  })

  it('should return correct answer', () => {
    return service.interact(1, 'fr', 'allume la lumière').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.userSentence, 'allume la lumière')
    })
  })

  it('should return correct answer with params', () => {
    return service.interact(1, 'fr', 'allume le salon').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.fields.room, 'salon')
      assert.equal(infos.userSentence, 'allume le salon')
    })
  })
})
