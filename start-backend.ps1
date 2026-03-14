#!/usr/bin/env pwsh
Set-Location "backend"
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host ""
Write-Host "Building TypeScript..." -ForegroundColor Green
npm run build

Write-Host ""
Write-Host "Starting backend server on port 5000..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server"
Write-Host "Backend API will be available at: http://localhost:5000"
Write-Host ""

npm start
