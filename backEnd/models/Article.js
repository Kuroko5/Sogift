// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const articlesSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  created_by: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  link: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  deleted_by: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  deleted_at: {
    type: Date
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

const Articles = mongoose.model('Articles', articlesSchema)

module.exports = Articles
