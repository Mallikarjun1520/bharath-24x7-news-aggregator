"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const axios_1 = __importDefault(require("axios"));
const ws_1 = require("ws");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const news_1 = __importDefault(require("./routes/news"));
const admin_1 = __importDefault(require("./routes/admin"));
const newsCron_1 = require("./jobs/newsCron");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Global viewer tracking
global.activeViewers = 0;
global.totalPageViews = 0;
// Connect DB
(0, db_1.default)();
// Start cron
(0, newsCron_1.startNewsCron)();
// Rate limiter
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/', apiLimiter);
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/news', news_1.default);
app.use('/api/admin', admin_1.default);
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
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send('Missing image URL');
        }
        const response = await axios_1.default.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: {
                // Some sites require user-agent
                'User-Agent': 'Mozilla/5.0',
            },
        });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    }
    catch (error) {
        console.error('Image proxy failed:', error);
        res.status(500).send('Image fetch failed');
    }
});
// WebSocket viewer tracking
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server, path: '/ws/viewers' });
wss.on('connection', (ws) => {
    global.activeViewers++;
    global.totalPageViews++;
    console.log(`[WS] Viewer connected. Active: ${global.activeViewers}`);
    ws.on('close', () => {
        global.activeViewers = Math.max(0, global.activeViewers - 1);
        console.log(`[WS] Viewer disconnected. Active: ${global.activeViewers}`);
    });
    ws.on('error', () => {
        global.activeViewers = Math.max(0, global.activeViewers - 1);
    });
});
// Start server
server.listen(port, () => {
    console.log(`[Server] Bharat 24/7 running on port ${port}`);
    console.log(`[WS] WebSocket viewer tracking active at ws://localhost:${port}/ws/viewers`);
});
