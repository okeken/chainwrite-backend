import express, { Express, Request, Response } from 'express';
import connectDB from '../config/database';

const router = express.Router();

connectDB();
/* GET home page. */
router.get('/', function(req, res, next) {
 res.status(200).json({ message: 'Welcome to the API' });
});

export default router;
