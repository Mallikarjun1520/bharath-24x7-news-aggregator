"use client";

import Fuse from "fuse.js";
import SearchBar from "./SearchBar";
import BreakingHighlights from "./BreakingHighlights";
import { useEffect, useRef, useState, useCallback } from "react";
import NewsCard, { Article } from "./NewsCard";
import LoaderSkeleton from "./LoaderSkeleton";

interface NewsFeedProps {
  category: string;
  isActive: boolean;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const PAGE_SIZE = 10;

export default function NewsFeed({ category, isActive }: NewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchPage = useCallback(
    async (pageNum: number) => {
      if (loading) return;

      setLoading(true);

      try {
        const res = await fetch(
          `${BACKEND_URL}/api/news/category/${category}?page=${pageNum}&limit=${PAGE_SIZE}`
        );

        const json = await res.json();
        const incoming: Article[] = json.data || [];

        if (incoming.length < PAGE_SIZE) setHasMore(false);

        setArticles((prev) =>
          pageNum === 1 ? incoming : [...prev, ...incoming]
        );
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [category, loading]
  );

  useEffect(() => {
    if (isActive && !initialized) {
      setInitialized(true);
      fetchPage(1);
    }
  }, [isActive, initialized]);

  if (!isActive) return null;
  if (initialLoading) return <LoaderSkeleton />;

  let filteredArticles = articles;

  if (query.trim()) {
    const fuse = new Fuse(articles, {
      keys: ["title", "summary", "content"],
      threshold: 0.4,
    });

    filteredArticles = fuse.search(query).map((r) => r.item);
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />

      <BreakingHighlights articles={filteredArticles} />

      {filteredArticles[0] && (
        <NewsCard article={filteredArticles[0]} index={0} isHero />
      )}

      <div>
        {filteredArticles.slice(1).map((article, i) => (
          <NewsCard key={article._id} article={article} index={i + 1} />
        ))}
      </div>
    </div>
  );
}