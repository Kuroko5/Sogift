/*eslint-disable*/

/**
 *  Libraries
 */
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cookieSession = require('cookie-session')
const morgan = require('morgan')
const { genSaltSync, hashSync } = require('bcryptjs')
const log4js = require('log4js');
const logger = log4js.getLogger()

/**
 * Models
 */
const User = require('./models/User'), // created model loading here
  Token = require('./models/Token'), // created model loading here
  Category = require('./models/Category'),
  Deal = require('./models/Deals'), // created model loading here
  Article = require('./models/Article') // created model loading here

/**
 * Config passport auth
 */

const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require('./config/config') // get our config file
const passport = require('passport')
const AccessToken = require('access-token')

require('./config/config')

require('./mongodb.Credential')
require('./config/passport')
require('./test')(passport)

/**
 * List of URL with access to backend
 * @type {[string]}
 */

const whitelist = ['http://localhost:4200', 'http://localhost:4280']

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`${origin}`, whitelist.indexOf(origin))
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO, format: 'format1 :method :url :status' }))

app.use(cors('*')) // corsOptions
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'Sogift',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

// use morgan to log requests to the console
app.use(morgan('dev'))

require('./api/route')(app) // importing route

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

logger.info('RESTFUL API server started on: ' + port)

module.exports = { app, logger }

