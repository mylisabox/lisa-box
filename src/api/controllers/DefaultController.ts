

import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

const path = require('path')
const supportedLanguage = ['en', 'fr']

/**
 * @module DefaultController
 * @description Default controller.
 */
export class DefaultController extends Controller {
  /**
   *
   */
  isInitialized(req, res) {
    this.app.orm.User.findAll().then(users => {
      res.json({ initialized: users && users.length > 0 })
    }).catch(err => {
      res.status(500).end()
    })
  }

  /**
   * Simple method to check if server is alive or not
   * @param req
   * @param res
   */
  isAlive(req, res) {
    res.json({ alive: true })
  }

  /**
   * Use for test only
   * @param req
   * @param res
   */
  test(req, res) {
    res.json({ test: 'ok' })
  }
}

