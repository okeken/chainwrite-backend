
import { Request, Response } from "express"
import { Controller} from "."

import cookiesDb from "../model/cookies"

export interface ICookie extends Request  {
    name: String;
 
  } 
export class Cookies extends Controller { 
    constructor(props:any){
        super(props)
    } 
    createCookie = async (req:Request, res:Response)=>{
       
        const { name  } = req.body
        
        try{
            const findItem = await this.model.findOne({
            name
          })      
            if(findItem){
            return  res.status(423).json({
              status:false,
              message:"Resource already available",
              name
            })            
          }
          return this.create(req, res)
        }
        catch(e){
            return e
        }

        
    }
    
}

export const {all, create, createCookie, update } = new Cookies(cookiesDb)




