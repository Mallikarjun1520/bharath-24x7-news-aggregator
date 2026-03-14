import axios from "axios";

interface NewsResponse {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    sourceName: string;
    publishedAt: string;
}

// Read API key at runtime
const getApiKey = () => process.env.GNEWS_API_KEY;

/**
 * Fetch multiple pages of English news
 * Free plan: max 10 per page
 * We fetch 3 pages = up to 30 articles
 */
export const fetchEnglishNews = async (): Promise<NewsResponse[]> => {
    const url = "https://gnews.io/api/v4/top-headlines";
    const allArticles: NewsResponse[] = [];

    try {
        for (let page = 1; page <= 3; page++) {
            console.log(`[API] Fetching page ${page}...`);

            const response = await axios.get(url, {
                params: {
                    lang: "en",
                    country: "in",
                    max: 10,       // free plan safe
                    page: page,
                    apikey: getApiKey()
                },
                timeout: 8000
            });

            const mapped = response.data.articles.map((item: any) => ({
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

    } catch (error: any) {
        console.error("[API] GNews fetch failed:", error.response?.data || error.message);
        return [];
    }
};