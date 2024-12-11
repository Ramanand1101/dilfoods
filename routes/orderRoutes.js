const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, createOrder); // Authenticated users can create orders
router.get('/', protect, admin, getOrders); // Only admins can view all orders
router.get('/:id', protect, getOrderById); // Authenticated users can view their order
router.put('/:id', protect, admin, updateOrder); // Only admins can update orders
router.delete('/:id', protect, admin, deleteOrder); // Only admins can delete orders

module.exports = router;
