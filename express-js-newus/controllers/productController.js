const { body, validationResult } = require('express-validator');
const Product = require('../models/productModels');
const Category = require('../models/categoriesModels');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('desc').notEmpty().withMessage('Description is required'),
    body('image').notEmpty().withMessage('Image is required'),
    body('category_id')
      .notEmpty().withMessage('Category ID is required')
      .isUUID().withMessage('Invalid Category ID format (must be UUID)'), 
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

// Get Product by ID with Category included
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{
      model: Category,
      attributes: ['id', 'name'] 
    }]
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

// Create Product with Category validation
exports.createProduct = catchAsync(async (req, res, next) => {
  const category = await Category.findByPk(req.body.category_id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { product: newProduct }
  });
});

// Update Product with Category validation
exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.body.category_id) {
    const category = await Category.findByPk(req.body.category_id);
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
  }

  const [rowsUpdated, updatedProduct] = await Product.update(req.body, {
    where: { id: req.params.id },
    returning: true,
    plain: true
  });

  if (!updatedProduct) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { product: updatedProduct }
  });
});

// Get all Products
exports.getAllProducts = factory.getAll(Product);

// Delete Product
exports.deleteProduct = factory.deleteOne(Product);
