// CategoryController.js
const mongoose = require('mongoose'),
  Category = mongoose.model('Categories'),
  CategoryDomain = require('../domain/category')

// RETURNS ALL THE USERS IN THE DATABASE
exports.listCategories = function (req, res) {
  CategoryDomain.all().then(categories => res.status(200).json(categories)).catch(err => res.status(500).send(err));
}

// CREATES A NEW USER
exports.createCategory = function (req, res) {
  CategoryDomain.createS(req.body).then(category => res.status(200).json(category)).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
}

exports.getCategory = function (req, res) {
  CategoryDomain.one(req.params.categoryId).then(category => res.status(200).json(category)).catch(err => res.status(500).send(err));
}

// UPdate category by ID
exports.updateCategory = function (req, res) {
  CategoryDomain.update(req.params.categoryId, req.body).then(category => res.status(200).json(category)).catch(err => res.status(500).send(err));
}

// Delete by iD
exports.deleteCategory = function (req, res) {
  CategoryDomain.delete(req.params.categoryId).then(category => res.status(200).json(category)).catch(err => res.status(500).send(err));
}

// Delete by iD
exports.deleteAllCategory = function (req, res) {
  CategoryDomain.deleteAll(req.body).then(category => res.status(200).json(category)).catch(err => res.status(500).send(err));
}
