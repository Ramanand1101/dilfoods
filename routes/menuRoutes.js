const express = require('express');
const {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, admin, createMenuItem); // Only admins can create
router.get('/', protect, getMenuItems); // All authenticated users can view
router.put('/:id', protect, admin, updateMenuItem); // Only admins can update
router.delete('/:id', protect, admin, deleteMenuItem); // Only admins can delete

module.exports = router;
