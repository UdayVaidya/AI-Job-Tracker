import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// this route is used to get the user data with protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
