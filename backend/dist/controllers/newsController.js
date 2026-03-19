"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsByCategory = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const cacheService_1 = require("../services/cacheService");
const getNewsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const cacheKey = `news:${category}:page:${page}:limit:${limit}`;
        console.log("🔍 Checking cache for:", cacheKey);
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
        const matchStage = category === "home"
            ? {}
            : { tags: category };
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
        console.error("🚨 Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
};
exports.getNewsByCategory = getNewsByCategory;
