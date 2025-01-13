import mongoose, {model} from "mongoose";

const likeSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    likes:{
        type: Number,
        default: 0
    }
});

const likeModel = new model("like", likeSchema);
export default likeModel;