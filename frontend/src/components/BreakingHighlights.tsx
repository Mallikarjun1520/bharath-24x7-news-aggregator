"use client";

import { Clock } from "lucide-react";

export default function BreakingHighlights({ articles }: { articles: any[] }) {
  const isWithin24Hours = (dateStr: string) => {
    const now = Date.now();
    const published = new Date(dateStr).getTime();
    return now - published <= 24 * 60 * 60 * 1000;
  };

  const timeAgo = (dateStr: string) => {
    const now = Date.now();
    const diff = now - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  };

  const breaking = (articles || [])
    .filter((a: any) => a?.publishedAt && isWithin24Hours(a.publishedAt))
    .slice(0, 10);

  if (breaking.length === 0) return null;

  return (
    <div>
      <h3>🔴 Breaking</h3>

      {breaking.map((article: any) => (
        <div key={article._id}>
          <p>{article.title}</p>
          <small>
            <Clock size={12} /> {timeAgo(article.publishedAt)}
          </small>
        </div>
      ))}
    </div>
  );
}