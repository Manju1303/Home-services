# 🏠 Home Services Booking Platform

A full-stack web application for booking home services (maid, cooking, electrician, plumbing, cleaning) on an hourly basis with secure payment integration.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (React + TypeScript)
- **Styling:** Tailwind CSS (Premium UI with glassmorphism)
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js + Express.js (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Access + Refresh Tokens)
- **Payment:** Razorpay (FREE Test Mode)

## 📁 Project Structure

```
d:\Home services\
├── backend/
│   ├── prisma/
│   │   └──schema.prisma         # Database schema
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth middleware
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helper functions
│   │   └── server.ts            # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── app/                     # Next.js pages
    ├── components/              # React components
    ├── lib/                     # API client
    ├── store/                   # Zustand stores
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL installed and running
- npm or yarn

### 1. Clone & Navigate
```bash
cd "d:\Home services"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
copy .env.example .env

# Edit .env file and configure:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET and JWT_REFRESH_SECRET
# - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (get free test keys from razorpay.com)
```

**PostgreSQL Database Setup:**
```bash
# Create database
psql -U postgres
CREATE DATABASE homeservices;
\q

# Update DATABASE_URL in .env:
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/homeservices"
```

**Prisma Setup:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data
npm run seed
```

**Start Backend:**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

**Start Frontend:**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔑 Test Credentials

After seeding the database, you can login with:

| Role | Email | Password |
|------|-------|----------|
| **Customer** | user@example.com | password123 |
| **Provider** | provider1@example.com | password123 |
| **Admin** | admin@homeservices.com | admin123 |

## 💳 Payment Integration (Razorpay Test Mode)

### Get FREE Test API Keys:

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys**
3. Click **Generate Test Key**
4. Copy **Key ID** and **Key Secret**
5. Update in `.env` (backend) and `.env.local` (frontend)

### Test Payment:

Use Razorpay test cards (no real money):
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date

## 📱 Features

### User Features
- ✅ Browse and filter home services
- ✅ Book services with hourly rates
- ✅ Secure payment via Razorpay
- ✅ View booking history
- ✅ Submit reviews and ratings

### Provider Features
- ✅ Create provider profile
- ✅ Set hourly rates and availability
- ✅ View assigned bookings
- ✅ Track earnings
- ✅ Manage schedule

### Admin Features
- ✅ Approve provider registrations
- ✅ Manage services (CRUD)
- ✅ Monitor all bookings
- ✅ View analytics and revenue
- ✅ User management

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User/Provider registration
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Service details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings (role-based)
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Providers
- `GET /api/providers` - List approved providers
- `PUT /api/providers/availability` - Update availability
- `GET /api/providers/dashboard/stats` - Provider stats

### Admin
- `GET /api/admin/providers/pending` - Pending approvals
- `PUT /api/admin/providers/:id/approve` - Approve provider
- `GET /api/admin/analytics` - Platform analytics

## 🎨 UI Features

- ✨ **Premium Design:** Glassmorphism effects
- 🌈 **Gradient Themes:** Vibrant color palette
- 🎭 **Smooth Animations:** Fade-in, slide-up effects
- 📱 **Responsive:** Mobile-first design
- 🔒 **Secure:** JWT authentication
- ⚡ **Fast:** Optimized API calls

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
services.msc  # Windows
# Verify DATABASE_URL in .env
```

### Port Already in Use
```bash
# Backend (port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Errors
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

## 📚 Next Steps

1. **Deployment:**
   - Frontend: Deploy to Vercel
   - Backend: Deploy to Railway or Render
   - Database: Use Supabase or AWS RDS

2. **Enhancements:**
   - Real-time notifications (WebSocket)
   - Chat system between user and provider
   - Location-based provider search (Google Maps)
   - AI-powered provider recommendations
   - Subscription plans

## 📄 License

MIT License - Free for academic and personal use

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Check browser console for errors

---

**Built with ❤️ for Final Year Project**
