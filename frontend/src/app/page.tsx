"use client";
console.log("DEPLOY CHECK");
import { useState } from "react";
import NewsFeed from "../components/NewsFeed";
import SponsorBanner from "../components/SponsorBanner";
import SponsoredStory from "../components/SponsoredStory";

const CATEGORIES = [
  "home",
  "india",
  "business",
  "cinema",
  "sports",
  "technology",
  "startups",
  "jobs",
  "local",
  "world",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("home");

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px 20px",
      }}
    >
      {/* CATEGORY TABS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background:
                activeCategory === cat
                  ? "#f59e0b"
                  : "rgba(255,255,255,0.08)",
              color: activeCategory === cat ? "#000" : "#fff",
              fontWeight: "500",
              transition: "0.2s ease",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* HOME MONETIZATION BLOCK */}
      {activeCategory === "home" && (
        <>
          <SponsorBanner />
          <SponsoredStory />
        </>
      )}

      {/* CATEGORY FEEDS */}
      {CATEGORIES.map((cat) => (
        <NewsFeed
          key={cat}
          category={cat}
          isActive={activeCategory === cat}
        />
      ))}
    </div>
  );
}