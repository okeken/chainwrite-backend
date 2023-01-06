import {Request, Response} from "express"
import postDb from "../model/post"

export const savePost = async(req:Request, res:Response)=>{
        try{
            const id = req.params.id;
            const title=req.body.title
            const findItem =await  postDb.findOne({postId:id, title})
            if(findItem) {
                return  res.status(201).json({
                    data:findItem,
                    status:"saved before"
                })
            }
            const savePost = new postDb({postId:id})
            const savedPost  = await savePost.save()     
            return res.status(201).json({
                data:savedPost,
                status:"success"
            })
        }
        catch(e){
            return res.status(500).json({
                error:e,
                status:"failed"
            })
        } 

}

export const deletePost = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;
        const deleteItem = await postDb.findOneAndDelete({postId:id})     
            return  res.status(201).json({
                data:deleteItem,
                status:"saved before"
            })
        

    }
    catch(e){
        return res.status(500).json({
            error:e,
            status:"failed"
        })
    } 

}



export const getPosts = async(req:Request, res:Response)=>{
    try{
        const posts = await postDb.find({})
        return res.status(200).json({
            data:posts,
            status:"success"
        })
    }
    catch(e){
        return res.status(500).json({
            error:e,
            status:"failed"
        })
        
    }
}

export const getUserPost =async(req:Request, res:Response)=>{
    const user = req.user

    try{}
    catch(e){

    }
    
}