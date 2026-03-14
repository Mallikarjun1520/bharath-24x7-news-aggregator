import express from "express";
import { ingestAllEnglishNews } from "../services/newsService";
import Article from "../models/Article";

const router = express.Router();

/**
 * 🔥 FULL PLATFORM INGESTION
 * One click → Fetch from all sources → AI tag → Store → Update categories
 */
router.post("/fetch-news", async (req, res) => {
  try {
    console.log("[Admin] Manual FULL ingestion triggered...");

    const addedCount = await ingestAllEnglishNews();

    return res.json({
      success: true,
      message: `✅ Ingested ${addedCount} new articles across all categories.`,
    });
  } catch (error: any) {
    console.error("[Admin] Fetch news failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "❌ Failed to fetch news.",
    });
  }
});

/**
 * 📊 ADMIN STATS
 * Returns:
 * - Live article count
 * - Category breakdown (based on tags)
 */
router.get("/stats", async (req, res) => {
  try {
    const totalArticles = await Article.countDocuments();

    const categoryCountsAggregation = await Article.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
    ]);

    const categoryCounts: Record<string, number> = {};

    categoryCountsAggregation.forEach((item) => {
      categoryCounts[item._id.toLowerCase()] = item.count;
    });

    return res.json({
      activeViewers: 0, // keep your websocket logic separate if needed
      totalPageViews: 0, // optional
      totalArticles,
      categoryCounts,
    });
  } catch (error) {
    console.error("[Admin] Stats fetch failed:", error);
    return res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;