import mongoose from "mongoose";

const {Schema,model} = mongoose;

const connectionReqSchema = new Schema({

    fromUserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',//fromUserId is from user collection
        required: true,

    },
    toUserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored", "accepted", "rejected", "interested"],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending',
        
    },
},
{ timestamps: true }
);


//It is middleware which called every time before save
connectionReqSchema.pre("save", function(next){
    const connectionReq = this;

    if(connectionReq.fromUserId.equals(connectionReq.toUserId))
    {
        throw new Error("Cannot connect with yourself");
    }
    next();//compulsary to call next

});
const coonectReqModel =  new model("ConnectionReq",connectionReqSchema);

export default coonectReqModel;