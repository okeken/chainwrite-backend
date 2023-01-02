import express from 'express';
import { all, createCookie, update, } from '../controller/cookies';
import paginate from '../middleware/paginate';
import cookies from '../model/cookies';

const cookiesRouter = express.Router();

cookiesRouter.get('/',  paginate(cookies), all);
cookiesRouter.post("/", createCookie)
cookiesRouter.put("/:id", update)

export default cookiesRouter;
