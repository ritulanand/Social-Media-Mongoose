import mongoose,{model} from "mongoose";

// OTP Schema Definition
const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,  // Ensure the same email can't have multiple OTPs at the same time
        },
        otp: {
            type: String,
            required: true,
            minlength: 6,  // Assuming OTP is a 6-digit string
            maxlength: 6,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Index the email and expiresAt fields for faster queries
otpSchema.index({ email: 1, expiresAt: 1 });

// Delete OTPs that are expired periodically
otpSchema.statics.cleanupExpiredOTPs = async function () {
    // Delete expired OTPs
    console.log("hii")
    await this.deleteMany({ expiresAt: { $lt: new Date() } });
};

// Create the OTP model
const OTPModel = mongoose.model('OTP', otpSchema);

export default OTPModel;