require("dotenv").config()
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, email, password,phoneNumber, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, phoneNumber,password, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const sendOtp = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    // Save OTP in the database or cache (for verification later)
    // You could save this in the user's record or in an in-memory store like Redis.
    // For simplicity, we will log it here, but remember to store it properly in a secure place.

    res.send(`Generated OTP: ${otp}`); // Replace with your database logic to store OTP

    return otp; // Return the OTP for use in the verification step
};

// Verify OTP
const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Retrieve the stored OTP (from DB or cache) and compare
    // Assuming the OTP is saved in `req.session` for simplicity, replace with your actual logic
    const savedOtp = otp;

    if (savedOtp === otp) {
        const user = await User.findOne({ phoneNumber });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'OTP verified successfully', token });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

module.exports = { registerUser, loginUser, sendOtp, verifyOtp };
