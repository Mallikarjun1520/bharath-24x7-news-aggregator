#!/usr/bin/env pwsh
Write-Host "Bharat 24/7 - Development Mode Startup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: Make sure MongoDB is running!" -ForegroundColor Yellow
Write-Host "You can start MongoDB using: mongod" -ForegroundColor Yellow
Write-Host ""

Write-Host "Opening 2 terminals..." -ForegroundColor Green
Write-Host "1. First terminal will run the BACKEND on port 5000" -ForegroundColor Green
Write-Host "2. Second terminal will run the FRONTEND on port 3000" -ForegroundColor Green
Write-Host ""
Write-Host "Waiting 3 seconds before starting..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

# Start backend in a new window
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"
Start-Sleep -Seconds 2

# Start frontend in a new window
Write-Host "Starting Frontend..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting in separate windows..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
