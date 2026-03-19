export default function LoaderSkeleton() {
    return (
        <div className="news-grid">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-image shimmer" />
                    <div className="skeleton-body">
                        <div className="skeleton-line shimmer wide" />
                        <div className="skeleton-line shimmer" />
                        <div className="skeleton-line shimmer short" />
                        <div className="skeleton-footer shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
}
