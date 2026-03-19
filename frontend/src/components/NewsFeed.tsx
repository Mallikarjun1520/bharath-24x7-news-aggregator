"use client";

import Fuse from "fuse.js";
import SearchBar from "./SearchBar";
import BreakingHighlights from "./BreakingHighlights";
import { useEffect, useRef, useState, useCallback } from "react";
import NewsCard from "./NewsCard";
import LoaderSkeleton from "./LoaderSkeleton";

/**
 * ✅ FIXED Article type (single source of truth here)
 */
interface Article {
  _id: string;
  title: string;
  summary?: string;
  content?: string;
  url: string;
  imageUrl?: string;
  sourceName?: string;
  tags?: string[];
  publishedAt: string; // ✅ CRITICAL FIX
}

interface NewsFeedProps {
  category: string;
  isActive: boolean;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const PAGE_SIZE = 10;

const getMockArticles = (category: string, page: number): Article[] => {
  return Array.from({ length: PAGE_SIZE }).map((_, i) => ({
    _id: `mock-${category}-p${page}-${i}`,
    title: `[Demo] ${
      category.charAt(0).toUpperCase() + category.slice(1)
    } News: Story ${(page - 1) * PAGE_SIZE + i + 1}`,
    summary:
      "Connect your backend to see live news. This is a placeholder article.",
    url: "#",
    imageUrl: "",
    sourceName: "Bharat 24/7",
    tags: [category],
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
  }));
};

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
          `${BACKEND_URL}/api/news/category/${category}?page=${pageNum}&limit=${PAGE_SIZE}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Backend error");

        const json = await res.json();
        const incoming: Article[] = Array.isArray(json)
          ? json
          : json.data || [];

        if (incoming.length < PAGE_SIZE) setHasMore(false);

        setArticles((prev) => {
          const combined =
            pageNum === 1 ? incoming : [...prev, ...incoming];

          // 🔥 Remove duplicates
          const uniqueMap = new Map();
          combined.forEach((article) => {
            uniqueMap.set(article._id, article);
          });

          return Array.from(uniqueMap.values());
        });
      } catch {
        if (pageNum === 1) {
          setArticles(getMockArticles(category, pageNum));
        } else {
          setHasMore(false);
        }
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
  }, [isActive, initialized, fetchPage]);

  useEffect(() => {
    if (!initialized) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPage(nextPage);
        }
      },
      { rootMargin: "200px" }
    );

    observerRef.current.observe(sentinel);

    return () => observerRef.current?.disconnect();
  }, [initialized, hasMore, loading, page, fetchPage]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    setInitialized(false);
    setQuery("");
  }, [category]);

  if (!isActive) return null;
  if (initialLoading) return <LoaderSkeleton />;

  // 🔎 SEARCH
  let filteredArticles = articles;

  if (query.trim() !== "") {
    const fuse = new Fuse(articles, {
      keys: ["title", "summary", "content"],
      threshold: 0.4,
      includeScore: true,
    });

    filteredArticles = fuse.search(query).map((r) => r.item);
  }

  return (
    <div className="news-feed-container">
      <SearchBar query={query} setQuery={setQuery} />

      {filteredArticles.length === 0 ? (
        <div className="no-news">
          <p>🔍 No matching articles found.</p>
        </div>
      ) : (
        <>
          <BreakingHighlights articles={filteredArticles} />

          {filteredArticles[0] && (
            <div className="hero-wrapper">
              <NewsCard article={filteredArticles[0]} />
            </div>
          )}

          <div className="news-grid">
            {filteredArticles.slice(1).map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}

      <div ref={sentinelRef} className="sentinel" />

      {loading && !initialLoading && (
        <div className="loading-more">
          <div className="spinner-small" />
          <span>Loading more...</span>
        </div>
      )}

      {!hasMore && filteredArticles.length > 0 && (
        <p className="end-of-feed">— You're all caught up —</p>
      )}
    </div>
  );
}