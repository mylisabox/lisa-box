const Controller = require('trails/controller')

/**
 * @module UserController
 * @description REST user actions.
 */
module.exports = class UserController extends Controller {
  getProfile(req, res) {
    this.app.orm.User.findById(req.user.id)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.serverError(err)
      })
  }

  updateProfile(req, res) {
    req.app.multer.single('avatar')(req, res, err => {
      if (err) {
        res.serverError(err)
      }
      else {
        const user = req.body
        if (req.file && req.file.filename) {
          user.avatar = '/avatar/' + req.file.filename
        }
        else {
          user.avatar = req.user.avatar
        }
        user.id = req.user.id
        this.app.orm.User.update(user, { where: { id: req.user.id } })
          .then(() => {
            if (user.password && user.password != '') {
              return this.app.services.PassportService.updateLocalPassword(user, user.password)
                .then(() => res.json(user))
            }
            return res.json(user)
          })
          .catch(err => {
            res.serverError(err)
          })
      }
    })
  }
}
