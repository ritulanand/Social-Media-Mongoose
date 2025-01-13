import { addReq, freindShipResponse } from "./connectionRepo.js";

export const freindShipReq =async (req, res) =>{

    try{

        const { toUserId, status} = req.params;
        console.log("touserid", toUserId);
        const fromUserId = req.user;
        const resp = await addReq(fromUserId, toUserId, status);
        console.log("resp conncetoi", resp);
        if(!resp.success){
            return res.status(500).json({error:"Error creating user request"});
        }
        return res.status(200).json({
            success: true,
            message: "Friend request sent successfully "+resp.data
        });

    }catch(err){
        res.status(500).json({error: err.message});
        return;
    }
}
export const freindshipresp = async (req, res)=>{

    try{
        const { connection_id, status}= req.params;
        console.log("connect", connection_id);
        const resp = await freindShipResponse(connection_id, status);
        console.log("resp frendship res", resp);
        if(!resp.success){
            return res.status(500).json({error:"Error accepting user request"});
        }
        return res.status(200).json({
            success: true,
            message: "Friend request "+status+" successfully "
        });

    }catch(err){
        return res.status(500).json({error: err.message});
        
    }
}