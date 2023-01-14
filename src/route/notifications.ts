import express from "express"
import {sendNotification} from "../controller/notifications"
import authenticate from "../middleware/auth"


const notificationsRouter = express.Router()

notificationsRouter.use(authenticate)
.post("/:address", sendNotification)
.get("/:address", sendNotification)
// .delete("/:id", deletePost)

export default notificationsRouter