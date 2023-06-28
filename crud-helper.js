// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const UserModel = require('./models/User');
// const ItemModel = require('./models/item');
// const CategoryModel = require('./models/category');
// const OrderModel = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;