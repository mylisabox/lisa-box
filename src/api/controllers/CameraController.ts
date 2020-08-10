

const request = require('request')
import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
const jpegExtractor = require('jpeg-extractor')

/**
 * @module CameraController
 * @description REST camera actions.
 */
export class CameraController extends Controller {
  snapshot(req, res) {
    let reqStream
    const jpgExtractor = jpegExtractor().on('image', image => {
      reqStream.abort()
      res.send(image)
    })
    reqStream = request(req.query.url, err => {
      if (err) {
        this.log.error(err)
        res.status(500).end()
      }
    })

    req.pipe(reqStream)
    reqStream.pipe(jpgExtractor)
  }

  stream(req, res) {
    const reqStream = request(req.query.url, err => {
      if (err) {
        this.log.error(err)
        res.status(500).end()
      }
    })
    req.connection.on('close', () => {
      reqStream.abort()
    })
    req.pipe(reqStream)
    reqStream.pipe(res)
  }
}

