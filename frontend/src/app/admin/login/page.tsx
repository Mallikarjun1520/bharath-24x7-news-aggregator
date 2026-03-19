"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');
            if (data.role !== 'admin') throw new Error('Access denied. Admin account required.');

            localStorage.setItem('bharat247_admin_token', data.token);
            router.replace('/admin');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box glass-panel">
                <div className="login-logo">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{ padding: '12px', background: 'rgba(255,140,0,0.12)', borderRadius: '14px', color: 'var(--accent-saffron)' }}>
                            <ShieldCheck size={32} />
                        </div>
                    </div>
                    <h1>BHARAT 24/7</h1>
                    <p>Admin Login — Restricted Access</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@bharat247.in"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In as Admin'}
                    </button>
                    {error && <p className="login-error">{error}</p>}
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    This page is for administrators only. Viewers can read news without logging in.
                </p>
            </div>
        </div>
    );
}
