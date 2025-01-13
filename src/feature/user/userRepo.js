import userModel from "./userSchema.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import crypto from 'crypto'; ; 
export const signUpnewUser = async (newUser)=>{

    try {
        const user = new userModel(newUser);
        await user.save();
        console.log(user);
        return { success: true, res: user };
      } catch (error) {
        // throw new Error("email duplicate");
        return { success: false, error: { statusCode: 400, msg: error } };
      }
}

export const loginUser = async ({email, password}) => {
    try {
        const user = await userModel.findOne({ email });
        
        if (!user)
             return { success: false, res: "user not found" };

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return { success: false, res: "wrong password" };
        }
        return { success: true, res: user };
        
      } catch (error) {
        throw new Error("user not found");
      }
}

export const updateProfile = async(data,user)=>{
console.log("user update", user, data);
  try{
    console.log("object keys", Object.keys(data));
    console.log("object keys", user);
    Object.keys(data).forEach((key)=>{
      console.log("user key", user[key]);
      if(user[key] !== undefined){
        user[key] = data[key];
      }
    });
    const updatedUser = await user.save();
    console.log("updated user", updatedUser);
    return {success: true, msg: updatedUser};
  }catch(err){
    throw new Error('Error updating user profile:'+err.message);
  }
}

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();  // Generates a 6-digit OTP
};

export const passwordReset = async (email) => {
  try {
      // Generate OTP
      const otp = generateOTP();  

      // Store OTP temporarily (for example in memory or a temporary database)
      // Here, we're assuming you have an OTP model for storage
      await otpModel.create({
          email: email,
          otp: otp,
          createdAt: new Date()
      });
      console.log("pass reset", otpModel);
      // Send OTP to user's email
      await sendOTPEmail(email, otp);

      return { success: true, message: "OTP sent to your email" };
  } catch (error) {
      console.error("Error in password reset:", error);
      return { success: false, message: error.message };
  }
};

const sendOTPEmail = async (to, otp) => {
  try {
    console.log("send");
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