"use client";

import { Article } from "./NewsCard";
import { Clock } from "lucide-react";

interface BreakingHighlightsProps {
  articles: Article[];
}

function isWithin24Hours(dateStr: string) {
  const now = Date.now();
  const published = new Date(dateStr).getTime();
  return now - published <= 24 * 60 * 60 * 1000;
}

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
      <div className="breaking-label">
        🔴 BREAKING
      </div>

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
              <Clock size={12} />
              {timeAgo(article.publishedAt)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}