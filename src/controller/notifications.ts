import { Request, Response } from "express"
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { channelAddress } from "../config";


const getSigner=async ()=>{
  const Pkey = `0x${process.env.PK}`;
const signer = new ethers.Wallet(Pkey);
return signer
}

export const sendNotification = async (req:Request,res:Response) => { 
    const signer = await getSigner()
    const payload = req.body
    const address = req.params.address
    
  

    const {
      notTitle ,
      msgTitle ,
      msgBody ,
      receiver=address
    } = payload;
    if(!notTitle || !msgBody || !receiver || ! msgTitle ){
      return res.status(400).json({
        message:'all fields are required'
      })
    }

    if((req.user!.toLocaleLowerCase()) == receiver.toLocaleLowerCase()){
      return res.status(200).json({
        data:204,
        status:"success"
      })      
    }

    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: notTitle,
          body:"",
        },
        payload: {
          title: msgTitle,
          body: msgBody,
          cta: "",
          img: "",
        },
        recipients: `eip155:80001:${receiver}`, // user address in CAIP,
        // recipients: "eip155:5:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1", // recipient address
        channel: `eip155:80001:${channelAddress}`,
        env: "staging",
      });  

      return res.status(200).json({
        data:apiResponse?.status,
        status:apiResponse?.status === 204 ?"success" :"failed"
      })
    } catch (err) {
      console.error("Error: ", err);
      return res.status(500).json({
        error:err,
        status:'failed'
      })
    }
  };

  export const receiveNotification = async (req:Request,res:Response) => { 
     
    try{

      return res.status(200).json({
        status:"success"
      })
    }
    catch(e){
      return res.status(500).json({
        error:e,
        status:'failed'
      })
    }


   }