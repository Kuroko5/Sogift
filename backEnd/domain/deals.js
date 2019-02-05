const mongoose = require('mongoose')

const DEALS = mongoose.model('Deals')

exports.createS = obj => DEALS.create(obj)

exports.update = (_id, content) => DEALS.findOneAndUpdate({ _id }, content, { new: true }).exec()

exports.delete = _id => deleteDeal(_id) // DEALS.remove({_id})

exports.deleteAll = ids => Promise.all(ids.map(a => deleteDeal(a._id)))

exports.all = () => DEALS.find().exec()

exports.one = _id => DEALS.findOne({ _id }).exec()

function deleteDeal (dealId) {
  return new Promise((resolve, reject) => {
    DEALS.deleteOne({ _id: dealId })
      .then(result => {
        resolve(result)
      })
      .catch(e => reject(e))
  })
}
