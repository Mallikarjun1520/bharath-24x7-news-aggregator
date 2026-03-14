# GRAVNEWS INDIA - Bharath 24/7

Bharath 24/7 is an AI-powered anti-gravity news platform focused on Indian news aggregation. This futuristic platform features a dynamic float-based UI using Framer Motion.

## 🚀 Project Structure
- **/frontend**: Next.js 15, React, Tailwind CSS, Framer Motion
- **/backend**: Node.js, Express, Mongoose, node-cron

## 🛠 Local Setup - QUICK START

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally (optional - app works with mock data without it)

### Step-by-Step Setup

#### 1️⃣ Backend Setup
Open PowerShell or Command Prompt and run:
```bash
cd backend
npm install
npm run build
npm start
```

**Backend will start on:** `http://localhost:5000`

**To run in development mode with auto-reload:**
```bash
npm run dev
```

#### 2️⃣ Frontend Setup
Open a **NEW** PowerShell or Command Prompt and run:
```bash
cd frontend
npm install
npm run dev
```

**Frontend will start on:** `http://localhost:3000`

### 🚀 Quick Commands

**Start MongoDB (if you have it installed):**
```bash
mongod
```

**Verify Backend is Running:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{ "status": "ok", "message": "Bharat 24/7 API is running." }
```

### 📋 Environment Setup

The following `.env` files have been created for you:

**Backend** (`backend/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bharath247
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### ⚙️ Troubleshooting

#### Issue: "Connection refused on localhost:5000"
1. **Check if backend is running:** Open http://localhost:5000/api/health in browser
2. **Check if port 5000 is in use:** Run `netstat -ano | findstr :5000`
3. **Kill process on port 5000:**
   ```bash
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
4. **Restart backend:** `npm start` in backend folder

#### Issue: "Connection refused on localhost:3000"
1. **Check frontend process:** Is the frontend terminal showing output?
2. **Check if port 3000 is in use:** Run `netstat -ano | findstr :3000`
3. **Restart frontend:** `npm run dev` in frontend folder

#### Issue: MongoDB connection warning
- This is OK! The app works with mock data even without MongoDB
- If you want real database: Install MongoDB and run `mongod`
- MongoDB warning message will change to "✓ MongoDB connection SUCCESS"

#### Issue: "npm: command not found"
- Node.js or npm is not installed
- Download from: https://nodejs.org (LTS version recommended)
- Restart your terminal after installing

### 🎯 Expected Output

**Backend Console:**
```
[Server] Bharat 24/7 running on port 5000
[WS] WebSocket viewer tracking active at ws://localhost:5000/ws/viewers
⚠ MongoDB connection FAILED - Server running with mock data only
```

**Frontend Console:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Then open a browser and go to: **http://localhost:3000**

## 🌍 Deployment

### Deploying Frontend (Vercel)
1. Link your GitHub repository to Vercel.
2. Select the `frontend` directory as the Root Directory.
3. Vercel will automatically detect Next.js. Deploy!

### Deploying Backend (Render)
1. Link your GitHub repository to Render using a Web Service.
2. Select the `backend` directory.
3. The included `render.yaml` template covers build commands, but you can configure it manually in the Render UI.
4. Add the `MONGO_URI` and `JWT_SECRET` environment variables.

## 🧪 Advanced Features Mocked

- **AI Summarization**: Mock logic is in `backend/src/services/aiService.ts`. Connect this to Groq/OpenAI later.
- **NewsAPI**: Currently running using simulated fallback data so you can test the UI offline.

## 📚 API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/news/latest` - Get top news
- `GET /api/news/trending` - Get trending news
- `GET /api/news/category/:name` - Get news by category

### Authentication Required
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `GET /api/news/personalized` - Get personalized news

### Admin Only
- `POST /api/admin/fetch-news` - Admin fetch news
- `GET /api/admin/stats` - Get admin statistics
