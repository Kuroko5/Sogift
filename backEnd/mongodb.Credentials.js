const { genSaltSync, hashSync } = require('bcryptjs')

let cred = 'mongodb://admin:amin1@ds149914.mlab.com:49914/sogift'
const mongoose = require('mongoose')
const USER = mongoose.model('Users')

let isConnectedBefore = false
const connect = () => {
    mongoose.connect(cred, { server: { auto_reconnect: true } })
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
mongoose.connection.on('connected', async () => {
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
    }];
    for (let i = 0; i < users.length; i++) {
        await USER.findOne({ username: users[i].username })
            .exec()
            .then(result => {
                if (result === null) {
                    users[i].password = hashSync(users[i].password, genSaltSync(10))
                    USER.create(users[i])
                    console.log('the seed has been created')
                }
            })
    }
    return isConnectedBefore;
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
