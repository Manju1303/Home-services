@echo off
echo ========================================
echo Home Services Platform - Setup & Run
echo ========================================
echo.

REM Navigate to backend
cd backend

echo [1/5] Updating database schema...
npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed. Make sure PostgreSQL is running.
    pause
    exit /b 1
)

echo [2/5] Running database migrations...
npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed. Check your DATABASE_URL in .env
    pause
    exit /b 1
)

echo [3/5] Seeding database with sample data...
npm run seed
if %errorlevel% neq 0 (
    echo ERROR: Database seeding failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete! Starting Servers...
echo ========================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo ========================================
echo.

REM Start backend in background
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Login credentials:
echo User: user@example.com / password123
echo Provider: provider1@example.com / password123
echo Admin: admin@homeservices.com / admin123
echo.
pause
