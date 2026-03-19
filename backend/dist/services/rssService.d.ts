export interface RSSNewsItem {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    sourceName: string;
    publishedAt: string;
}
export declare const fetchFromRSS: () => Promise<RSSNewsItem[]>;
