@echo off
title Vitalis Health App - Localhost Launcher
color 0A
echo ========================================================
echo    Starting Vitalis Modern Health Tracking App...
echo ========================================================
echo.
echo Opening browser at http://localhost:5173/ ...
start http://localhost:5173/
echo.
echo Starting Vite Local Development Server...
cd /d "%~dp0app"
npm run dev
pause
