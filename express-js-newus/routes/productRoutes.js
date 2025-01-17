const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.validateProduct, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.validateProduct, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
