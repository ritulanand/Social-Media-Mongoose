
import { validateSignUp } from '../../middleware/validatorHelper.js';
import { signUpnewUser, loginUser , updateProfile , passwordReset} from './userRepo.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userRegistration = async (req, res) => {

    const newUser = req.body;
    try{
        validateSignUp(newUser);
        const hashPassword = await bcrypt.hash(newUser.password,10);
        newUser.password = hashPassword;
        const resp = await signUpnewUser(newUser);
        console.log("resp", resp);
        if (resp.success) {
            res.status(201).json({
              success: true,
              msg: "user registration successful",
              res: resp.res,
            });
          } else{
            res.status(400).json({
              success: false,
              msg: "user registration failed",
              res: resp.res,
            });
          }

    }catch(err){
        return res.status(400).json({ error: err.message });
    }

}

export const userLogin = async (req, res) => {
  console.log("hi")
    const user = req.body;
    try{
        const resp = await loginUser(user);
        if (resp.success) {
            
            const token = jwt.sign({ _id: resp.res._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
            .json({ success: true, msg: "user login successful", token });
          } else{
            res.status(401).json({
              success: false,
              msg: "Invalid username or password",
              res: resp.res,
            });
          }
}catch(err){
  console.log("erring")
    return res.status(400).json({ error: err.message });
 
}
}


export const updateDetails = async (req, res) => {

  try{
    const data = req.body;
    const user =req.user;
    console.log("user>>", user);
    console.log("data ?", data);
    const resp = await updateProfile(data,user);
    console.log("resp update", resp);
    if(!resp.success){
      return res.status(400).json({ success: false, msg: "Error in updating" });
    }
    return res.status(200).json({ success: true, msg:resp.msg });
  }catch(err){
    return res.status(400).json({ error: err.message });
  }
}
export const logOut = async (req, res) => {

    res.cookie('token',null,{ expires:new Date(Date.now())});
    res.status(200).json({ success: true, msg: "user logged out" });

}

export const updatePassword = async (req, res) => {
  try{
    const email = req.body;
    const resp = await passwordReset(email);
    console.log("resp [pass reset", resp);
    if(!resp.success){
      return res.status(400).json({ success: false, msg: "Error in updating" });
    }
    return res.status(200).json({ success: true, msg:resp.msg });
  }catch(err){
    return res.status(400).json({ error: err.message });
  }
}