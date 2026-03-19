"use client";

import { useEffect } from 'react';

const WS_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
    .replace(/^http/, 'ws') + '/ws/viewers';

/**
 * Silently opens a WebSocket connection to the backend so every
 * browser tab is counted as a live viewer. Reconnects on disconnect.
 */
export default function ViewerTracker() {
    useEffect(() => {
        let ws: WebSocket | null = null;
        let reconnectTimer: ReturnType<typeof setTimeout>;

        const connect = () => {
            try {
                ws = new WebSocket(WS_URL);
                ws.onopen = () => console.log('[WS] Viewer connected');
                ws.onclose = () => {
                    reconnectTimer = setTimeout(connect, 5000); // Reconnect after 5s
                };
                ws.onerror = () => ws?.close();
            } catch {
                reconnectTimer = setTimeout(connect, 5000);
            }
        };

        connect();

        return () => {
            clearTimeout(reconnectTimer);
            ws?.close();
        };
    }, []);

    return null; // Renders nothing visible
}
