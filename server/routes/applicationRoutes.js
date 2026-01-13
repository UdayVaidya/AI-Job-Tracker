import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createApplication,
        getApplication,
        updateApplication,
        deleteApplication 
} from '../controllers/applicationController.js';

const router = express.Router();

// this route is used to create a new application
router.post("/",protect,createApplication);

// this route is used to get all the applications
router.get("/",protect,getApplication);

// this route is used to update a application
router.put("/:id",protect,updateApplication);

// this route is used to delete a application
router.delete("/:id",protect,deleteApplication);

export default router;