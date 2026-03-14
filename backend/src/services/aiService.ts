import { randomInt } from 'crypto';

/**
 * AI Service Mock
 * In a real application, this would call OpenAI, Groq, or another LLM API.
 * For now, since API keys are not provided yet, we simulate the AI logic.
 */

const categories = ['Politics', 'Tech', 'Sports', 'Education', 'Startups', 'State News'];

export const generateSummary = async (content: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!content) return "No content available.";

    // Create a mock summary (first 100 characters + ...)
    const summary = content.substring(0, 100) + '... (AI Summary)';
    return summary;
};

export const generateTags = async (title: string, content: string): Promise<string[]> => {
    // Simulate AI identifying context and returning 2-3 tags
    const tags: string[] = [];

    // Pick a random primary category
    const primaryCategory = categories[randomInt(0, categories.length)];
    tags.push(primaryCategory);

    // Add some keyword tags
    if (title.toLowerCase().includes('india') || content.toLowerCase().includes('india')) {
        tags.push('India');
    }
    if (title.toLowerCase().includes('startup') || title.toLowerCase().includes('funding')) {
        tags.push('Business');
    }

    return tags;
};

export const calculateInitialGravity = async (article: any, sourceCredibility: number): Promise<number> => {
    // Gravity calculation logic:
    // Base point from 1 to 10
    let gravity = 5.0;

    // Source credibility modifier (e.g. 1.0 = neutral, 1.5 = high credibility)
    gravity *= sourceCredibility;

    // Breaking news/importance modifier based on keywords
    const breakingKeywords = ['breaking', 'exclusive', 'massive', 'alert'];
    const hasBreaking = breakingKeywords.some(kw => article.title.toLowerCase().includes(kw));
    if (hasBreaking) {
        gravity += 3.0; // Boost
    }

    // Temporal freshness (will be updated dynamically by frontend/DB query, but initial score is high)
    return Math.min(Math.max(gravity, 1.0), 10.0); // Clamp between 1.0 and 10.0
};
