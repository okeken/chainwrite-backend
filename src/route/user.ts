import express from 'express';
import { createUser, checkUserStatus, updateUser, allUsers } from '../controller/user';
import authenticate from "../middleware/auth"

const userRouter = express.Router();


// const PK = 'your_channel_address_secret_key'; // channel private key
// const Pkey = `0x${PK}`;
// const signer = new ethers.Wallet(Pkey);

userRouter.get('/',allUsers);
userRouter.get('/:address',  checkUserStatus);
userRouter.use(authenticate)
userRouter.post("/:address", createUser)
userRouter.put("/:address", updateUser)


export default userRouter;
