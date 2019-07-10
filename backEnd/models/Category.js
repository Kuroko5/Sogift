// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  color: { type: String, required: true }
}, {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  })

categorySchema.virtual('articles', {
  ref: 'Articles',
  localField: '_id',
  foreignField: 'categories'
})

const Categories = mongoose.model('Categories', categorySchema)

// make this available to our users in our Node applications
module.exports = Categories
