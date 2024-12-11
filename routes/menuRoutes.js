const express = require('express');
const { createMenuItem, getMenuItems } = require('../controllers/menuController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getMenuItems).post(protect, createMenuItem);

module.exports = router;
