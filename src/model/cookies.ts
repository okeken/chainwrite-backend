import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cookiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
 
    },  
  },

  { timestamps: true }
);


const cookies = mongoose.model("cookies", cookiesSchema, );

export default cookies;
