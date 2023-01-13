import {Request, Response} from "express"
import axios from "axios"



export const prepareVideo = async(req:Request, res:Response)=>{
    const API_TOKEN = process.env.LIVEPEER_API_KEY
   const name = req.params.name
    try {      
        const response = await axios({
          method: "POST",
          url: "https://livepeer.studio/api/asset/request-upload",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: { name },
        });
    
        return res.status(200).json({
            url: response?.data?.url,
            playBackId: response.data?.asset?.playbackId,
          })
      } catch (e) {
           
        return res.status(500).json({
            error:e,
            message:"failed"
        })
      
      }
}