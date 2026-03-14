import Parser from "rss-parser";
import axios from "axios";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
      ["enclosure", "enclosure", { keepArray: false }],
    ],
  },
});

export interface RSSNewsItem {
  title: string;
  content: string;
  url: string;
  imageUrl: string;
  sourceName: string;
  publishedAt: string;
}

const RSS_FEEDS = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
  { url: "https://www.thehindu.com/news/national/feeder/default.rss", source: "The Hindu" },
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
];

/**
 * 🔥 Extract OG image by scraping article page
 */
async function scrapeOGImage(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    const html = response.data as string;

    const ogMatch = html.match(/<meta property="og:image" content="(.*?)"/);
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1];
    }

    return "";
  } catch {
    return "";
  }
}

export const fetchFromRSS = async (): Promise<RSSNewsItem[]> => {
  const allArticles: RSSNewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);

      for (const item of parsed.items as any[]) {
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
    } catch (error) {
      console.error(`RSS fetch failed for ${feed.source}`, error);
    }
  }

  return allArticles;
};