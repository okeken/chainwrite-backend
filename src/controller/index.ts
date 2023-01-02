import { NextFunction, Request, Response } from "express"
 


export class Controller {
    public model;

    constructor(model:any){
    
      this.model  = model 
    }


    all = async (req:Request,res:Response,next:NextFunction) =>{         
          try{
            // const result =  await this.model.find({})       
            return res.status(200).json({
              // data:result ,
              status:true,   
              //@ts-ignore
              data:res.paginated 
            })
        }
        catch(e){
            console.log(e, "error lo")
                return res.status(500).json({
                    message:"Error occurred",
                    error:e
                })
        }
    
    }

    findById = async(request: Request, res:Response)=>{
        try{
          const response = this.model.find({_id:request.params.id})
          if(!response){
            res.status(404).json({
                message:"data not found"
            })
          }

          return res.status(200).json({
            data: response
          })

        }
        catch(e){
            console.log(e, "error lo")
                return res.status(500).json({
                    message:"Error occurred",
                    error:e
                })
        }
    }

    create = async(req:Request, res:Response)=>{
            try{                   
                const newItem = await new this.model(req.body)
               const result = await newItem.save()               
                return res.status(200).json({
                    data:result,
                    status:true
                })
            }
            catch(e){
                
            }
    }
    
    update= async(req:Request, res:Response)=>{
        try{
              const findItem = await this.model.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body }
              )

              console.log(findItem, "find items")

              if(!findItem){
                res.status(404).json({
                  status:false,
                  message:"Item not found"
                })
              }

              return res.status(201).json({
                data:req.body,
                status:true
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
  
}