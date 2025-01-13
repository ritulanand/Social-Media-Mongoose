import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "",
        pass: ""
    }
});

const sendMail = async (to, sub, msg) => {
    try {
        const info = await transporter.sendMail({
            to: to,
            subject: sub,
            text: msg
        });
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();  // Generates a 6-digit OTP
};

const sendOTPEmail = async (to, otp) => {
    try {
        await transporter.sendMail({
            to: to,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. Please use it to reset your password.`
        });
        console.log("OTP sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
};

sendMail("", "New msg", "hello I guess");
