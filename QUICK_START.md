# 🚀 Quick Start Guide

## Automated Setup (Recommended)

### Option 1: PowerShell (Recommended)
```powershell
.\setup.ps1
```

### Option 2: Command Prompt
```cmd
setup.bat
```

Both scripts will:
- ✅ Create `.env` files with default values
- ✅ Install all dependencies (backend + frontend)
- ✅ Show you next steps

---

## Manual Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your PostgreSQL credentials
# Default: DATABASE_URL="postgresql://postgres:password@localhost:5432/homeservices"

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

**Backend runs on: http://localhost:5000**

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local (default values work for local development)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Start frontend server
npm run dev
```

**Frontend runs on: http://localhost:3000**

---

## ⚠️ Important: PostgreSQL Setup

Make sure PostgreSQL is installed and running:

1. **Windows:** Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. **After installation:**
   ```sql
   -- Create database
   CREATE DATABASE homeservices;
   ```
3. **Update `DATABASE_URL` in backend/.env** with your credentials

---

## 🔑 Test Credentials

After running `npm run seed`, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Customer** | user@example.com | password123 |
| **Provider** | provider1@example.com | password123 |
| **Admin** | admin@homeservices.com | admin123 |

---

## 💳 Razorpay Setup (Optional)

To test payments:

1. Sign up at [razorpay.com](https://razorpay.com) (FREE)
2. Dashboard → Settings → API Keys → **Generate Test Key**
3. Copy **Key ID** and **Key Secret**
4. Update:
   - `backend/.env` → `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
   - `frontend/.env.local` → `NEXT_PUBLIC_RAZORPAY_KEY_ID`

**Test Card:** 4111 1111 1111 1111 (CVV: any, Expiry: any future date)

---

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Database connection error
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in backend/.env
- Make sure database "homeservices" exists

### Port already in use
```bash
# Windows - kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Windows - kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma errors
```bash
cd backend
npx prisma generate
npx prisma migrate reset  # Warning: Deletes all data
npm run seed
```

---

## 📁 What You Have

✅ **Backend:** Complete REST API with 30+ endpoints  
✅ **Frontend:** Next.js with premium UI  
✅ **Database:** PostgreSQL with Prisma ORM  
✅ **Authentication:** JWT with role-based access  
✅ **Payments:** Razorpay integration (test mode)  
✅ **Documentation:** README, walkthrough, and setup guides  

---

## 🎯 Next Steps After Setup

1. **Test login** - Use test credentials above
2. **Browse services** - View available home services
3. **Test booking flow** - Create a booking as a user
4. **Test payment** - Use Razorpay test card
5. **Admin panel** - Login as admin to approve providers

---

**Need help? Check [README.md](./README.md) for detailed documentation!**
