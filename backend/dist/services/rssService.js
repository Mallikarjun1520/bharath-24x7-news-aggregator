"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFromRSS = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const axios_1 = __importDefault(require("axios"));
const parser = new rss_parser_1.default({
    customFields: {
        item: [
            ["media:content", "mediaContent", { keepArray: true }],
            ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
            ["enclosure", "enclosure", { keepArray: false }],
        ],
    },
});
const RSS_FEEDS = [
    { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
    { url: "https://www.thehindu.com/news/national/feeder/default.rss", source: "The Hindu" },
    { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
];
/**
 * 🔥 Extract OG image by scraping article page
 */
async function scrapeOGImage(url) {
    try {
        const response = await axios_1.default.get(url, { timeout: 5000 });
        const html = response.data;
        const ogMatch = html.match(/<meta property="og:image" content="(.*?)"/);
        if (ogMatch && ogMatch[1]) {
            return ogMatch[1];
        }
        return "";
    }
    catch {
        return "";
    }
}
const fetchFromRSS = async () => {
    const allArticles = [];
    for (const feed of RSS_FEEDS) {
        try {
            const parsed = await parser.parseURL(feed.url);
            for (const item of parsed.items) {
                let imageUrl = "";
                // 1️⃣ enclosure
                if (item.enclosure?.url) {
                    imageUrl = item.enclosure.url;
                }
                // 2️⃣ media:content
                else if (item.mediaContent?.[0]?.$?.url) {
                    imageUrl = item.mediaContent[0].$.url;
                }
                // 3️⃣ media:thumbnail
                else if (item.mediaThumbnail?.[0]?.$?.url) {
                    imageUrl = item.mediaThumbnail[0].$.url;
                }
                // 4️⃣ extract from HTML content
                else if (item.content) {
                    const imgMatch = item.content.match(/<img.*?src="(.*?)"/);
                    if (imgMatch && imgMatch[1]) {
                        imageUrl = imgMatch[1];
                    }
                }
                // 5️⃣ Last fallback → scrape OG image
                if (!imageUrl && item.link) {
                    imageUrl = await scrapeOGImage(item.link);
                }
                allArticles.push({
                    title: item.title || "",
                    content: item.contentSnippet || item.content || "",
                    url: item.link || "",
                    imageUrl,
                    sourceName: feed.source,
                    publishedAt: item.pubDate || new Date().toISOString(),
                });
            }
        }
        catch (error) {
            console.error(`RSS fetch failed for ${feed.source}`, error);
        }
    }
    return allArticles;
};
exports.fetchFromRSS = fetchFromRSS;
