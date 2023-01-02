import mongoose from "mongoose";

const connectDB = async () => {
  try {    
    mongoose.set('strictQuery', true)
    // console.log("DB!!!",process.env.DB_CREDENTIALS )
    if(process.env.DB_CREDENTIALS){
      const connect = await mongoose.connect(`${process.env.DB_CREDENTIALS}`);
      console.log(`Database connected `);
      return connect.connection.host;
    }  
    // const connect = await mongoose.connect(`${process.env.DB_CREDENTIALS}`);
    // console.log(`Database connected to ${connect.connection.host}`);
  } catch (error) {
    console.log(error, "error connectin db");
  }
};

export default connectDB;

export const closeDB = async () => {
  try {
    return await mongoose.connection.close();
  } catch {}
};
