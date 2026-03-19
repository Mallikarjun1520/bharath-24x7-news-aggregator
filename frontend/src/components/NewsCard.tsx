"use client";

import React from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export interface Article {
  _id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  url: string;
}

interface Props {
  article: Article;
  index: number;
  isHero?: boolean;
}

export default function NewsCard({ article, isHero }: Props) {

  const handleClick = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/news/interact/${article._id}`, {
        method: "POST"
      });
    } catch {}
    window.open(article.url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        background: "#111",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <img
        src={article.imageUrl || "/fallback.jpg"}
        alt={article.title}
        style={{
          width: "100%",
          height: isHero ? "400px" : "220px",
          objectFit: "cover"
        }}
      />

      <div style={{ padding: "16px" }}>
        <h3
          style={{
            fontSize: isHero ? "1.5rem" : "1rem",
            marginBottom: "8px"
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#aaa"
          }}
        >
          {article.summary}
        </p>
      </div>
    </div>
  );
}