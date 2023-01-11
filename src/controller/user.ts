import {Request, Response} from "express"
import userDb from "../model/user"
import { userStatus } from "../enum"


export const allUsers= async(req:Request, res:Response)=>{
    try{

        const users= await userDb.find()
        return res.status(200).json({
            users
        })
    }
    catch(e){}
}

export const checkUserStatus = async (req:Request, res:Response)=>{
   
    const address = req.user   
   
    try{
        const isUserAv = await userDb.findOne({address})
        if(!isUserAv){
            return res.status(200).json({
                status:userStatus.NotAvailable
            })
        }

        return res.status(200).json({
            status:isUserAv.status
        })
    }
    catch(e){
  return res.status(500).json({
    status:"failed",
    error:e
  })
    }
}

export const createUser =async (req:Request, res:Response)=>{
 
   try{
    const {address} = req.params    
    const newUser =  new userDb({
        address,
       status:userStatus.isPending
    })
    
   await newUser.save()
    return  res.status(201).json({
        message:'success',
       status:userStatus.isPending
    })
   }
   catch(e){}
  
}

export const updateUser = async(req:Request, res:Response)=>{
    const {address} = req.params
    
    try{
        const findItem = await userDb.updateOne(
          { address },
          { $set: {
            status:userStatus.isAvailable
          } 
        }
        )

       
        if(!findItem){
          res.status(200).json({
            status:userStatus.NotAvailable,
            message:"user not found"
          })
        }

        return res.status(201).json({
         status:userStatus.isAvailable        
        })
  }
  catch(e){
    return res.status(500).json({
      status:false,
      message:"Server error",
      error:e
    })
  }
}