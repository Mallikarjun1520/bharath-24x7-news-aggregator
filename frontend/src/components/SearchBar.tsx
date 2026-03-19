"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="search-container">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
}