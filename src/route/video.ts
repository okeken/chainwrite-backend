import express from "express"
import {prepareVideo} from "../controller/video"

const videoRouter = express.Router()

videoRouter
.get("/:name", prepareVideo)


export default videoRouter