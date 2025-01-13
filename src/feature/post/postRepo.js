import postModel from "./postSchema.js";
import mongoose from "mongoose";
export const addNewPost = async (newPost,user) => {

    try{
        console.log("user", user);
        const savedPost = new postModel({caption:newPost.caption, imageUrl:newPost.imageUrl , userId:user} );
        console.log("ssaved", savedPost);
        const newpost = await savedPost.save();
        console.log("newpost", newPost);
        if(!savedPost){
            throw new Error("Failed to save post");
        }
        return {success:true, res:newpost};
    }catch(err){
        throw new Error('Error adding new post:');
    }
}

export const updatePost = async (post_id ,update,data) => {

    try{
        const updatedPost = await postModel.findById(new mongoose.Types.ObjectId(post_id));
        console.log("updated post", updatePost);
        console.log("update data", update, data);
        // Check if the post exists
        if (!updatedPost) {
          throw new Error("Post not found");
        }
        
        // Update the specific field (caption or imageUrl)
        if (update.toString() === 'caption') {
          updatedPost.caption = data;
        } else {
          updatedPost.imageUrl = data;
        }
    
        // Save the updated post
        const updated = await updatedPost.save();
        
        console.log(updated); // This will print the updated post document
    
        // Return success with the updated post
        return { success: true, res: updated };
    }catch(err){
        throw new Error('Error updating post:'+err);
    }
}

export const deletePost = async (post_id) => {

    try{
        const post = await postModel.findById(post_id);
        if(!post){
            throw new Error("Post not found");
        }
        await postModel.deleteOne({ _id: post_id });
        return {success:true};

    }catch(err){
        throw new Error('Error deleting post:'+err);
    }
}