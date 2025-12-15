const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { getProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/', protect, getProducts);

module.exports = router;
