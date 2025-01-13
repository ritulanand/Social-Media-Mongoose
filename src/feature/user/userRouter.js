import express from 'express';
import { userRegistration, userLogin ,logOut, updateDetails, updatePassword} from './userController.js';
const userRouter = express.Router();

userRouter.post('/signUp', userRegistration);
userRouter.post('/login', userLogin);
userRouter.post('/logout', logOut);
userRouter.put("/update", updateDetails );
userRouter.put("/updatePassword", updatePassword);
export default userRouter;