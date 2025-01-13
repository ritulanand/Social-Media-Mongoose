import mongoose, {model} from "mongoose";

const commentSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    comment:{
        type: String,
        required: true
    }
});

const commentModel = new model("comment", commentSchema);
export default commentModel;