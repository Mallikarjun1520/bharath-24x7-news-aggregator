"use client";

import { useRef, useEffect } from 'react';

const CATEGORIES = [
    { id: 'home', label: '🏠 Home' },
    { id: 'india', label: '🇮🇳 India' },
    { id: 'business', label: '💼 Business' },
    { id: 'cinema', label: '🎬 Cinema' },
    { id: 'sports', label: '🏏 Sports' },
    { id: 'technology', label: '💻 Technology' },
    { id: 'startups', label: '🚀 Startups' },
    { id: 'jobs', label: '📋 Jobs' },
    { id: 'local', label: '📍 Local' },
    { id: 'world', label: '🌍 World' },
];

interface CategoryBarProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    // Auto-scroll active tab into center view
    useEffect(() => {
        if (activeTabRef.current && barRef.current) {
            const bar = barRef.current;
            const tab = activeTabRef.current;
            const tabLeft = tab.offsetLeft;
            const tabWidth = tab.offsetWidth;
            const barWidth = bar.offsetWidth;
            const scrollTo = tabLeft - barWidth / 2 + tabWidth / 2;
            bar.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }, [activeCategory]);

    return (
        <div className="category-bar-wrapper">
            <div className="category-bar" ref={barRef}>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        id={`cat-tab-${cat.id}`}
                        ref={cat.id === activeCategory ? activeTabRef : null}
                        className={`category-tab${cat.id === activeCategory ? ' active' : ''}`}
                        onClick={() => onCategoryChange(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export { CATEGORIES };
