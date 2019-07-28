var express = require('express')
var router = express.Router()

var pag = require('../../service/paginate')


router.route('/')
  .get(pag.paginate)

module.exports = router
