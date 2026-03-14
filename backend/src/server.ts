import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import axios from 'axios';
import { WebSocketServer } from 'ws';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import newsRoutes from './routes/news';
import adminRoutes from './routes/admin';
import { startNewsCron } from './jobs/newsCron';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Global viewer tracking
(global as any).activeViewers = 0;
(global as any).totalPageViews = 0;

// Connect DB
connectDB();

// Start cron
startNewsCron();

// Rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bharat 24/7 API is running.' });
});



/**
 * 🔥 IMAGE PROXY ROUTE
 * Prevents hotlink blocking from external news sites
 */
app.get('/api/image', async (req, res) => {
    try {
        const imageUrl = req.query.url as string;

        if (!imageUrl) {
            return res.status(400).send('Missing image URL');
        }

        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: {
                // Some sites require user-agent
                'User-Agent': 'Mozilla/5.0',
            },
        });

        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);

    } catch (error) {
        console.error('Image proxy failed:', error);
        res.status(500).send('Image fetch failed');
    }
});



// WebSocket viewer tracking
const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/ws/viewers' });

wss.on('connection', (ws) => {
    (global as any).activeViewers++;
    (global as any).totalPageViews++;

    console.log(`[WS] Viewer connected. Active: ${(global as any).activeViewers}`);

    ws.on('close', () => {
        (global as any).activeViewers = Math.max(
            0,
            (global as any).activeViewers - 1
        );
        console.log(`[WS] Viewer disconnected. Active: ${(global as any).activeViewers}`);
    });

    ws.on('error', () => {
        (global as any).activeViewers = Math.max(
            0,
            (global as any).activeViewers - 1
        );
    });
});

// Start server
server.listen(port, () => {
    console.log(`[Server] Bharat 24/7 running on port ${port}`);
    console.log(`[WS] WebSocket viewer tracking active at ws://localhost:${port}/ws/viewers`);
});