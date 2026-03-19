"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface Article {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  sourceName?: string;
  publishedAt: string;
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/news/${id}`);

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setArticle(data);

        // 🔥 Track view
        await fetch(`${BACKEND_URL}/api/news/view/${id}`, {
          method: "POST",
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Loading article...
      </div>
    );

  if (error || !article)
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Article not found.
      </div>
    );

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "40px 20px" }}>
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "20px",
          background: "none",
          border: "none",
          color: "#888",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: "30px", marginBottom: "12px" }}>
        {article.title}
      </h1>

      <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>
        {article.sourceName || "Bharat 24/7"} ·{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>

      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        />
      )}

      <div
        style={{
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#ddd",
        }}
      >
        {article.content}
      </div>
    </div>
  );
}