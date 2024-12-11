require('dotenv').config(); // Load environment variables

const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = new Map(); // Temporary in-memory store for OTPs (for production, use Redis)

const sendOTP = async (phoneNumber) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        otpStore.set(phoneNumber, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Store OTP with expiration time (5 minutes validity)
        // Send OTP via Twilio API
        const message = await client.messages.create({
            body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });

        console.log(`OTP sent to ${phoneNumber}: ${otp}`);
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error.message);

        // Additional error handling
        if (error.code === 20003) {
            console.error('Twilio authentication error: Invalid SID/Auth Token');
        }

        throw new Error('Failed to send OTP');
    }
};

const verifyOTP = (phoneNumber, otp) => {
    try {
        const data = otpStore.get(phoneNumber);
        if (!data) {
            console.log('No OTP found for this phone number');
            return false; // No OTP found
        }

        const { otp: storedOtp, expiresAt } = data;
        if (Date.now() > expiresAt) {
            console.log('OTP expired');
            otpStore.delete(phoneNumber); // Clean up expired OTP
            return false; // OTP expired
        }

        if (storedOtp.toString() !== otp) {
            console.log('Invalid OTP');
            return false; // Invalid OTP
        }

        otpStore.delete(phoneNumber); // Clean up after successful verification
        return true; // OTP verified successfully
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        return false;
    }
};

module.exports = { sendOTP, verifyOTP };
