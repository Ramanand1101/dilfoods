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

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    try {
        await sendOtp(phoneNumber, res);
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
});


// Verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
