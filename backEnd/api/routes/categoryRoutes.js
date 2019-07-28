const express = require('express')
const router = express.Router()

const category = require('../../controllers/categoryController')

// category Routes
router.route('/')
// Methode get All category
  .get(category.listCategories)
  .post(category.createCategory)
  .put(category.deleteAllCategory)

router.route('/:categoryId')
  .get(category.getCategory)
  .put(category.updateCategory)
  .delete(category.deleteCategory)

router.route('/category/name/')
  .get(category.getByName)

module.exports = router
