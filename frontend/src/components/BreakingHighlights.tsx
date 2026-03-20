"use client";

export default function BreakingHighlights({ articles }: { articles: any[] }) {
  const recent = (articles || [])
    .filter((a) => a?.publishedAt)
    .slice(0, 10);

  if (!recent.length) return null;

  return (
    <div className="breaking">
      <div className="breaking-track">
        {recent.map((a) => (
          <span key={a._id}>{a.title} • </span>
        ))}
      </div>
    </div>
  );
}