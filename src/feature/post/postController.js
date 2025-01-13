import { addNewPost, updatePost, deletePost } from "./postRepo.js";

export const addPost = async (req, res) => {
    const newPost = req.body;
    const user = req.user;
    try{
        console.log("add post", newPost, user);
        const resp = await addNewPost(newPost,user);
        console.log("post resp", resp);
    if(resp.success) {
        res.status(201).json({
            success: true,
            message: "Post added successfully",
            data: resp.res
        });
    }else{
        res.status(500).json({
            success: false,
            message: "Failed to add post"
        });
    }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

export const postUpdate = async (req, res) => {

    const data = req.body.data;
    const update = req.query.update;
    const post_id = req.query.postId;
    console.log("data", data, update, post_id);
    try{
        const resp = await updatePost(post_id,update,data);
        console.log("post update resp", resp);
        if(resp.success) {
            res.status(200).json({
                success: true,
                message: "Post updated successfully",
                data: resp.res
            });
        }else{
            res.status(500).json({
                success: false,
                message: "Failed to update post"
            });
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const postdelete = async (req, res) => {
    const post_id = req.query.postId;
    try{
        const resp = await deletePost(post_id);
        console.log("post resp delete", resp);
        if(resp.success) {
            res.status(200).json({
                success: true,
                message: "Post deleted successfully"
            });
        }else{
            res.status(500).json({
                success: false,
                message: "Failed to delete post"
            });
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}