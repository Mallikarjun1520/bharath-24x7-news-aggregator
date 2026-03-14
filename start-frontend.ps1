#!/usr/bin/env pwsh
Set-Location "frontend"
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host ""
Write-Host "Starting frontend dev server on port 3000..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server"
Write-Host "Frontend will be available at: http://localhost:3000"
Write-Host ""

npm run dev
