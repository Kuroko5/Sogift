const mongoose = require('mongoose')

const USER = mongoose.model('Users')
const { hashSync } = require('bcryptjs')

const BCRYPT_ROUNDS = 12

exports.createU = obj => {
  console.log(obj.password)
  obj.password = hashSync(obj.password, BCRYPT_ROUNDS)

  return USER.create(obj)
}
exports.update = (_id, content) => updateUser(_id, content)
exports.deleteAll = ids => Promise.all(ids.map(a => USER.deleteOne({ _id: a._id })))

exports.delete = _id => USER.deleteOne(_id) // TODO: Definir avec matricule

exports.all = () => USER.find().exec()

exports.one = _id => USER.findOne({ _id }).exec() // TODO: Definir avec matricule

exports.byName = name => USER.findOne({ username: name }).populate().exec()
exports.byManager = manager => USER.find({ manager: manager }).populate().exec()

function updateUser (_id, content) {
  return new Promise((resolve, reject) => {
    USER.findById(_id)
      .then(user => {
        if (content.password && content.password !== user.password) {
          content.password = hashSync(content.password, BCRYPT_ROUNDS)
          content.lastUpdate = Date.now()
          resolve(USER.findByIdAndUpdate({ _id }, content, { new: true }))
        } else {
          content.password = user.password
          content.lastUpdate = Date.now()
          resolve(USER.findOneAndUpdate({ _id }, content, { new: true }))
        }
      })
      .catch(e => reject(e))
  })
}
