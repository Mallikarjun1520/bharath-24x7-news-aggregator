import cron from "node-cron";
import { ingestAllEnglishNews } from "../services/newsService";

/**
 * Starts scheduled news ingestion
 */
export const startNewsCron = () => {
  console.log("[Cron] News scheduler initialized.");

  // Run every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    try {
      console.log("[Cron] Scheduled ingestion triggered...");
      const count = await ingestAllEnglishNews();
      console.log(`[Cron] Added ${count} new articles.`);
    } catch (err: any) {
      console.error("[Cron] Scheduled ingestion failed:", err.message);
    }
  });
};