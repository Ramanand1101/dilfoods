const MenuItem = require('../models/MenuItem');

const createMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createMenuItem, getMenuItems };
