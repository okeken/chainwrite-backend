import express from 'express';
import { createUser, checkUserStatus, updateUser, allUsers } from '../controller/user';
import authenticate from "../middleware/auth"

const userRouter = express.Router();

userRouter.get('/',allUsers);
userRouter.get('/:address',  checkUserStatus);
userRouter.use(authenticate)
userRouter.post("/:address", createUser)
userRouter.put("/:address", updateUser)


export default userRouter;
