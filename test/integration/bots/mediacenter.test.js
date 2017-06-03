'use strict'
/* global describe, it */

const assert = require('assert')

describe('Media center bot', () => {
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
        name: 'mediacenter'
      }
    }).then(chatbot => {
      assert(chatbot)
      assert.equal(chatbot.name, 'mediacenter')
      assert.equal(chatbot.displayName, 'Media Center')
      assert(chatbot.data)
    })
  })

  describe('Media center movie', () => {
    it('should return correct answer', () => {
      return service.interact(1, 'fr', 'lance le film star wars').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_MOVIE')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.fields.movie, 'star wars')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'lance le film star wars')
      })
    })

    it.skip('should return correct answer with room', () => {
      return service.interact(1, 'fr', 'lance le film star wars dans le salon').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_MOVIE')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.fields.movie, 'star wars')
        assert.equal(infos.fields.room, 'salon')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'lance le film star wars dans le salon')
      })
    })
  })

  describe('Media center tv show', () => {
    it('should return correct answer', () => {
      return service.interact(1, 'fr', 'lance la série Lucifer').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_TV_SHOW')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.show, 'Lucifer')
        assert.equal(infos.userSentence, 'lance la série Lucifer')
      })
    })
    it('should return correct answer with episode', () => {
      return service.interact(1, 'fr', 'lance l\'épisode 3 de la série Lucifer').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_TV_SHOW')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.show, 'Lucifer')
        assert.equal(infos.fields.episode, '3')
        assert.equal(infos.userSentence, 'lance l\'épisode 3 de la série Lucifer')
      })
    })

    it('should return correct answer with season and episode', () => {
      return service.interact(1, 'fr', 'lance l\'épisode 3 saison 2 de la série Lucifer').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_TV_SHOW')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.show, 'Lucifer')
        assert.equal(infos.fields.episode, '3')
        assert.equal(infos.fields.season, '2')
        assert.equal(infos.userSentence, 'lance l\'épisode 3 saison 2 de la série Lucifer')
      })
    })
  })
})
