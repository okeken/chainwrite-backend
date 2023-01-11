import express from "express"

const videoRouter = express.Router()

videoRouter
.get("/", (req,res)=>{
    console.log(req, res)
})


export default videoRouter