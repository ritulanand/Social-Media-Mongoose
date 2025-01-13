import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createOTP, findOTPByEmail } from './otpRepo.js';
import bcrypt from 'bcrypt';
import userModel from "../user/userSchema.js";
import {OTP_EXPIRATION_TIME} from '../../config/otpconfig.js'; // Assuming you have a config file for constants

// Send OTP to user's email
export const sendOTP = async (req, res) => {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    const expiresAt = new Date().getTime() + OTP_EXPIRATION_TIME;

    try {
        // Store OTP in database
        console.log("email", email);
        await createOTP(email, otp, expiresAt);
console.log("otp record", await createOTP(email, otp, expiresAt));
        // Send OTP to user via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', // use your email
                pass: '', // use your password
            },
        });

        const mailOptions = {
            from: '', // use your email
            to: email,  
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
};

// Verify OTP entered by the user
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        // Find OTP in database
        const otpRecord = await findOTPByEmail(email);
        console.log("otop controller", otpRecord);
        if (!otpRecord) {
            return res.status(404).json({ message: 'OTP not found for this email' });
        }

        // Check if OTP has expired
        if (new Date().getTime() > otpRecord.expiresAt.getTime()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Check if OTP matches
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to verify OTP' });
    }
};

// Reset password after OTP verification
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    try {
        // Find OTP record in database
        const otpRecord = await findOTPByEmail(email);

        if (!otpRecord) {
            return res.status(404).json({ message: 'OTP not found for this email' });
        }

        // Check if OTP has expired
        if (new Date().getTime() > otpRecord.expiresAt.getTime()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Check if OTP matches
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("has ", hashedPassword);
        // Assuming you have a user model to update the password
        const user = await userModel.findOne({ email });
        console.log("user", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = hashedPassword;
        console.log("user >>", user);
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to reset password' });
    }
};
