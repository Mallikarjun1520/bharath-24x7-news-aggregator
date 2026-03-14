const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`[Server] Started on port ${PORT}`);
    console.log(`[Info] Visit http://localhost:${PORT}/api/health to test`);
});
