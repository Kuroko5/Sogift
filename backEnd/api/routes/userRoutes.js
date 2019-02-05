var express = require('express')
var router = express.Router()

var user = require('../../controllers/userController')

// user Routes
router.route('/')
// Methode get All USers
  .get(user.listUsers)
  .post(user.createUser)

router.route('/:id')
  .get(user.getUser)
  .put(user.updateUser)
  .delete(user.deleteUser)

module.exports = router
