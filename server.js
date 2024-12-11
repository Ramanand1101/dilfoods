const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const {protect}=require("./middlewares/authMiddleware")
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

require("dotenv").config();
connectDB();


const app = express();
app.use(express.json());

// Route
app.use('/api/users', userRoutes);

app.use(protect)

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
