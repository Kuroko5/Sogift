// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const tokenSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  token: {
    type: String
  }
})
const Tokens = mongoose.model('Tokens', tokenSchema)

module.exports = Tokens
