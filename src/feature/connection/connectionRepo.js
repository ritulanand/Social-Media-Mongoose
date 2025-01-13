import coonectReqModel from "./connectionSchem.js";
import userModel from "../user/userSchema.js";
export const addReq = async(fromUserId, toUserId, status)=>{

    try{
        const isToUserAvailable = await userModel.findById(toUserId);
        console.log("isuseravai", isToUserAvailable);
        if(!isToUserAvailable){
            throw new Error("Friend user not found");
        }
        const isAlreadyReqPending = await coonectReqModel.findOne({
            $or: [{fromUserId: fromUserId, toUserId: toUserId}, 
                {fromUserId: toUserId, toUserId: fromUserId}]
        });
        console.log("isalreadyreqpending", isAlreadyReqPending);
        if(isAlreadyReqPending){
            throw new Error("Request already pending");
        }
        const newReq = new coonectReqModel({
            fromUserId:fromUserId,
            toUserId: toUserId,
            status: status
        });
        const connect_req = await newReq.save();
        console.log("connect_req", connect_req);
        isToUserAvailable.friends.push(connect_req._id);
        await isToUserAvailable.save();
        if(!newReq) 
            throw new Error("Failed to save request");
        return {success: true, data:fromUserId.name +" to "+isToUserAvailable.name};

    }catch(e){
        throw new Error(`Failed to add request: ${e.message}`);
    }
}

export const freindShipResponse = async ( connection_id, status)=>{

    try{
        const isConnectAvailable = await coonectReqModel.findById(connection_id);
        console.log("isconnectionavaibv;le", isConnectAvailable);
        if(!isConnectAvailable){
            throw new Error("Friendship request not found");
        }
        const isReqSend = await coonectReqModel.findOne({
            $or: [{fromUserId: isConnectAvailable.toUserId, toUserId: isConnectAvailable.fromUserId},
                {fromUserId: isConnectAvailable.fromUserId, toUserId: isConnectAvailable.toUserId}]
        });
        console.log("isreqsend", isReqSend);
        if(!isReqSend){
            throw new Error("Request not found");
        }
        isConnectAvailable.status = status;
        console.log("isconnnection status", isConnectAvailable);
        await isConnectAvailable.save();
        return {success: true};
       

    }catch(e){
        throw new Error(`Failed to update friendship status: ${e.message}`);
    }

}