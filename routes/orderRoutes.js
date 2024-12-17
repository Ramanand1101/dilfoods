const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus, // For updating order status
    deleteOrder,
} = require('../controllers/orderController');
const { protect, admin, staff } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, createOrder); // Authenticated users can create orders
router.get('/', protect, admin, staff, getOrders); // Admins and staff can view all orders
router.get('/:id', protect, getOrderById); // Authenticated users can view their own order
router.patch('/:id/status', protect, admin, staff, updateOrderStatus); // Admins and staff can update order status
router.delete('/:id', protect, admin, deleteOrder); // Only admins can delete orders

module.exports = router;
