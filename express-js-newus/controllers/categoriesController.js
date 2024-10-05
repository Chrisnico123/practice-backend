const { body, validationResult } = require('express-validator');
const Category = require('../models/categoriesModels');
const factory = require('./handlerFactory');

// Middleware for validation
exports.validateCategory = [
  body('name').notEmpty().withMessage('Name is required'),

  // Check if there are validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// CRUD Operations
exports.createCategory = factory.createOne(Category);
exports.getAllCategories = factory.getAll(Category);
exports.getCategoryById = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
