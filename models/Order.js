const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
