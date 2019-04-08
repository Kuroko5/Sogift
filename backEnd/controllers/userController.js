// UserController.js
const mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  UserDomain = require('../domain/user'),
  {paginate} = require('../service/paginate')

// RETURNS ALL THE USERS IN THE DATABASE
exports.listUsers = function (req, res) {
  UserDomain.all().then(users => paginate(users, req.query)).then(users => res.status(200).json(users)).catch(err => res.status(500).send(err))
}

/**
 * CREATES A NEW USER
 * @param req
 * @param res
 */
exports.createUser = function (req, res) {
  UserDomain.createU(req.body).then(user => res.status(200).json(user)).catch(err => res.status(500).send(err))
}

/**
 * Find user by ID
 * @param req
 * @param res
 */
exports.getUser = function (req, res) {
  UserDomain.one(req.params.id).then(user => {
    res.status(200).json(user)
  })
    .catch(err => res.status(500).send(err))
}

// UPdate user by ID
exports.updateUser = function (req, res) {
  UserDomain.update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err))
}

// Delete by iD
exports.deleteUser = function (req, res) {
  UserDomain.delete(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err))
}
exports.deleteAllUser = function (req, res) {
  console.log("list of id",req.body)
  UserDomain.deleteAll(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err))
}
