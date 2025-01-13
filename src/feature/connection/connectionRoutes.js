import express from 'express';

import { freindShipReq , freindshipresp} from './connectioController.js';
import userAuth from '../../middleware/userAuth.js';

const connectionrouter = express.Router();

connectionrouter.post('/request/send/:status/:toUserId',userAuth, freindShipReq);
connectionrouter.post('/response/send/:status/:connection_id',userAuth, freindshipresp);

export default connectionrouter;