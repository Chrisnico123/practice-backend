const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoriesRoutes');
const AppError = require('./utils/appError');
const Category = require('./models/categoriesModels');
const Product = require('./models/productModels');
const globalErrorHandler = require('./controllers/errController');
const sequelize = require('./utils/database');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 

// Routes
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });


const sync = async () => await sequelize.sync({ force: false });
sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.use(globalErrorHandler);

module.exports = app;