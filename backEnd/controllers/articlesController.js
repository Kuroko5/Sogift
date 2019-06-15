// ArticlesController.js
const ArticleDomain = require('../domain/articles')
const {paginate} = require('../service/paginate')

// RETURNS ALL THE USERS IN THE DATABASE
exports.listArticles = function (req, res) {
  ArticleDomain.all().then(articles => paginate(articles, req.query)).then(articles => res.status(200).json(articles)).catch(err => res.status(500).send(err))
}
// RETURNS ALL THE USERS IN THE DATABASE
exports.listArticlesFromCategory = function (req, res) {
  ArticleDomain.allFromCategory(req.params.id).then(articles => paginate(articles, req.query)).then(articles => res.status(200).json(articles)).catch(err => res.status(500).send(err))
}
// CREATES A NEW USER
exports.createArticle = function (req, res) {
  ArticleDomain.create(req).then(article => res.status(200).json(article)).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
}

exports.getArticle = function (req, res) {
  ArticleDomain.one(req.params.id).then(article => res.status(200).json(article)).catch(err => res.status(500).send(err))
}

// UPdate article by ID
exports.updateArticle = function (req, res) {
  ArticleDomain.update(req.params.id, req.body).then(article => res.status(200).json(article)).catch(err => res.status(500).send(err))
}

// Delete by iD
exports.deleteArticle = function (req, res) {
  ArticleDomain.delete(req.params.id).then(article => res.status(200).json(article)).catch(err => res.status(500).send(err))
}

// Delete by iD
exports.deleteAllArticle = function (req, res) {
  ArticleDomain.deleteAll(req.body).then(article => res.status(200).json(article)).catch(err => res.status(500).send(err))
}
