import { FabrixPolicy as Policy } from '@fabrix/fabrix/dist/common'

/**
 * @module RegisterPolicy
 * @description Protect registration when there already users in DB
 */
export class RegisterPolicy extends Policy {
  protect(req, res, next) {
    this.app.orm.User.findAll().then(users => {
      if (users && users.length > 0) {
        res.status(403).end()
      }
      else {
        next()
      }
    }).catch(err => {
      this.log.error(err)
      res.status(500).end()
    })
  }
}

