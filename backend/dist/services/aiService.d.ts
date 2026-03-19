export declare const generateSummary: (content: string) => Promise<string>;
export declare const generateTags: (title: string, content: string) => Promise<string[]>;
export declare const calculateInitialGravity: (article: any, sourceCredibility: number) => Promise<number>;
