const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendOTP, verifyOTP } = require('../services/otpService'); // Import OTP service

// Register a new user
const registerUser = async (req, res) => {
    const { username, phoneNumber, email, password, role } = req.body;

    try {
        // Check if the user already exists by email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ username, phoneNumber, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login user using email-password or phoneNumber-OTP
const loginUser = async (req, res) => {
    const { email, password, phoneNumber, otp } = req.body;

    try {
        // Email-password login
        if (email && password) {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ token });
        } 

        // Phone number OTP login
        else if (phoneNumber && !otp) {
            const user = await User.findOne({ phoneNumber });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send OTP
            const otpSent = await sendOTP(phoneNumber);
            if (!otpSent) {
                return res.status(500).json({ message: 'Error sending OTP' });
            }

            return res.status(200).json({ message: 'OTP sent successfully' });
        } 

        // Verify OTP for phone number login
        else if (phoneNumber && otp) {
            const isValidOTP = verifyOTP(phoneNumber, otp);
            if (!isValidOTP) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }

            const user = await User.findOne({ phoneNumber });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Error during login' });
    }
};

module.exports = { registerUser, loginUser };
