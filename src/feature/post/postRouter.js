import express from 'express';
import { addPost, postUpdate, postdelete } from './postController.js';
import userAuth from '../../middleware/userAuth.js';
const postRouter = express.Router();

postRouter.post('/addPost',userAuth, addPost);
postRouter.patch('/updatePost',userAuth, postUpdate);
postRouter.delete('/deletePost',userAuth, postdelete);
export default postRouter;