import express from "express";
import { getNewsByCategory } from "../controllers/newsController";
import Article from "../models/Article";

const router = express.Router();

/* GET LATEST NEWS (HOME) */
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json(articles);
  } catch (error) {
    console.error("Fetch all news error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

/* GET CATEGORY NEWS */
router.get("/category/:category", getNewsByCategory);

/* TRACK INTERACTION */
router.post("/interact/:id", async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      $inc: { interactionCount: 1 },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Interaction error:", error);
    res.status(500).json({ error: "Failed" });
  }
});

export default router;