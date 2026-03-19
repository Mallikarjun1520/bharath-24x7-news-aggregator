"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsService_1 = require("../services/newsService");
const Article_1 = __importDefault(require("../models/Article"));
const router = express_1.default.Router();
/**
 * 🔥 FULL PLATFORM INGESTION
 * One click → Fetch from all sources → AI tag → Store → Update categories
 */
router.post("/fetch-news", async (req, res) => {
    try {
        console.log("[Admin] Manual FULL ingestion triggered...");
        const addedCount = await (0, newsService_1.ingestAllEnglishNews)();
        return res.json({
            success: true,
            message: `✅ Ingested ${addedCount} new articles across all categories.`,
        });
    }
    catch (error) {
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
        const totalArticles = await Article_1.default.countDocuments();
        const categoryCountsAggregation = await Article_1.default.aggregate([
            { $unwind: "$tags" },
            {
                $group: {
                    _id: "$tags",
                    count: { $sum: 1 },
                },
            },
        ]);
        const categoryCounts = {};
        categoryCountsAggregation.forEach((item) => {
            categoryCounts[item._id.toLowerCase()] = item.count;
        });
        return res.json({
            activeViewers: 0, // keep your websocket logic separate if needed
            totalPageViews: 0, // optional
            totalArticles,
            categoryCounts,
        });
    }
    catch (error) {
        console.error("[Admin] Stats fetch failed:", error);
        return res.status(500).json({ message: "Failed to load stats" });
    }
});
exports.default = router;
