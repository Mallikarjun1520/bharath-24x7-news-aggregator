"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEnglishNews = void 0;
const axios_1 = __importDefault(require("axios"));
// Read API key at runtime
const getApiKey = () => process.env.GNEWS_API_KEY;
/**
 * Fetch multiple pages of English news
 * Free plan: max 10 per page
 * We fetch 3 pages = up to 30 articles
 */
const fetchEnglishNews = async () => {
    const url = "https://gnews.io/api/v4/top-headlines";
    const allArticles = [];
    try {
        for (let page = 1; page <= 3; page++) {
            console.log(`[API] Fetching page ${page}...`);
            const response = await axios_1.default.get(url, {
                params: {
                    lang: "en",
                    country: "in",
                    max: 10, // free plan safe
                    page: page,
                    apikey: getApiKey()
                },
                timeout: 8000
            });
            const mapped = response.data.articles.map((item) => ({
                title: item.title,
                content: item.description || item.content || "",
                url: item.url,
                imageUrl: item.image || "",
                sourceName: item.source?.name || "GNews",
                publishedAt: item.publishedAt
            }));
            console.log(`[API] Page ${page}: ${mapped.length} articles`);
            allArticles.push(...mapped);
        }
        console.log(`[API] Total fetched: ${allArticles.length}`);
        return allArticles;
    }
    catch (error) {
        console.error("[API] GNews fetch failed:", error.response?.data || error.message);
        return [];
    }
};
exports.fetchEnglishNews = fetchEnglishNews;
