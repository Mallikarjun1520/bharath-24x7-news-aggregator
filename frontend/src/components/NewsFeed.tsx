"use client";

import Fuse from "fuse.js";
import SearchBar from "./SearchBar";
import BreakingHighlights from "./BreakingHighlights";
import { useEffect, useRef, useState, useCallback } from "react";
import NewsCard from "./NewsCard";
import LoaderSkeleton from "./LoaderSkeleton";

interface Article {
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

interface NewsFeedProps {
  category: string;
  isActive: boolean;
}

/**
 * 🚨 HARD FIX — NO ENV
 */
const BACKEND_URL =
  "https://bharath-24x7-news-aggregator.onrender.com";

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
          `${BACKEND_URL}/api/news/category/${category}?page=${pageNum}&limit=${PAGE_SIZE}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Backend error");

        const json = await res.json();
        const incoming: Article[] = json.data || [];

        if (incoming.length < PAGE_SIZE) setHasMore(false);

        setArticles((prev) => {
          const combined =
            pageNum === 1 ? incoming : [...prev, ...incoming];

          const uniqueMap = new Map();
          combined.forEach((a) => uniqueMap.set(a._id, a));

          return Array.from(uniqueMap.values());
        });
      } catch (err) {
        console.error("Fetch failed:", err);
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

  let filteredArticles = articles;

  if (query.trim() !== "") {
    const fuse = new Fuse(articles, {
      keys: ["title", "summary", "content"],
      threshold: 0.4,
    });

    filteredArticles = fuse.search(query).map((r) => r.item);
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />

      {filteredArticles.length === 0 ? (
        <p>No news available</p>
      ) : (
        <>
          <BreakingHighlights articles={filteredArticles} />

          {filteredArticles[0] && (
            <NewsCard article={filteredArticles[0]} />
          )}

          {filteredArticles.slice(1).map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </>
      )}

      <div ref={sentinelRef} />

      {loading && <p>Loading...</p>}
    </div>
  );
}