import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createApplication,
        getApplication,
        updateApplication,
        deleteApplication 
} from '../controllers/applicationController.js';

const router = express.Router();

router.post("/",protect,createApplication);
router.get("/",protect,getApplication);
router.put("/:id",protect,updateApplication);
router.delete("/:id",protect,deleteApplication);

export default router;