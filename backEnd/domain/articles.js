const mongoose = require('mongoose')
const moment = require('moment')

const ARTICLES = mongoose.model('Articles')

exports.create = obj => {
  obj.body.created_by = obj.decoded._id
  return ARTICLES.create(obj.body)
}

exports.update = (_id, content) => ARTICLES.findOneAndUpdate({ _id }, { ...content, updated_at: moment().format() }, { new: true }).exec()

exports.delete = _id => deleteArticle(_id) // ARTICLES.remove({_id})

exports.deleteAll = ids => Promise.all(ids.map(a => deleteArticle(a._id)))

exports.all = () => ARTICLES.find().populate('created_by').exec()

exports.one = _id => ARTICLES.findOne({ _id }).exec()

function deleteArticle (dealId) {
  return new Promise((resolve, reject) => {
    ARTICLES.deleteOne({ _id: dealId })
      .then(result => {
        resolve(result)
      })
      .catch(e => reject(e))
  })
}
