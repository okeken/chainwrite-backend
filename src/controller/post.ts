
import {Request, Response} from "express"
import postDb from "../model/post"
import { viewPublicationQuery } from "../queries";
import { request } from 'graphql-request'


const endpoint = "https://api-mumbai.lens.dev"

export const savePost = async(req:Request, res:Response)=>{
        try{
            const id = req.params.id;          
            const user = req.user
            const findItem =await  postDb.findOne({postId:id})
            if(findItem) {
                return  res.status(201).json({
                    data:findItem,
                    status:"saved before"
                })
            }   
         const saved = await  request(endpoint,viewPublicationQuery,{id})
        
             // @ts-ignore
            const title=  viewPost.publication.metadata.description
            console.log(title,"titlee")

            const savePost = new postDb({postId:id, user, title})
            const savedPost  = await savePost.save()     
            return res.status(201).json({
                data:savedPost,
                status:"success"
            })
        }
        catch(e){
            console.log(e, "ero server")
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