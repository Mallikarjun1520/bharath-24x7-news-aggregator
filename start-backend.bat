@echo off
cd backend
echo Installing dependencies...
npm install
echo.
echo Building TypeScript...
npm run build
echo.
echo Starting backend server on port 5000...
npm start
pause
