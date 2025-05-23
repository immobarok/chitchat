import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getStreamToken } from '../controller/chat.controller';
const router = express.Router();
 

router.get('/token', protectRoute, getStreamToken)

export default router;