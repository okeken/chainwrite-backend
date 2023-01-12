import mongoose from "mongoose";
import {userStatus} from "../enum"

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    address: {
      type: String,
      required: true, 
    }, 
    status:{
      default:userStatus.NotAvailable,
        type:Number,
        enum:userStatus
    },
    optedIn:{
      default:false,
      type:Boolean
    },
    handle:{
    type:String
    }, 
    
  },

  { timestamps: true }
);


const users = mongoose.model("users", usersSchema, );

export default users;
