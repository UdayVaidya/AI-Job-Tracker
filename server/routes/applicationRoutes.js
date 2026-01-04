import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createApplication,getApplication } from '../controllers/applicationController.js';

const router = express.Router();

router.post("/",protect,createApplication);
router.get("/",protect,getApplication);

export default router;