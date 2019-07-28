const { Strategy } = require('passport-local')
const passport = require('passport')

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = mongoose.model('Users')

passport.use('local-login', new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User
      .findOne({ email })
      .then(user => {
        if (!user) {
          return done('User not found', null, '')
        }
        // bcrypt.compareSync("B4c0/\/", hash); // true

        if (bcrypt.compareSync(password, user.password) === false) {
          return done('Email or password invalid', null, null)
        }
        return done(null, user.toJSON(), null)
      })
      .catch(err => {
        return done(err, null, null)
      })
  }
))
