"use client";

export interface Article {
  _id: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  sourceName?: string;
  publishedAt: string;
  url: string;
}

export default function NewsCard({ article }: { article: Article }) {
  return (
    <a href={article.url} target="_blank" className="card">
      <img src={article.imageUrl || "/placeholder.jpg"} />

      <div className="card-content">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>

        <span className="meta">
          {article.sourceName} •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>
    </a>
  );
}