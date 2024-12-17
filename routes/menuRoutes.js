const express = require('express');
const {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');
const { protect, admin, staff } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, admin, createMenuItem); // Only admins can create menu items
router.get('/', protect, admin, staff, getMenuItems); // Admins and staff can view menu items
router.put('/:id', protect, admin, staff, updateMenuItem); // Admins and staff can update menu items
router.delete('/:id', protect, admin, deleteMenuItem); // Only admins can delete menu items

module.exports = router;
