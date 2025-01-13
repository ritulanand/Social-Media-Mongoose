import { addLikes, updateLikes } from "./likeRepo.js";
import userModel from "../user/userSchema.js";
import likeModel from "./likeSchema.js";
import commentModel from "../comment/commentSchema.js";
export const likeAdd = async (req, res)=>{

    try{
        const post_id = req.params.post_id;
        const user_id = req.user._id;
        const user = await userModel.findById(user_id);
        if(!user){
            return res.status(400).json({error: "User not found"});
        }
        const isAlreadyLiked = await likeModel.findOne({
            userId: user_id,
            postId: post_id
        });
        console.log("isalready liked", isAlreadyLiked);
        const isCommentAvailable = await commentModel.findOne({
            postId: post_id,
            userId:user_id,
        });
        console.log("iscomment ava", isCommentAvailable);
        if(isAlreadyLiked){
            const response = await updateLikes(isAlreadyLiked._id,post_id);
            console.log("respinse alreday", response);
            if(!response.success){
                return res.status(400).json({error: "Like not updated"});
            }
            return res.status(200).json({
                success: response.success,
                message: "Like updated successfully",
                userName: user.name + " is now liked this post " + response.data + " times",
                comment: isCommentAvailable? isCommentAvailable.comment:""
            });
        }
        const resp = await addLikes(user_id, post_id);
        console.log("reesp add like", resp);
        if(!resp.success) {
            return res.status(400).json({error: "Like not added"});
        }
        return res.status(200).json({
            success:resp.success,
            message: "Like added successfully",
            userName: user.name + " is liked this post " + resp.data + " times",
            comment: isCommentAvailable? isCommentAvailable.comment:""
        });

    }catch(e){
        return res.status(500).json({error: "Server Error"+e.message});
    }
}
