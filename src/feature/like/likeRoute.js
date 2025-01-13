import express from 'express';
import { likeAdd } from './likeController.js';
import userAuth from '../../middleware/userAuth.js';

const likeRouter = express.Router();

likeRouter.post('/addLike/:post_id', userAuth, likeAdd);

export default likeRouter;