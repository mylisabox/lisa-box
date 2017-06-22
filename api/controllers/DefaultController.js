'use strict'

const Controller = require('trails/controller')
const supportedLanguage = ['en', 'fr']

/**
 * @module DefaultController
 * @description Default controller.
 */
module.exports = class DefaultController extends Controller {
  /**
   * Simple method to return html file
   * @param req
   * @param res
   */
  default(req, res) {
    let lang = req.acceptsLanguages('en', 'en-US', 'en-UK', 'fr', 'fr-FR')
    if (lang) {
      lang = lang.substr(0, 2)
    }
    else {
      lang = 'en'
    }

    if (req.query.lang && supportedLanguage.indexOf(req.query.lang) !== -1) {
      lang = req.query.lang
    }

    res.sendfile(`node_modules/lisa-ui/bundle-${lang}/index.html`)
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

