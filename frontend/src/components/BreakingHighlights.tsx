"use client";

import { Clock } from "lucide-react";

// ✅ Proper Type Definition
type Article = {
  _id: string;
  title: string;
  publishedAt?: string; // optional to avoid crashes if missing
};

// ✅ Props Type
type BreakingHighlightsProps = {
  articles: Article[];
};

export default function BreakingHighlights({ articles }: BreakingHighlightsProps) {
  // ✅ Check if within last 24 hours
  const isWithin24Hours = (dateStr: string) => {
    const now = Date.now();
    const published = new Date(dateStr).getTime();
    return now - published <= 24 * 60 * 60 * 1000;
  };

  // ✅ Format time ago
  const timeAgo = (dateStr: string) => {
    const now = Date.now();
    const diff = now - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  };

  // ✅ Safe filtering (handles undefined publishedAt)
  const breaking = (articles || [])
    .filter((a) => a.publishedAt && isWithin24Hours(a.publishedAt))
    .slice(0, 10);

  if (breaking.length === 0) return null;

  return (
    <div>
      <h3>🔴 Breaking</h3>

      {breaking.map((article) => (
        <div key={article._id}>
          <p>{article.title}</p>
          <small>
            <Clock size={12} />{" "}
            {article.publishedAt ? timeAgo(article.publishedAt) : "Unknown time"}
          </small>
        </div>
      ))}
    </div>
  );
}