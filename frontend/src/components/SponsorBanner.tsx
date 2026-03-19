"use client";

export default function SponsorBanner() {
  return (
    <div
      style={{
        width: "100%",
        margin: "40px 0",
        padding: "30px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #111827, #1f2937)",
        border: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          letterSpacing: "1px",
          color: "#9ca3af",
          marginBottom: "12px",
        }}
      >
        SPONSORED
      </p>

      <h3
        style={{
          fontSize: "1.3rem",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        🚀 Your Brand Here
      </h3>

      <p style={{ color: "#d1d5db", marginBottom: "18px" }}>
        Advertise with Bharat 24/7 and reach thousands of readers daily.
      </p>

      <button
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#f59e0b",
          color: "#000",
          fontWeight: "600",
        }}
      >
        Learn More
      </button>
    </div>
  );
}