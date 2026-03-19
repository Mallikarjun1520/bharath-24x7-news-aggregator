"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Article_1 = __importDefault(require("../models/Article"));
const cacheService_1 = require("../services/cacheService");
const router = express_1.default.Router();
/**
 * 🧠 GET NEWS BY CATEGORY (Intelligent + Cached)
 */
router.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const cacheKey = `news:${category}:page:${page}:limit:${limit}`;
        console.log("🔍 Checking cache:", cacheKey);
        const cached = cacheService_1.cacheService.get(cacheKey);
        if (cached) {
            console.log("✅ Cache HIT");
            return res.json({
                source: "cache",
                data: cached,
            });
        }
        console.log("❌ Cache MISS — querying DB");
        const now = new Date();
        // ✅ FIXED MATCH STAGE (USE category FIELD, NOT tags)
        const matchStage = category === "home"
            ? {}
            : { category: category };
        const articles = await Article_1.default.aggregate([
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
        cacheService_1.cacheService.set(cacheKey, articles);
        console.log("💾 Stored in cache:", cacheKey);
        res.json({
            source: "db",
            data: articles,
        });
    }
    catch (error) {
        console.error("Category fetch failed:", error);
        res.status(500).json({ message: "Failed to fetch news" });
    }
});
/**
 * 📄 GET SINGLE ARTICLE
 */
router.get("/:id", async (req, res) => {
    try {
        const article = await Article_1.default.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch article" });
    }
});
/**
 * 🔥 TRACK ARTICLE VIEW
 */
router.post("/view/:id", async (req, res) => {
    try {
        await Article_1.default.findByIdAndUpdate(req.params.id, {
            $inc: {
                interactionCount: 1,
                gravityScore: 0.2,
            },
        });
        // 🔥 Clear cache when engagement changes
        cacheService_1.cacheService.flush();
        res.json({ success: true });
    }
    catch (error) {
        console.error("View tracking failed:", error);
        res.status(500).json({ message: "Failed to track view" });
    }
});
exports.default = router;
