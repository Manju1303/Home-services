@echo off
echo Setting up Home Services Booking Platform...

echo.
echo Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating .env file...
    (
        echo DATABASE_URL="postgresql://postgres:password@localhost:5432/homeservices"
        echo JWT_SECRET="homeservices-jwt-secret-key-change-in-production-123456"
        echo JWT_REFRESH_SECRET="homeservices-refresh-secret-key-change-in-production-123456"
        echo RAZORPAY_KEY_ID="rzp_test_your_key_id_here"
        echo RAZORPAY_KEY_SECRET="your_razorpay_secret_here"
        echo PORT=5000
        echo NODE_ENV="development"
    ) > .env
    echo .env file created
)

echo Installing backend dependencies...
call npm install

cd ..

echo.
echo Setting up Frontend...
cd frontend

if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
        echo NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
    ) > .env.local
    echo .env.local file created
)

echo Installing frontend dependencies...
call npm install

cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Update .env file in backend folder with your PostgreSQL credentials
echo 2. Run: cd backend
echo 3. Run: npx prisma migrate dev
echo 4. Run: npm run seed
echo 5. Run: npm run dev (to start backend)
echo 6. In a new terminal: cd frontend ^&^& npm run dev

pause
