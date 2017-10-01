'use strict'
/* global describe, it */

const assert = require('assert')

describe('LIGHT bot', () => {
  let service, ChatBot
  before(() => {
    service = global.app.services.ChatBotService
    ChatBot = global.app.orm.ChatBot
    return global.app.orm.Room.create({ name: 'Salon' }).then(() => {
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
    return service.interact(1, 'fr', 'allume les lumière').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.userSentence, 'allume les lumière')
    })
  })

  it('should return correct answer with params', () => {
    return service.interact(1, 'fr', 'allume le salon').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.fields.room.name.toLowerCase(), 'salon')
      assert.equal(infos.userSentence, 'allume le salon')
    })
  })

  it('should return correct answer with dim params', () => {
    return service.interact(1, 'fr', 'allume le salon à 10 %').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.fields.room.name.toLowerCase(), 'salon')
      assert.equal(infos.fields.number, '10')
      assert.equal(infos.userSentence, 'allume le salon à 10 %')
    })
  })

  it('should return correct answer with color', () => {
    return service.interact(1, 'fr', 'mettre le salon en bleu').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.fields.room.name.toLowerCase(), 'salon')
      assert.equal(infos.fields.color.value, '#00f')
      assert.equal(infos.userSentence, 'mettre le salon en bleu')
    })
  })

  it('should return correct answer with color and dim', () => {
    return service.interact(1, 'fr', 'mets le salon en bleu à 10 %').then(infos => {
      assert(infos)
      assert.equal(infos.action, 'LIGHT_TURN_ON')
      assert.equal(infos.botId, 'lights')
      assert.equal(infos.lang, 'fr')
      assert.equal(infos.fields.room.name.toLowerCase(), 'salon')
      assert.equal(infos.fields.color.value, '#00f')
      assert.equal(infos.fields.number, '10')
      assert.equal(infos.userSentence, 'mets le salon en bleu à 10 %')
    })
  })
})
