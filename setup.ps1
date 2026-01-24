# Setup Script for Home Services Platform

Write-Host "🚀 Setting up Home Services Booking Platform..." -ForegroundColor Cyan

# Backend Setup
Write-Host "`n📦 Setting up Backend..." -ForegroundColor Yellow
Set-Location "d:\Home services\backend"

# Create .env if it doesn't exist
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Green
    @"
DATABASE_URL="postgresql://postgres:password@localhost:5432/homeservices"
JWT_SECRET="homeservices-jwt-secret-key-change-in-production-123456"
JWT_REFRESH_SECRET="homeservices-refresh-secret-key-change-in-production-123456"
RAZORPAY_KEY_ID="rzp_test_your_key_id_here"
RAZORPAY_KEY_SECRET="your_razorpay_secret_here"
PORT=5000
NODE_ENV="development"
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ .env file created" -ForegroundColor Green
}

Write-Host "Installing backend dependencies..." -ForegroundColor Green
npm install

# Frontend Setup
Write-Host "`n📦 Setting up Frontend..." -ForegroundColor Yellow
Set-Location "../frontend"

# Create .env.local if it doesn't exist
if (!(Test-Path ".env.local")) {
    Write-Host "Creating .env.local file..." -ForegroundColor Green
    @"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ .env.local file created" -ForegroundColor Green
}

Write-Host "Installing frontend dependencies..." -ForegroundColor Green
npm install

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Update .env file in backend folder with your PostgreSQL credentials" -ForegroundColor White
Write-Host "2. Run: cd backend" -ForegroundColor White
Write-Host "3. Run: npx prisma migrate dev" -ForegroundColor White
Write-Host "4. Run: npm run seed" -ForegroundColor White
Write-Host "5. Run: npm run dev (to start backend)" -ForegroundColor White
Write-Host "6. In a new terminal, cd frontend && npm run dev" -ForegroundColor White

Set-Location "d:\Home services"
