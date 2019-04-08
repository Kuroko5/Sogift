const express = require('express')
const router = express.Router()

const article = require('../../controllers/articlesController')

// article Routes
router.route('/')
// Methode get All Article
  .get(article.listArticles)
  .post(article.createArticle)
  .put(article.deleteAllArticle)

router.route('/:id')
  .get(article.getArticle)
  .put(article.updateArticle)
  .delete(article.deleteArticle)

module.exports = router
