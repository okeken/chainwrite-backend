import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import  indexRouter from "./route"
import cookiesRouter from './route/cookies';
import connectDB from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;



export async function main(){
  await connectDB()

app.use("/", indexRouter)
app.use("/cookies", cookiesRouter)

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

}

main()

