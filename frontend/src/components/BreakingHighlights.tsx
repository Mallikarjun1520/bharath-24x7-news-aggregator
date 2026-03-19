"use client";

import { Clock } from "lucide-react";

/**
 * ✅ Local Article type (no dependency issues)
 */
interface Article {
  _id: string;
  title: string;
  url: string;
  publishedAt: string;
}

interface BreakingHighlightsProps {
  articles: Article[];
}

/**
 * Check if article is within last 24 hours
 */
function isWithin24Hours(dateStr: string) {
  const now = Date.now();
  const published = new Date(dateStr).getTime();
  return now - published <= 24 * 60 * 60 * 1000;
}

/**
 * Convert to "time ago"
 */
function timeAgo(dateStr: string) {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function BreakingHighlights({
  articles,
}: BreakingHighlightsProps) {
  const breaking = articles
    .filter((a) => isWithin24Hours(a.publishedAt))
    .slice(0, 10);

  if (breaking.length === 0) return null;

  return (
    <div className="breaking-container">
      <div className="breaking-label">🔴 BREAKING</div>

      <div className="breaking-scroll">
        {breaking.map((article) => (
          <a
            key={article._id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="breaking-item"
          >
            <span className="breaking-title">
              {article.title}
            </span>

            <span className="breaking-time">
              <Clock size={12} style={{ marginRight: "4px" }} />
              {timeAgo(article.publishedAt)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}