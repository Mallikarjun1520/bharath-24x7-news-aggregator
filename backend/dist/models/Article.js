"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true, // Original content/description
    },
    summary: {
        type: String, // AI Generated summary
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    source: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Source",
    },
    sourceName: {
        type: String,
    },
    // 🔥 NEW: Deterministic Category (NOT AI generated)
    category: {
        type: String,
        required: true,
        enum: [
            "home",
            "india",
            "business",
            "cinema",
            "sports",
            "technology",
            "startups",
            "jobs",
            "local",
            "world",
        ],
        index: true,
    },
    // AI tags (for search + SEO only)
    tags: [
        {
            type: String,
        },
    ],
    hashId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    // Gravity Ranking Factors
    gravityScore: {
        type: Number,
        default: 0,
    },
    importance: {
        type: Number,
        default: 1, // Base multiplier for breaking news
    },
    interactionCount: {
        type: Number,
        default: 0,
    },
    publishedAt: {
        type: Date,
        required: true,
        index: true,
    },
}, { timestamps: true });
// 🔎 Text index for search functionality
articleSchema.index({
    title: "text",
    summary: "text",
    tags: "text",
});
// 🔥 Compound index for category sorting
articleSchema.index({ category: 1, publishedAt: -1 });
const Article = mongoose_1.default.model("Article", articleSchema);
exports.default = Article;
