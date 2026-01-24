@echo off
echo ========================================
echo Home Services - Local Development
echo ========================================
echo.
echo Starting Backend on http://localhost:5000
echo Starting Frontend on http://localhost:3000
echo.
echo Press Ctrl+C to stop servers
echo ========================================
echo.

REM Start backend in new window
start "Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

REM Wait 2 seconds
timeout /t 2 /nobreak > nul

REM Start frontend in new window
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Login: user@example.com / password123
echo.
pause
