"use client";

export default function SponsoredStory() {
  return (
    <div
      style={{
        margin: "30px 0",
        padding: "20px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          color: "#9ca3af",
          marginBottom: "8px",
        }}
      >
        SPONSORED STORY
      </p>

      <h4 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        💡 How AI Is Transforming Indian Startups in 2026
      </h4>

      <p style={{ color: "#d1d5db" }}>
        Discover how emerging startups are leveraging artificial intelligence
        to scale faster than ever before.
      </p>
    </div>
  );
}