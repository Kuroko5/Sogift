const { hashSync } = require('bcryptjs')

const log4js = require('log4js');
const logger = log4js.getLogger()
// Database Demo
const cred = 'mongodb://admin:admin@ds149914.mlab.com:49914/sogift'

const mongoose = require('mongoose')
const USER = mongoose.model('Users')
mongoose.Promise = global.Promise
let isConnectedBefore = false
const connect = () => {
  mongoose.connect('mongodb://localhost:27017/sogift', { useNewUrlParser: true })
}

connect()

mongoose.connection.on('error', () => {
  console.log('Could not connect to MongoDB')
})

mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...')
  if (!isConnectedBefore)
    connect()
})
mongoose.connection.on('connected', () => {
  isConnectedBefore = true
  console.log('Connection established to ' + cred)
  const users = [{
    name: 'admin',
    firstname: 'admin',
    lastname: 'admin',
    username: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin'
  }, {
    name: 'test',
    firstname: 'test',
    lastname: 'test',
    username: 'test',
    email: 'test@admin.com',
    password: 'test'
  }
  ]
  for (let i = 0; i < users.length; i++) {
    USER.findOne({ username: users[i].username })
      .exec()
      .then(result => {
        if (result === null) {
          users[i].password = hashSync(users[i].password, 12)
          console.log('the seed has been created')
        } else {
          console.log('the seed exist')
        }
      })
  }
})

mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB')
})

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Force to close the MongoDB conection')
    process.exit(0)
  })
})
