import express from "express"
import {deletePost, getPosts, savePost} from "../controller/post"
import authenticate from "../middleware/auth"


const postRouter = express.Router()

postRouter
.get("/", getPosts)

postRouter.use(authenticate)
.post("/:id", savePost)
.delete("/:id", deletePost)

export default postRouter