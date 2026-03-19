"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Users,
  Database,
  LogOut,
  RefreshCw,
  Newspaper,
} from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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

interface Stats {
  activeViewers: number;
  totalPageViews: number;
  totalArticles: number;
  categoryCounts: Record<string, number>;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<Stats>({
    activeViewers: 0,
    totalPageViews: 0,
    totalArticles: 0,
    categoryCounts: {},
  });

  const [selectedCategory, setSelectedCategory] = useState("india");
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [loadingStats, setLoadingStats] = useState(true);

  // 🔥 Hydration-safe time string
  const [lastRefresh, setLastRefresh] = useState<string>("");

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("bharat247_admin_token")
      : null;

  // Redirect if not logged in
  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [router]);

  const fetchStats = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setStats(data);

      // ✅ Hydration-safe formatted time
      const formatted = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setLastRefresh(formatted);
    } catch {
      // keep last known stats
    } finally {
      setLoadingStats(false);
    }
  }, [router]);

  // Initial fetch + polling
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleFetchNews = async () => {
    setFetching(true);
    setFetchResult(null);
    const token = getToken();

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/fetch-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category: selectedCategory }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");

      setFetchResult({ type: "success", msg: data.message });
      fetchStats();
    } catch (err: any) {
      setFetchResult({
        type: "error",
        msg: err.message || "An error occurred",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bharat247_admin_token");
    router.replace("/admin/login");
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div className="admin-header">
        <h1 className="admin-title">Command Center</h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={fetchStats}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "0.82rem",
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              color: "#f87171",
              cursor: "pointer",
              fontSize: "0.82rem",
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stat-grid">
        <div className="stat-card glass-panel">
          <div className="stat-label">Live Viewers</div>
          <div className="stat-value" style={{ color: "#4ade80" }}>
            {loadingStats ? "—" : stats.activeViewers.toLocaleString()}
          </div>
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              marginTop: "10px",
            }}
          >
            Updated every 5s · {lastRefresh || "—"}
          </p>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-label">Total Sessions</div>
          <div className="stat-value" style={{ color: "#60a5fa" }}>
            {loadingStats ? "—" : stats.totalPageViews.toLocaleString()}
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-label">Total Articles</div>
          <div className="stat-value" style={{ color: "#f59e0b" }}>
            {loadingStats ? "—" : stats.totalArticles.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Fetch News */}
      <div className="admin-panel glass-panel">
        <div className="admin-panel-title">
          <Newspaper size={18} /> Fetch News
        </div>

        <select
          className="fetch-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <button
          className="fetch-btn"
          onClick={handleFetchNews}
          disabled={fetching}
        >
          {fetching ? "⏳ Fetching..." : "⚡ Fetch Now"}
        </button>

        {fetchResult && (
          <div className={`fetch-result ${fetchResult.type}`}>
            {fetchResult.type === "success" ? "✅" : "❌"} {fetchResult.msg}
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="admin-panel glass-panel">
        <div className="admin-panel-title">Category Breakdown</div>

        <table className="cat-count-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Articles</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <tr key={cat}>
                <td style={{ textTransform: "capitalize" }}>{cat}</td>
                <td>
                  {loadingStats
                    ? "—"
                    : stats.categoryCounts[cat] ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}