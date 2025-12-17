# Wonderfull Inn - Travel Package Booking Platform

A modern, full-featured travel package booking platform built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Features (All Implemented ✅)

1. **User Authentication** - Register, Login with Tourist and Travel Agent roles
2. **Package Management** - Agent: Full CRUD packages | Tourist: Browse and view packages
3. **Destination Catalog** - Browse destinations with photos, descriptions, and packages
4. **Booking System** - Tourist: Book packages (date, travelers), view all bookings
5. **Booking Management** - Agent: View and manage bookings (confirm/cancel)
6. **Reviews System** - Tourist: Write reviews after trip | View package ratings ⭐

### Additional Features

- ✅ Fully responsive design (desktop & mobile optimized)
- ✅ Real-time form validation with Zod
- ✅ Loading states and error handling
- ✅ Protected routes with role-based access
- ✅ 404 page and error boundary
- ✅ Success pages with auto-redirect
- ✅ Dashboard for both Tourist and Agent roles
- ✅ Search and filter functionality
- ✅ Toast notifications for user feedback

## 🛠️ Tech Stack

- **Framework:** React 19.2.1 + Vite 7.2.4
- **Language:** TypeScript 5.9.3
- **Routing:** React Router 7.9.6
- **State Management:** Zustand 5.0.9 with persist middleware
- **Styling:** Tailwind CSS 4.1.17
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Form Validation:** Zod 4.1.13
- **HTTP Client:** Axios 1.13.2
- **Animations:** Framer Motion 12.23.25
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Notifications:** Sonner
- **Security:** CryptoJS (SHA-256 password hashing)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── review-card.tsx
│   ├── review-form.tsx
│   ├── error-boundary.tsx
│   └── ...
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Tourist & Agent dashboards
│   ├── landing-page.tsx
│   ├── packages-page.tsx
│   ├── package-detail-page.tsx
│   ├── booking-page.tsx
│   ├── booking-success-page.tsx
│   ├── all-bookings-page.tsx
│   ├── manage-packages-page.tsx
│   ├── create-package-page.tsx
│   ├── edit-package-page.tsx
│   ├── about-page.tsx
│   ├── contact-page.tsx
│   ├── help-page.tsx
│   ├── profile-page.tsx
│   └── not-found-page.tsx
├── services/           # API service layer
│   ├── api.ts
│   ├── auth.service.ts
│   ├── package.service.ts
│   ├── booking.service.ts
│   ├── review.service.ts
│   └── destination.service.ts
├── store/              # Zustand stores
│   ├── auth-store.ts
│   ├── destination-store.ts
│   ├── booking-store.ts
│   └── review-store.ts
├── lib/                # Utility functions
│   ├── utils.ts
│   └── validations.ts  # Zod schemas
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Mock data
│   └── mock-data.ts
├── layout/             # Layout components
│   ├── main-layout.tsx
│   ├── dashboard-layout.tsx
│   └── mobile-layout.tsx
└── App.tsx             # Main app component with routing
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.2+
- Git

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd React-Vite-Frontend
```

2. Install dependencies

```bash
bun install
# or
npm install
```

3. Create environment file

```bash
cp .env.example .env
```

4. Update `.env` with your configuration

```env
# API Configuration
VITE_API_URL=http://localhost:6543

# App Configuration
VITE_APP_NAME=Wonderfull Inn
VITE_APP_VERSION=1.0.0

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
```

5. Run development server

```bash
bun run dev
# or
npm run dev
```

6. Open browser at `http://localhost:5173`

### Build for Production

```bash
bun run build
# or
npm run build
```

### Code Quality Scripts

```bash
# Lint code
bun run lint

# Auto-fix linting issues
bun run lint:fix

# Format code with Prettier
bun run format

# Check code formatting
bun run format:check
```

### Preview Production Build

```bash
bun run preview
# or
npm run preview
```

## 👥 Demo Accounts

### Tourist Account

- **Email:** tourist@demo.com
- **Password:** (any password works)
- **Role:** Tourist

### Agent Account

- **Email:** agent@demo.com
- **Password:** (any password works)
- **Role:** Agent

## 📝 Form Validation

All forms use Zod for real-time validation:

- **Sign Up:** Name (3+ chars), valid email, password (8+ chars with uppercase, lowercase, number), matching confirmation
- **Sign In:** Valid email, password (8+ chars)
- **Booking:** Future date, 1-20 travelers
- **Package:** Name (5+ chars), destination required, duration (1-30 days), price ($1-1M), itinerary (20+ chars), max travelers (1-50), at least 1 image URL
- **Review:** Rating (1-5 stars), comment (10-500 chars)
- **Contact:** Name (3+ chars), valid email, subject (5+ chars), message (20-1000 chars)

## 🎨 UI/UX Features

- **Responsive Design:** Mobile-first approach with bottom navigation for mobile
- **Consistent Theme:** Dark/Light mode support with custom color variables
- **Loading States:** Spinners, skeletons, and progress indicators
- **Error Handling:** User-friendly error messages and error boundary
- **Accessibility:** ARIA labels, keyboard navigation, focus management
- **Animations:** Smooth transitions with Framer Motion
- **Toast Notifications:** Success, error, and info messages with Sonner

## 🔐 Authentication & Authorization

- **Password Security:** SHA-256 hashing with CryptoJS for secure password storage
- **Role-based Access Control:** Tourist vs Agent with different permissions
- **Protected Routes:** Automatic redirects for unauthorized access
- **Session Management:** Persistent sessions with Zustand persist middleware
- **Demo Mode:** Accepts any credentials for development/testing purposes
- **Token Generation:** Secure random token generation for future API integration

## 📱 Mobile Optimization

- Bottom navigation for easy thumb access
- Reduced padding (px-1 to px-2) for maximum screen usage
- Touch-friendly button sizes
- Optimized forms for mobile input
- Responsive images and cards

## 🔄 State Management

- **Auth Store:** User authentication and session
- **Destination Store:** Destinations and packages with CRUD operations
- **Booking Store:** Tourist bookings with status management
- **Review Store:** Package reviews with rating calculation

## 📊 Key Pages

- **Landing Page:** Hero, featured packages, about section, newsletter
- **Packages:** Browse all packages with search and filters
- **Package Detail:** Full package info, itinerary, reviews, booking
- **Booking:** Date picker, traveler count, price calculation
- **Booking Success:** Confirmation with auto-redirect (3s countdown)
- **All Bookings:** Tourist view of all bookings with filters
- **Manage Packages:** Agent dashboard for package CRUD
- **Create/Edit Package:** Full forms with validation
- **Dashboards:** Role-specific dashboards with stats and quick actions
- **Profile:** User settings and preferences
- **About/Contact/Help:** Informational pages

## 🐛 Error Handling

- **Error Boundary:** Catches React errors and displays friendly UI
- **404 Page:** Custom not found page with navigation options
- **Form Validation:** Real-time field validation with error messages
- **API Errors:** Interceptor handles common HTTP errors
- **Loading States:** Prevents interaction during async operations

## 🌐 API Integration (Ready)

Services layer prepared for backend integration:

- Axios configured with interceptors
- Token management ready
- CORS handling in place
- Error handling implemented
- All service methods typed

### API Endpoints Documentation

#### Authentication Endpoints

```
POST /api/auth/register
- Body: { name, email, password, role }
- Response: { user, token }

POST /api/auth/login
- Body: { email, password, role }
- Response: { user, token }

POST /api/auth/logout
- Headers: Authorization: Bearer {token}
- Response: { message }
```

#### Package Endpoints

```
GET /api/packages
- Query: ?destination=&minPrice=&maxPrice=
- Response: [{ id, name, destination, price, ... }]

GET /api/packages/:id
- Response: { id, name, destination, price, itinerary, images, reviews, ... }

POST /api/packages (Agent only)
- Body: { name, destinationId, duration, price, itinerary, maxTravelers, images }
- Response: { package }

PUT /api/packages/:id (Agent only)
- Body: { name, duration, price, itinerary, ... }
- Response: { package }

DELETE /api/packages/:id (Agent only)
- Response: { message }
```

#### Booking Endpoints

```
GET /api/bookings (Tourist: own bookings, Agent: package bookings)
- Response: [{ id, packageId, travelDate, status, ... }]

POST /api/bookings (Tourist only)
- Body: { packageId, travelDate, travelersCount }
- Response: { booking }

PUT /api/bookings/:id/status (Agent only)
- Body: { status: "confirmed" | "cancelled" | "completed" }
- Response: { booking }
```

#### Review Endpoints

```
GET /api/reviews?packageId=:id
- Response: [{ id, touristId, rating, comment, createdAt }]

POST /api/reviews (Tourist only, after completed trip)
- Body: { packageId, bookingId, rating, comment }
- Response: { review }
```

#### Destination Endpoints

```
GET /api/destinations
- Response: [{ id, name, description, photoUrl, country }]

GET /api/destinations/:id
- Response: { id, name, description, photoUrl, packages }
```

## 📦 Deployment

### Frontend (Vercel)

**Deployment URL:** `https://[your-project-name].vercel.app`

Steps:

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables:
   ```
   VITE_API_URL=https://[your-backend].web.id
   ```
4. Deploy automatically on every push to main branch

### Backend (Domain .web.id)

**Backend URL:** `https://[kelompok-nama].web.id`

Requirements:

- Domain purchased from Niagahoster/Rumahweb (~Rp 15.000-25.000/year)
- Python Pyramid backend deployed
- PostgreSQL database configured
- SSL certificate enabled

### Environment Variables

```env
# Frontend (.env)
VITE_API_URL=https://your-backend-domain.web.id

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your-secret-key-here
CORS_ORIGIN=https://your-frontend.vercel.app
```

## 🤝 Contributing

This is a university project (UAS - Pengembangan Aplikasi Web). Team contributions only.

### Git Workflow

- Feature branches for new features
- Pull requests for code review
- Commit messages: `[Feature] Description` or `[Fix] Description`
- Minimum 30 commits from various team members

## 📸 Screenshots

### Landing Page

![Landing Page](docs/screenshots/landing.png)

### Package Browsing

![Packages](docs/screenshots/packages.png)

### Booking System

![Booking](docs/screenshots/booking.png)

### Agent Dashboard

![Agent Dashboard](docs/screenshots/agent-dashboard.png)

### Tourist Dashboard

![Tourist Dashboard](docs/screenshots/tourist-dashboard.png)

### Review System

![Reviews](docs/screenshots/reviews.png)

_Note: Screenshots will be added after final deployment_

## 👨‍💻 Team Members

**Kelompok [Nomor] - Travel Package Booking System (Digit 9)**

| No  | Nama Lengkap          | NIM   | Role                     | Kontribusi Utama                                                                                  |
| --- | --------------------- | ----- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| 1   | [Nama Team Leader]    | [NIM] | Team Leader & Full-Stack | Project coordination, frontend-backend integration, deployment, documentation, video presentation |
| 2   | [Nama Frontend Dev 1] | [NIM] | Frontend Developer       | UI/UX design, React components, state management, responsive design                               |
| 3   | [Nama Frontend Dev 2] | [NIM] | Frontend Developer       | Pages implementation, forms & validation, routing, error handling                                 |
| 4   | [Nama Backend Dev 1]  | [NIM] | Backend Developer        | API endpoints, authentication, security, password hashing                                         |
| 5   | [Nama Backend Dev 2]  | [NIM] | Backend & Database       | Business logic, database design, SQLAlchemy models, Alembic migrations                            |

### Pembagian Tugas Detail

- **Frontend (React + TypeScript):** Member 1, 2, 3
- **Backend (Python Pyramid):** Member 4, 5
- **Database (PostgreSQL):** Member 5
- **Deployment & Integration:** Member 1
- **Documentation & Video:** Member 1, 2

## 📄 License

This project is for educational purposes as part of IF25-22014 course at Institut Teknologi Sumatera.

## 🙏 Acknowledgments

- **Shadcn UI** for beautiful, accessible components
- **Radix UI** for accessible primitives
- **Lucide React** for comprehensive icon library
- **Unsplash** for high-quality travel images
- **React Community** for excellent documentation and resources
- **Dosen Pengampu:** M Habib Algifari, S.Kom., M.T.I.

## 📹 Video Presentation

**Duration:** 10 minutes maximum

**Content:**

1. Team introduction (30s)
2. Project overview and features (2min)
3. Live demo of all core features (5min)
4. Technical implementation highlights (1.5min)
5. Challenges and solutions (1min)
6. Q&A preparation (30s)

**Upload:** YouTube (Unlisted/Public) or Google Drive

**Link:** [Video Presentasi - Coming Soon]

---

## 📊 Project Status

### Completion Checklist

- ✅ User Authentication (Register/Login with password hashing)
- ✅ Package Management (Full CRUD by Agent)
- ✅ Destination Catalog (Browse with photos)
- ✅ Booking System (Book package with date/travelers)
- ✅ Booking Management (Confirm/Cancel by Agent)
- ✅ Review System (After completed trip)
- ✅ Responsive Design (Mobile & Desktop)
- ✅ SEO Optimization (Meta tags for all pages)
- ✅ Production Logger (Development-only console logs)
- ✅ Error Handling (Toast notifications)
- ✅ Code Quality (Prettier + ESLint + Husky)
- ✅ Performance (Lazy loading routes)

### Code Quality Improvements

- **Logger Utility:** Production-safe logging with environment detection
- **Environment Variables:** Properly configured with `.env.example`
- **Error Handling:** User-friendly toast notifications for all API errors
- **Pre-commit Hooks:** Husky + lint-staged for automatic code quality checks
- **Code Formatting:** Prettier with Tailwind CSS plugin
- **TypeScript:** Strict mode with deprecation fixes
- **Performance:** React.lazy() for route-based code splitting
- **Accessibility:** ARIA labels and semantic HTML

### Development Workflow

1. Code changes trigger pre-commit hook
2. Husky runs lint-staged automatically
3. ESLint fixes linting issues
4. Prettier formats code
5. Commit only if all checks pass

---

**Built with ❤️ by IF25-22014 Team for Institut Teknologi Sumatera**

- ✅ Form Validation (5+ forms with Zod)
- ✅ Protected Routes (Role-based access)
- ✅ State Management (Zustand with persist)
- ✅ Error Handling (Boundary & 404 page)
- 🔄 Frontend Deployment (Vercel - Pending)
- 🔄 Backend Development (Python Pyramid - In Progress)
- 🔄 Database Setup (PostgreSQL - In Progress)
- 🔄 Backend Deployment (.web.id - Pending)
- 🔄 Video Presentation (Pending)

---

**Deadline:** Jumat, 19 Desember 2025, 23:59:59 WIB

**Course:** IF25-22014 - Pengembangan Aplikasi Web

**Institution:** Institut Teknologi Sumatera

**Studi Kasus:** Digit 9 - Travel Package Booking Platform

---

_Last Updated: December 5, 2025_
