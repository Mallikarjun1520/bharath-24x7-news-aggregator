import { Request, Response } from "express";
import Article from "../models/Article";
import { cacheService } from "../services/cacheService";

export const getNewsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const cacheKey = `news:${category}:page:${page}:limit:${limit}`;

    console.log("🔍 Checking cache for:", cacheKey);

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
        : { tags: category };

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
    console.error("🚨 Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};