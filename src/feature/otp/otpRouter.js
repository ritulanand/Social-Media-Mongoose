import express from 'express';
import { sendOTP, verifyOTP, resetPassword } from './otpController.js';
// import userAuth from '../../middleware/userAuth.js';
const otpRouter = express.Router();

otpRouter.post('/send', sendOTP);
otpRouter.patch('/verify', verifyOTP);
otpRouter.post('/reset-password', resetPassword);
export default otpRouter;