// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const dealsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_by: {
    type: Schema.ObjectId,
    ref: 'Users',
  },
  created_at: {
    type: Date,
    default: Date.now
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

const Deals = mongoose.model('Deals', dealsSchema)

module.exports = Deals
