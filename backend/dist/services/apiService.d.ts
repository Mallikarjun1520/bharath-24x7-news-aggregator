interface NewsResponse {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    sourceName: string;
    publishedAt: string;
}
/**
 * Fetch multiple pages of English news
 * Free plan: max 10 per page
 * We fetch 3 pages = up to 30 articles
 */
export declare const fetchEnglishNews: () => Promise<NewsResponse[]>;
export {};
