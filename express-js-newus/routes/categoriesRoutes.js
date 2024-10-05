const express = require('express');
const categoryController = require('../controllers/categoriesController');
const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.validateCategory, categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(categoryController.validateCategory, categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
