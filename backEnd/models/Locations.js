// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const locationSchema = new Schema({
  name: {type: String}

}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

const Locations = mongoose.model('Locations', locationSchema)

module.exports = Locations
