import commentModel from "./commentSchema.js";
import postModel from "../post/postSchema.js";

export const addComment = async (comment,post_Id,userId)=>{

    try{
        const post = await postModel.findById(post_Id);
        if(!post){
            throw new Error("Post not found");
        }
        const newComment = new commentModel({comment, postId:post_Id, userId});
        console.log("new comment", newComment);
        const comment_s =await newComment.save();
        console.log("comment_s", comment_s);
        if(!comment_s)
            throw new Error("Error while saving comment");
        post.comments.push(comment_s._id);
        await post.save();
        return {success: true,comment:comment_s};

    }catch(err){
        throw new Error("Error while adding comment"+err.message);
    }
}

export const updateComment = async (comment,comment_Id)=>{
    try{
        const comment_s = await commentModel.findById(comment_Id);
        if(!comment_s)
            throw new Error("Error while updating comment");
        comment_s.comment = comment;
        await comment_s.save();
        return {success: true, comment:comment_s};
    }
    catch(err){
        throw new Error("Error while updating comment"+err.message);
    }
}

export const deleteComment = async (comment_Id, postId)=>{
    try{
        const comment_s = await commentModel.findByIdAndDelete(comment_Id);
        const post = await postModel.findById(postId);
        post.comments.pop(comment_s._id);
        await post.save();
        if(!comment_s)
            throw new Error("Error while deleting comment");
        return {success: true, comment:comment_s};
    }
    catch(err){
        throw new Error("Error while deleting comment"+err.message);
    }
}