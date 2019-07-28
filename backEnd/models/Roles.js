// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const roleSchema = new Schema({
  name: { type: String },
  description: { type: String }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

const Roles = mongoose.model('Roles', roleSchema)

module.exports = Roles
