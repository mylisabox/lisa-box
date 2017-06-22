'use strict'
/* global describe, it */

const assert = require('assert')

describe('Media center bot', () => {
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
        name: 'mediacenter'
      }
    }).then(chatbot => {
      assert(chatbot)
      assert.equal(chatbot.name, 'mediacenter')
      assert.equal(chatbot.displayName, 'Media Center')
      assert(chatbot.data)
    })
  })
  describe('Media center volume', () => {
    it('should mute volume', () => {
      return service.interact(1, 'fr', 'coupe le son').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'MUTE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'coupe le son')
      })
    })

    it('should unmute volume', () => {
      return service.interact(1, 'fr', 'remets le son').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'UNMUTE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'remets le son')
      })
    })

    it('should increase volume', () => {
      return service.interact(1, 'fr', 'monte le son').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'INCREASE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'monte le son')
      })
    })

    it('should set the volume with level', () => {
      return service.interact(1, 'fr', 'mets le son à 4').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'SET_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.number, '4')
        assert.equal(infos.userSentence, 'mets le son à 4')
      })
    })

    it('should increase volume with level', () => {
      return service.interact(1, 'fr', 'monte le son de 4').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'INCREASE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.number, '4')
        assert.equal(infos.userSentence, 'monte le son de 4')
      })
    })

    it('should decrease volume', () => {
      return service.interact(1, 'fr', 'baisse le son').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'DECREASE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'baisse le son')
      })
    })

    it('should decrease volume with level', () => {
      return service.interact(1, 'fr', 'baisse le son de 4').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'DECREASE_VOLUME')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.fields.number, '4')
        assert.equal(infos.userSentence, 'baisse le son de 4')
      })
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

    it('should return correct answer with room', () => {
      return service.interact(1, 'fr', 'lance le film star wars dans le salon').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_MOVIE')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.fields.movie.trim(), 'star wars')
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
    it('should return correct answer with room', () => {
      return service.interact(1, 'fr', 'lance la série Lucifer dans le salon').then(infos => {
        assert(infos)
        assert.equal(infos.action, 'PLAY_TV_SHOW')
        assert.equal(infos.botId, 'mediacenter')
        assert.equal(infos.fields.show.trim(), 'Lucifer')
        assert.equal(infos.fields.room, 'salon')
        assert.equal(infos.lang, 'fr')
        assert.equal(infos.userSentence, 'lance la série Lucifer dans le salon')
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
