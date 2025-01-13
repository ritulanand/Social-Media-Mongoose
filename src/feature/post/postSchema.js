import mongoose,{model} from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    caption:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    ]
});

const postModel = new model("post", postSchema);
export default postModel;
