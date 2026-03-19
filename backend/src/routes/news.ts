import express from "express";
import Article from "../models/Article";
import { cacheService } from "../services/cacheService";

const router = express.Router();

/**
 * 🆕 GET ALL NEWS (HOME FEED)
 */
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json({
      source: "home",
      data: articles,
    });
  } catch (error) {
    console.error("Home fetch failed:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

/**
 * 🧠 GET NEWS BY CATEGORY (Intelligent + Cached)
 */
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const cacheKey = `news:${category}:page:${page}:limit:${limit}`;

    console.log("🔍 Checking cache:", cacheKey);

    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log("✅ Cache HIT");
      return res.json({
        source: "cache",
        data: cached,
      });
    }

    console.log("❌ Cache MISS — querying DB");

    const now = new Date();

    const matchStage =
      category === "home"
        ? {}
        : { category: category };

    const articles = await Article.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          hoursSince: {
            $divide: [
              { $subtract: [now, "$publishedAt"] },
              1000 * 60 * 60,
            ],
          },
        },
      },
      {
        $addFields: {
          recencyBoost: {
            $cond: [
              { $lt: ["$hoursSince", 10] },
              { $subtract: [10, "$hoursSince"] },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          finalScore: {
            $add: [
              { $multiply: ["$importance", 3] },
              { $multiply: ["$interactionCount", 0.5] },
              "$gravityScore",
              "$recencyBoost",
            ],
          },
        },
      },
      { $sort: { finalScore: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    cacheService.set(cacheKey, articles);
    console.log("💾 Stored in cache:", cacheKey);

    res.json({
      source: "db",
      data: articles,
    });
  } catch (error) {
    console.error("Category fetch failed:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

/**
 * 📄 GET SINGLE ARTICLE
 */
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch article" });
  }
});

/**
 * 🔥 TRACK ARTICLE VIEW
 */
router.post("/view/:id", async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      $inc: {
        interactionCount: 1,
        gravityScore: 0.2,
      },
    });

    cacheService.flush();

    res.json({ success: true });
  } catch (error) {
    console.error("View tracking failed:", error);
    res.status(500).json({ message: "Failed to track view" });
  }
});

export default router;