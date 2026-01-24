@echo off
echo ========================================
echo Starting Home Services Platform
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak > nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
echo Login: user@example.com / password123
echo.
pause
