// grab the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  name: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  lastUpdate: { type: Date },
  role: {
    type: String,
    default: 'user'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }

},
{
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

userSchema.virtual('skills', {
  ref: 'UserSkill',
  localField: '_id',
  foreignField: 'user_id'
})
// userSchema.pre('save', function(next) {
//   obj.password = hashSync(obj.password, genSaltSync(10))

//   next();
// });
const Users = mongoose.model('Users', userSchema)

module.exports = Users
