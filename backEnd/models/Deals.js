// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const categorySchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

categorySchema.virtual('skills', {
  ref: 'Skills',
  localField: '_id',
  foreignField: 'skill_id'
})

const Categories = mongoose.model('Categories', categorySchema)

// make this available to our users in our Node applications
module.exports = Categories
