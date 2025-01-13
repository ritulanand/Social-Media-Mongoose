import { addComment, updateComment, deleteComment } from "./commentRepo.js";

export const commentAdd =  async (req, res)=>{

    try{
        const post_id = req.params.post_id;
        const user_id = req.user._id;
        const {comment} = req.body;
        console.log("user id", user_id, comment);

        const resp = await addComment(comment, post_id, user_id);
        console.log("resp comment", resp);
        if(resp.success){
            res.status(201).json({
                success: true,
                message: "Comment added successfully",
                comment: resp.comment
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Failed to add comment",
                error: err.message
            });
            return;
        }

    }catch(err){
        res.status(500).json({error: err.message});
        return;
    }

}

export const commentUpdate = async (req, res)=>{

    try{
        const commentId = req.params.comment_Id;
        const {comment} = req.body;
        const resp = await updateComment(comment, commentId);
        console.log("resp comment update", resp);
        if(resp.success){
            res.status(200).json({
                success: true,
                message: "Comment updated successfully",
                comment: resp.comment
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Failed to update comment",
                error: err.message
            });
            return;
        }

    }catch(err){
        res.status(500).json({error: err.message});
        return;
    }
}

export const commentDelete = async (req, res)=>{
    try{
        const commentId = req.params.comment_Id;
        const postId = req.body.postId;
        const resp = await deleteComment(commentId, postId);
        console.log("resp comment delete", resp);
        if(resp.success){
            res.status(200).json({
                success: true,
                message: "Comment deleted successfully"
            });
        } else{
            res.status(400).json({
                success: false,
                message: "Failed to delete comment",
                error: err.message
            });
            return;
        }
    }catch(err){
        res.status(500).json({error: err.message});
        return;
    }
}