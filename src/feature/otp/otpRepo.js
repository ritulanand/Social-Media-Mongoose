import OTPModel from './otpSchema.js';

// Create and store OTP in the database
export const createOTP = async (email, otp, expiresAt) => {
    try {
        // Clean up any existing OTP for this email
        console.log("otp repo", otp);
        await OTPModel.deleteMany({ email });

        // Store the new OTP
        const otpRecord = await OTPModel.create({
            email,
            otp,
            createdAt: new Date(),
            expiresAt: new Date(expiresAt),
        });

        return otpRecord;
    } catch (error) {
        throw new Error('Error while creating OTP: ' + error.message);
    }
};

// Find OTP by email
export const findOTPByEmail = async (email) => {
    try {
        const otpRecord = await OTPModel.findOne({ email });
        console.log("otprecord", otpRecord);
        return otpRecord;
    } catch (error) {
        throw new Error('Error while finding OTP: ' + error.message);
    }
};

// Clean up expired OTPs
export const cleanupExpiredOTPs = async () => {
    try {
        await OTPModel.cleanupExpiredOTPs();
    } catch (error) {
        throw new Error('Error while cleaning up expired OTPs: ' + error.message);
    }
};
