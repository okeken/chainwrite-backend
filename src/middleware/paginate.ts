import { Request, NextFunction} from "express"

export interface IResult  {
  limit:number
  prev:number | null
  next:number | null
  currentPage:number
  total:number
  results?:any
}
const paginate= (models:any)=>{
    return async (req:Request, res:any,next:NextFunction)=>{ 
      
        const {page:p=1, limit:lm=5, ...properties} = req.query
       
        const page = +p as number
        const limit = +lm as number
        const startIndex = +lm *( page-1)
        const endIndex = +lm *( page)

        let result = {
            next:null,           
              prev:null,
             limit,
             currentPage:page
          
        } as IResult;

        try{
            const totalRecords =  await models.find(properties)  

            if(endIndex < totalRecords.length){
                result.next =  page +1                  
                
            }
            if(startIndex > 0){
                result.prev= page -1                  
                
            }

            if(startIndex == totalRecords.length){
                result.prev=null                  
                result.next=null              
                
            }

        result.results =  totalRecords.slice(startIndex, endIndex)
        result.total=totalRecords.length
        res.paginated = result
        next()
        }
        catch(e:any){
            res.status(500).json({ message: e.message });
        }        
    }
}

export default paginate