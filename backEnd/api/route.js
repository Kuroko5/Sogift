const express = require('express'),
  router = express.Router(),
  fileUpload = require('express-fileupload')

const User = require('../models/User') // created model loading here
const TOKEN = require('../models/Token') // created model loading here

const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const passport = require('passport')
const config = require('../config/config')

module.exports = function (app) {
  // route middleware to verify a token
  // app.use(passport.initialize());

  app.use('/api', router)

  router.route('/', (req, res, next) => {
    res.status(200).send('HERE')
  })

  /**
   * Function to logout the current user
   */
  router.get('/logout', (req, res) => {

    let t = req.headers.token
    TOKEN.deleteOne({token: t})
      .exec()
      .then(result => {
        req.logout()
        req.destroy()
      })
      .catch(e => {
        console.log(e)
      })
    return res.status(200).send({
      success: true,
      message: 'user is logout'
    })
  })

  /**
   * Local Login
   */
  router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) return res.status(401).send({
        err,
        success: false,
        message: info
      })

      if (!user) return res.status(401).send({
        user,
        success: false,
        message: 'the username or password is false'
      })

      const payload = {
        _id: user._id,
        role: user.role
      }

      const token = jwt.sign(payload, config.secret, {
        expiresIn: '13h',
        algorithm: 'HS256'
      })
      // return the information including token as JSON
      return res.status(200).send({
        user,
        success: true,
        message: 'Enjoy your token!',
        token: token
      })
    })(req, res)
  })

  router.get('/success', (req, res) => res.send('Success authenticating'))

  router.get('/failure', (req, res) => res.send('Error authenticating'))

  // router.get('/secure', passport.authenticate('openidconnect', {}), (req, res, next) => res.json('OKAY'))

  // router.post('/assert', passport.parser, (req, res, next) => passport.authenticate('saml', {failureRedirect: '/api/login-error'})(req, res, next), passport.redirect)

  /**
   * decode token for access route
   */
  router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(400).send({success: false, message: 'Failed to authenticate token.'})
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded
          next()
        }
      })
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        success: false,
        message: 'No token provided.'
      })
    }
  })

  router.use('/users', require('./routes/userRoutes'))
  router.use('/categories', require('./routes/categoryRoutes'))
  router.use('/deals', require('./routes/dealRoutes'))
  router.use('/articles', require('./routes/articleRoutes'))
}
