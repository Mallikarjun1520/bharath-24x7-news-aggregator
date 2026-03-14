import Article from "../models/Article";
import Source from "../models/Source";
import { generateSummary, generateTags, calculateInitialGravity } from "./aiService";
import { fetchEnglishNews } from "./apiService";
import { fetchFromRSS } from "./rssService";
import { cacheService } from "./cacheService";
import crypto from "crypto";

/**
 * 🔥 Weighted Category Classifier
 * Deterministic, score-based classification
 */
function classifyCategory(title: string, content: string): string {
  const text = (title + " " + content).toLowerCase();

  const categories: Record<string, RegExp[]> = {
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

  const scores: Record<string, number> = {};

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

  if (topScore === 0) return "india";

  return topCategory;
}

/**
 * 🔥 FULL PLATFORM INGESTION
 */
export const ingestAllEnglishNews = async (): Promise<number> => {
  console.log("[Admin] Manual FULL ingestion triggered...");

  try {
    const gnewsArticles = await fetchEnglishNews();
    const rssArticles = await fetchFromRSS();

    console.log("GNews count:", gnewsArticles.length);
    console.log("RSS count:", rssArticles.length);

    const combinedArticles = [...gnewsArticles, ...rssArticles];

    let addedCount = 0;

    for (const item of combinedArticles) {
      try {
        const hashInput = item.url || `${item.title}-${item.sourceName}`;
        const hashId = crypto
          .createHash("sha256")
          .update(hashInput)
          .digest("hex");

        const existing = await Article.findOne({ hashId });
        if (existing) continue;

        const safeContent =
          item.content && item.content.trim().length > 20
            ? item.content
            : item.title;

        const category = classifyCategory(item.title, safeContent);

        let source = await Source.findOne({ name: item.sourceName });

        if (!source) {
          source = await Source.create({
            name: item.sourceName,
            credibilityScore: 1.2,
          });
        }

        let summary = "";
        let tags: string[] = [];
        let gravity = 1;

        try {
          summary = await generateSummary(safeContent);
          tags = await generateTags(item.title, safeContent);
          gravity = await calculateInitialGravity(
            item,
            source.credibilityScore
          );
        } catch {
          summary = safeContent.slice(0, 150);
          tags = [category];
        }

        await Article.create({
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
      } catch (err: any) {
        if (err.code === 11000) continue;
        console.error("Article skipped:", err.message);
      }
    }

    console.log(`[Admin] Added ${addedCount} new articles.`);

    if (addedCount > 0) {
      cacheService.flush();
    }

    return addedCount;
  } catch (error) {
    console.error("[Admin] Ingestion failed:", error);
    throw error;
  }
};