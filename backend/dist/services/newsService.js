"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestAllEnglishNews = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const Source_1 = __importDefault(require("../models/Source"));
const aiService_1 = require("./aiService");
const apiService_1 = require("./apiService");
const rssService_1 = require("./rssService");
const cacheService_1 = require("./cacheService");
const crypto_1 = __importDefault(require("crypto"));
/**
 * 🔥 Weighted Category Classifier
 * Deterministic, score-based classification
 */
function classifyCategory(title, content) {
    const text = (title + " " + content).toLowerCase();
    const categories = {
        sports: [
            /cricket/, /football/, /ipl/, /match/, /t20/, /odi/,
            /fifa/, /nba/, /icc/, /tournament/, /league/, /goal/,
            /batting/, /bowling/, /semi[- ]?final/, /final/
        ],
        business: [
            /stock/, /market/, /economy/, /gdp/, /inflation/,
            /trade/, /business/, /shares/, /sensex/, /nifty/,
            /rupee/, /investment/, /finance/
        ],
        cinema: [
            /movie/, /film/, /cinema/, /actor/, /actress/,
            /box office/, /director/, /bollywood/, /hollywood/
        ],
        startups: [
            /startup/, /funding/, /venture/, /entrepreneur/,
            /series a/, /series b/, /valuation/
        ],
        technology: [
            /ai/, /technology/, /software/, /app/, /cyber/,
            /tech/, /robot/, /machine learning/
        ],
        jobs: [
            /job/, /recruitment/, /vacancy/, /hiring/,
            /employment/, /government jobs/
        ],
        world: [
            /usa/, /china/, /russia/, /iran/, /israel/,
            /global/, /uk/, /europe/, /middle east/,
            /international/
        ],
        local: [
            /hyderabad/, /mumbai/, /delhi/,
            /chennai/, /kolkata/, /bangalore/
        ],
        india: [
            /parliament/, /supreme court/, /modi/,
            /government/, /policy/, /india/
        ]
    };
    const scores = {};
    for (const category in categories) {
        scores[category] = 0;
        categories[category].forEach((pattern) => {
            if (pattern.test(text)) {
                scores[category] += 1;
            }
        });
    }
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topCategory, topScore] = sorted[0];
    if (topScore === 0)
        return "india";
    return topCategory;
}
/**
 * 🔥 FULL PLATFORM INGESTION
 */
const ingestAllEnglishNews = async () => {
    console.log("[Admin] Manual FULL ingestion triggered...");
    try {
        const gnewsArticles = await (0, apiService_1.fetchEnglishNews)();
        const rssArticles = await (0, rssService_1.fetchFromRSS)();
        console.log("GNews count:", gnewsArticles.length);
        console.log("RSS count:", rssArticles.length);
        const combinedArticles = [...gnewsArticles, ...rssArticles];
        let addedCount = 0;
        for (const item of combinedArticles) {
            try {
                const hashInput = item.url || `${item.title}-${item.sourceName}`;
                const hashId = crypto_1.default
                    .createHash("sha256")
                    .update(hashInput)
                    .digest("hex");
                const existing = await Article_1.default.findOne({ hashId });
                if (existing)
                    continue;
                const safeContent = item.content && item.content.trim().length > 20
                    ? item.content
                    : item.title;
                const category = classifyCategory(item.title, safeContent);
                let source = await Source_1.default.findOne({ name: item.sourceName });
                if (!source) {
                    source = await Source_1.default.create({
                        name: item.sourceName,
                        credibilityScore: 1.2,
                    });
                }
                let summary = "";
                let tags = [];
                let gravity = 1;
                try {
                    summary = await (0, aiService_1.generateSummary)(safeContent);
                    tags = await (0, aiService_1.generateTags)(item.title, safeContent);
                    gravity = await (0, aiService_1.calculateInitialGravity)(item, source.credibilityScore);
                }
                catch {
                    summary = safeContent.slice(0, 150);
                    tags = [category];
                }
                await Article_1.default.create({
                    title: item.title,
                    content: safeContent,
                    summary,
                    url: item.url,
                    imageUrl: item.imageUrl || "",
                    source: source._id,
                    sourceName: source.name,
                    tags,
                    category,
                    hashId,
                    gravityScore: gravity,
                    publishedAt: new Date(item.publishedAt || Date.now()),
                });
                addedCount++;
            }
            catch (err) {
                if (err.code === 11000)
                    continue;
                console.error("Article skipped:", err.message);
            }
        }
        console.log(`[Admin] Added ${addedCount} new articles.`);
        if (addedCount > 0) {
            cacheService_1.cacheService.flush();
        }
        return addedCount;
    }
    catch (error) {
        console.error("[Admin] Ingestion failed:", error);
        throw error;
    }
};
exports.ingestAllEnglishNews = ingestAllEnglishNews;
