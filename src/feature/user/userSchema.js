import mongoose,{model} from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [3, "The name should be at least 3 characters long"],
    },
    email:{
        type:String,
        required: [true, "email is required"],
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
    },
    password:
     { 
        type: String, 
        required: [true, "password is required"] 
     },
     gender:{
        type: String,
        enum: ["male", "female", "other"],
        required: true
     },
     avatar:{
        type: String,
        default: "default_avatar.png"
     },
     friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }]
},{
    timestamps: true,
 });

const userModel = new model("user",userSchema);
export default userModel;