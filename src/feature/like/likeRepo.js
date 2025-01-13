import likeModel from "./likeSchema.js";
import postModel from "../post/postSchema.js";


export const addLikes = async (userId,postId)=>{

    try{
        const isPostAvailable = await postModel.findById(postId);

        if(!isPostAvailable)
        {
            throw new Error("Post not found");
        }
        const addLikes = new likeModel({userId,postId,likes:1});
        const newLike = await addLikes.save();
        console.log("newLike", newLike);
        if(!newLike){
            throw new Error("Error while adding likes");
        }
        return {success:true, data:newLike.likes};


    }catch(err){
        throw new Error('Error adding likes:'+err);
    }
}

export const updateLikes = async (like_id,postId)=>{
    try{
        const isPostAvailable = await postModel.findById(postId);
        if(!isPostAvailable)
        {
            throw new Error("Post not found");
        }
        console.log("like update", likeModel);
        const isLike = await likeModel.findById(like_id);

        isLike.likes += 1;
        console.log("like update after updaing", isLike);
        await isLike.save();
        if(!isLike){
            throw new Error("Error while adding likes");
        }
        return {success:true, data:isLike.likes};


    }catch(err){
        throw new Error('Error adding likes:'+err);
    }
}