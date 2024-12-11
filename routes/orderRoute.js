const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, createOrder);

module.exports = router;
