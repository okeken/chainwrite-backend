import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import  indexRouter from "./route"
import cors from "cors"
import cookiesRouter from './route/cookies';
import connectDB from './config/database';
import userRouter from './route/user';
import postRouter from './route/post';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;



async function main(){
  await connectDB()
app.use(express.json());
const corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus:200
};

app.use(cors(corsOption));
app.options('*', cors());
app.use(express.raw({type: "application/json"}));
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false})); // include this line

app.use("/", indexRouter)
app.use("/cookies", cookiesRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

}

main()

