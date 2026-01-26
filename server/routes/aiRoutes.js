import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import getAIInsight from "../services/aiService.js";

const router = express.Router();

router.post("/insights", protect, async (req, res) => {
  try {
    const data = await getAIInsight(req.body);
    res.json(data);
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ message: "AI failed" });
  }
});

export default router;
