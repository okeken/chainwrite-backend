import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postId: {
      type: String,
      required: true, 
    }, 
    title:{
    type:String
    },
    user:{
      type:String,     
    }  
  },

  { timestamps: true }
);


const posts = mongoose.model("posts", postSchema, );

export default posts;
