import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import  indexRouter from "./route"
import cookieParser from "cookie-parser"
import cors from "cors"
import cookiesRouter from './route/cookies';
import connectDB from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;



async function main(){
  await connectDB()
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use(express.raw({type: "application/json"}));
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false})); // include this line

  app.use("/", indexRouter)
app.use("/cookies", cookiesRouter)

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

}

main()

