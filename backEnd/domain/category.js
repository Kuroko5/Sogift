const mongoose = require('mongoose')
const PATTERN = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
const CATEGORY = mongoose.model('Categories')

exports.createS = obj => {
  try {
    obj.color.match(PATTERN)
    return CATEGORY.create(obj)
  } catch (e) {
    return e
  }
}

exports.createAll = arrS => Promise.all(arrS.map(aS => createCategory(aS)))

exports.update = (_id, content) => CATEGORY.findOneAndUpdate({ _id }, content, { new: true }).exec()

exports.delete = _id => deleteCategory(_id)//CATEGORY.remove({_id})

exports.deleteAll = ids => Promise.all(ids.map(a => deleteCategory(a._id)))

exports.all = () => CATEGORY.find().exec()

exports.one = _id => CATEGORY.findOne({ _id }).exec()

exports.byName = name => CATEGORY.find({ name: name.toUpperCase() }).exec()

function createCategory(category) {
  return new Promise((resolve, reject) => {
    CATEGORY.findOne({ name: category.category.toUpperCase() })
      .exec()
      .then(c => {
        if (!c) {
          const categoryToAdd = new CATEGORY()
          categoryToAdd.name = category.category.toUpperCase()
          resolve(categoryToAdd.save())
        } else {
          //CATEGORY.update(s._id,s, {new:true}).exec()
          resolve(c, 'this Category Exist')
        }
      })
      .catch(e => reject(e))
  })
}

function deleteCategory(category_id) {
  return new Promise((resolve, reject) => {
    CATEGORY.deleteOne({ _id: category_id })
      .then(result => {
        resolve(result)
      })
      .catch(e => reject(e))

  })
}
