#!/usr/bin/env pwsh

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Bharat 24/7 - Development Launcher  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$projectPath = Get-Location

Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Green
Push-Location "$projectPath/backend"
npm install
Pop-Location

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Green
Push-Location "$projectPath/frontend"
npm install
Pop-Location

Write-Host ""
Write-Host "✅ Dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting servers in separate windows..." -ForegroundColor Yellow
Write-Host ""

Write-Host "🔧 Starting Backend Server (port 5000)..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", @"
cd '$projectPath/backend'
Write-Host 'Backend server starting...' -ForegroundColor Green
npm run dev
"@

Start-Sleep -Seconds 3

Write-Host "🎨 Starting Frontend Server (port 3000)..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", @"
cd '$projectPath/frontend'
Write-Host 'Frontend server starting...' -ForegroundColor Green
npm run dev
"@

Write-Host ""
Write-Host "✨ Both servers are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: " -ForegroundColor Cyan -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host "🔌 Backend:  " -ForegroundColor Cyan -NoNewline
Write-Host "http://localhost:5000/api/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C in each terminal to stop the servers" -ForegroundColor DarkGray
Write-Host ""
