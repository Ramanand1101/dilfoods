const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendOtp, verifyOtp } = require('../controllers/userController');

// Register User
router.post('/register', registerUser);

// Login using Email and Password
router.post('/login', loginUser);

// Send OTP to Phone Number
router.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const otp = await sendOtp(phoneNumber);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
