"use client";

import Link from "next/link";

export interface Article {
  _id: string;
  title: string;
  summary?: string;
  content?: string;
  url: string;
  imageUrl?: string;
  sourceName?: string;
  tags?: string[];
  publishedAt: string;
}

interface NewsCardProps {
  article: Article;
  index?: number; // ✅ optional now
  isHero?: boolean;
}

export default function NewsCard({
  article,
  index = 0,
  isHero = false,
}: NewsCardProps) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{
            width: "100%",
            height: isHero ? "320px" : "180px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "16px" }}>
        <h2 style={{ fontSize: isHero ? "22px" : "16px" }}>
          {article.title}
        </h2>

        {article.summary && (
          <p style={{ color: "#aaa" }}>{article.summary}</p>
        )}

        <p style={{ fontSize: "12px", color: "#666" }}>
          {article.sourceName || "Bharat 24/7"} •{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>

        <Link href={`/article/${article._id}`}>
          <button
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#f59e0b",
              color: "#000",
            }}
          >
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
}