import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import ViewerTracker from '@/components/ViewerTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bharat 24/7 – Live News',
  description: 'India\'s modern category-based news platform. Sports, Politics, Business, Tech and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-white bg-black`}>
        {/* Silent viewer tracker — opens WebSocket for live count */}
        <ViewerTracker />
        {/* Ambient Background */}
        <div className="animated-bg">
          <div className="ambient-blob blob-1" />
          <div className="ambient-blob blob-2" />
          <div className="ambient-blob blob-3" />
        </div>

        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="brand-text">BHARAT</span>
            <span className="brand-separator"> </span>
            <span className="brand-text brand-accent">24/7</span>
          </div>
          <div className="navbar-actions">
            <Link href="/admin" className="admin-link" title="Admin Panel">
              <ShieldCheck size={18} />
              <span className="admin-link-label">Admin</span>
            </Link>
          </div>
        </nav>

        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
