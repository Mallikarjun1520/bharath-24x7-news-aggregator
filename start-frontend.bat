@echo off
cd frontend
echo Installing dependencies...
npm install
echo.
echo Starting frontend dev server on port 3000...
npm run dev
pause
