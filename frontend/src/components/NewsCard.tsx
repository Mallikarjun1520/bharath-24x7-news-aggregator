"use client";

import Link from "next/link";

export interface Article {
  _id: string;
  title: string;
  url: string;
  imageUrl?: string;
  sourceName?: string;
  publishedAt: string; // ✅ FIXED
}

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        transition: "0.2s ease",
      }}
    >
      {/* IMAGE */}
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px",
          }}
        />
      )}

      {/* TITLE */}
      <h3
        style={{
          fontSize: "18px",
          marginBottom: "8px",
          color: "#fff",
        }}
      >
        {article.title}
      </h3>

      {/* SOURCE + TIME */}
      <p
        style={{
          fontSize: "13px",
          color: "#aaa",
          marginBottom: "10px",
        }}
      >
        {article.sourceName || "Bharat 24/7"} •{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>

      {/* READ MORE */}
      <Link
        href={`/article/${article._id}`}
        style={{
          color: "#f59e0b",
          fontSize: "14px",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Read more →
      </Link>
    </div>
  );
}