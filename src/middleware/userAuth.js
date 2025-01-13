import jwt from 'jsonwebtoken';
import userModel from '../feature/user/userSchema.js';
const userAuth = async (req,res,next) => {
    //Read the token from cookies
        try{
            const {token} = req.cookies;
            if(!token){
                throw new Error("Token is not valid.");
            }
            const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
            const {_id} =decodedObj;
            const user = await userModel.findById(_id);
            console.log("user auth", user);
            if(!user){
                throw new Error("User not found.")
            }
            req.user = user;
            next();
        }catch(err){
            res.status(401).send({error: "Please Sign In."});
        }
}
export default userAuth;