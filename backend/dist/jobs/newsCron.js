"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNewsCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const newsService_1 = require("../services/newsService");
/**
 * Starts scheduled news ingestion
 */
const startNewsCron = () => {
    console.log("[Cron] News scheduler initialized.");
    // Run every 30 minutes
    node_cron_1.default.schedule("*/30 * * * *", async () => {
        try {
            console.log("[Cron] Scheduled ingestion triggered...");
            const count = await (0, newsService_1.ingestAllEnglishNews)();
            console.log(`[Cron] Added ${count} new articles.`);
        }
        catch (err) {
            console.error("[Cron] Scheduled ingestion failed:", err.message);
        }
    });
};
exports.startNewsCron = startNewsCron;
