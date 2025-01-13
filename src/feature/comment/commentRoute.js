import express from 'express';
import { commentAdd, commentUpdate, commentDelete } from './commentController.js';
import userAuth from '../../middleware/userAuth.js';
const commentRouter = express.Router();

commentRouter.post('/addComment/:post_id',userAuth, commentAdd);
commentRouter.patch('/update/:comment_Id',userAuth, commentUpdate);
commentRouter.delete('/delete/:comment_Id', userAuth, commentDelete);
export default commentRouter;