# SUMMARY FRONTEND - Travel Booking Web App

## 📋 Overview

Frontend aplikasi Travel Booking menggunakan **React 19** dengan **Vite** sebagai build tool. Aplikasi ini merupakan SPA (Single Page Application) yang menyediakan interface untuk tourist dan agent dalam mengelola paket wisata, booking, pembayaran, dan review.

---

## 🛠️ Tech Stack

| Technology       | Version  | Purpose                |
| ---------------- | -------- | ---------------------- |
| React            | 19.2.3   | UI Library             |
| Vite             | 7.2.4    | Build Tool             |
| React Router DOM | 7.9.6    | Client-side Routing    |
| Zustand          | 5.0.9    | State Management       |
| Axios            | 1.13.2   | HTTP Client            |
| TailwindCSS      | 4.1.17   | CSS Framework          |
| Radix UI         | Various  | Headless UI Components |
| React Hook Form  | 7.67.0   | Form Handling          |
| Zod              | 4.1.13   | Schema Validation      |
| Framer Motion    | 12.23.25 | Animations             |
| Recharts         | 2.15.4   | Charts/Analytics       |
| Sonner           | 2.0.7    | Toast Notifications    |
| date-fns         | 4.1.0    | Date Formatting        |
| Lucide React     | 0.555.0  | Icons                  |

---

## 📁 Struktur Project

```
frontend/
├── index.html                 # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
├── eslint.config.js          # ESLint rules
├── components.json           # shadcn/ui config
├── public/                   # Static assets
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main router & routes
│   ├── app-root.jsx         # App wrapper with providers
│   ├── index.css            # Global styles (Tailwind)
│   ├── components/
│   │   ├── ui/              # Reusable UI components (shadcn)
│   │   ├── navbar.jsx       # Navigation bar
│   │   ├── footer.jsx       # Footer
│   │   ├── hero.jsx         # Hero section
│   │   ├── package-card-skeleton.jsx
│   │   ├── package-form.jsx # Create/Edit package form
│   │   ├── payment-upload.jsx
│   │   ├── payment-verification.jsx
│   │   ├── review-form.jsx
│   │   ├── review-card.jsx
│   │   ├── star-rating.jsx
│   │   ├── protected-route.jsx
│   │   ├── error-boundary.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── landing-page.jsx
│   │   ├── packages-page.jsx
│   │   ├── package-detail-page.jsx
│   │   ├── destinations-page.jsx
│   │   ├── booking-page.jsx
│   │   ├── booking-success-page.jsx
│   │   ├── all-bookings-page.jsx
│   │   ├── manage-packages-page.jsx
│   │   ├── create-package-page.jsx
│   │   ├── edit-package-page.jsx
│   │   ├── create-destination-page.jsx
│   │   ├── profile-page.jsx
│   │   ├── wishlist-page.jsx
│   │   ├── about-page.jsx
│   │   ├── contact-page.jsx
│   │   ├── help-page.jsx
│   │   ├── not-found-page.jsx
│   │   ├── auth/
│   │   │   ├── sign-in.jsx
│   │   │   └── sign-up.jsx
│   │   └── dashboard/
│   │       ├── tourist-dashboard.jsx
│   │       └── agent-dashboard.jsx
│   ├── services/             # API service layer
│   │   ├── api.js           # Axios instance & interceptors
│   │   ├── auth.service.js
│   │   ├── package.service.js
│   │   ├── booking.service.js
│   │   ├── destination.service.js
│   │   ├── review.service.js
│   │   ├── payment.service.js
│   │   ├── qris.service.js
│   │   └── analytics.service.js
│   ├── store/                # Zustand stores
│   │   ├── auth-store.js
│   │   ├── booking-store.js
│   │   ├── destination-store.js
│   │   ├── review-store.js
│   │   └── wishlist-store.js
│   ├── hooks/                # Custom hooks
│   │   ├── use-async.js
│   │   ├── use-auth-guard.js
│   │   ├── use-debounce.js
│   │   ├── use-file-array.js
│   │   ├── use-form-validation.js
│   │   ├── use-image-array.js
│   │   ├── use-mobile.js
│   │   ├── use-seo.js
│   │   └── use-url-params.js
│   ├── layout/
│   │   ├── main-layout.jsx  # Main layout with navbar/footer
│   │   ├── dashboard-layout.jsx
│   │   └── mobile-layout.jsx
│   ├── lib/
│   │   ├── utils.js         # Utility functions (cn, etc)
│   │   ├── constants.js     # App constants
│   │   ├── validations.js   # Zod schemas
│   │   ├── formatters.js    # Date/currency formatters
│   │   ├── auth-storage.js  # Auth token management
│   │   ├── booking-utils.jsx
│   │   ├── crypto.js
│   │   ├── image-utils.js
│   │   └── logger.js
│   ├── data/                 # Static data
│   └── types/                # Type definitions (JSDoc)
└── tools/                    # Build/conversion tools
```

---

## 🔐 Authentication System

### Auth Store (`auth-store.js`)

```javascript
// Zustand store with persistence
{
  user: null,           // { id, name, email, role }
  isAuthenticated: false,
  isLoading: false,

  // Actions
  login(userData),      // Set user & authenticated
  logout(),             // Clear all auth data
  register(userData),   // Set user & authenticated
  setLoading(bool),
  setUser(userData),
}
```

### Token Management (`auth-storage.js`)

```javascript
// LocalStorage keys
- auth-storage: Zustand persisted state
- token: JWT token

// Functions
getAuthToken()         // Get token from localStorage
clearAuthStorage()     // Clear all auth data
```

### Protected Route (`protected-route.jsx`)

```jsx
<ProtectedRoute allowedRoles={["agent"]}>
  <AgentOnlyPage />
</ProtectedRoute>
```

---

## 🌐 API Service Layer

### Base Configuration (`api.js`)

```javascript
const apiClient = axios.create({
  baseURL: API_BASE_URL,  // http://localhost:6543
  timeout: 10000,         // 10 seconds
});

// Request Interceptor: Add Bearer token
// Response Interceptor: Handle errors globally
- 401: Clear auth & redirect to login
- 403: Show forbidden error
- 404: Show not found
- 5xx: Show server error
```

### Service Pattern

```javascript
// Contoh: package.service.js
export const getAllPackages = async (filters) => {
  const response = await apiClient.get("/api/packages", { params });
  return response.data;
};

export const createPackage = async (data) => {
  // FormData for file upload
  const formData = new FormData();
  // ... append fields
  const response = await apiClient.post("/api/packages", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
```

---

## 🛣️ Routing

### Public Routes

| Path            | Page              | Description         |
| --------------- | ----------------- | ------------------- |
| `/`             | LandingPage       | Homepage            |
| `/packages`     | PackagesPage      | Browse packages     |
| `/packages/:id` | PackageDetailPage | Package detail      |
| `/destinations` | DestinationsPage  | Browse destinations |
| `/about`        | AboutPage         | About us            |
| `/contact`      | ContactPage       | Contact info        |
| `/help`         | HelpPage          | Help/FAQ            |
| `/sign-in`      | SignIn            | Login page          |
| `/sign-up`      | SignUp            | Register page       |

### Protected Routes (Authenticated)

| Path               | Page               | Roles   | Description          |
| ------------------ | ------------------ | ------- | -------------------- |
| `/dashboard`       | Dashboard          | All     | Role-based dashboard |
| `/profile`         | ProfilePage        | All     | User profile         |
| `/book/:id`        | BookingPage        | Tourist | Book a package       |
| `/booking-success` | BookingSuccessPage | Tourist | Booking confirmation |
| `/all-bookings`    | AllBookingsPage    | All     | View bookings        |
| `/wishlist`        | WishlistPage       | All     | Saved packages       |

### Agent-Only Routes

| Path                  | Page                  | Description         |
| --------------------- | --------------------- | ------------------- |
| `/manage-packages`    | ManagePackagesPage    | Manage own packages |
| `/create-package`     | CreatePackagePage     | Create new package  |
| `/edit-package/:id`   | EditPackagePage       | Edit package        |
| `/create-destination` | CreateDestinationPage | Create destination  |
| `/agent/dashboard`    | AgentDashboard        | Agent analytics     |

---

## 📦 State Management (Zustand)

### Auth Store (`auth-store.js`)

```javascript
// Persisted to localStorage
{
  user: { id, name, email, role } | null,
  isAuthenticated: boolean,
  isLoading: boolean,
}
```

### Booking Store (`booking-store.js`)

```javascript
// Manage booking state & operations
```

### Destination Store (`destination-store.js`)

```javascript
// Cache destinations data
```

### Wishlist Store (`wishlist-store.js`)

```javascript
// Save favorite packages locally
```

### Review Store (`review-store.js`)

```javascript
// Manage reviews state
```

---

## 🎨 UI Components

### Design System

- **Component Library**: shadcn/ui (Radix UI based)
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Core UI Components (`components/ui/`)

- Button, Input, Label, Textarea
- Dialog, AlertDialog, Sheet
- Card, Accordion, Tabs
- Select, Checkbox, Radio
- DatePicker (react-day-picker)
- Carousel (embla-carousel)
- Toast (sonner)
- Skeleton loaders
- Form components
- Navigation components
- Data display components

### Custom Components

| Component             | Description                     |
| --------------------- | ------------------------------- |
| `Navbar`              | Main navigation with auth state |
| `Footer`              | Site footer                     |
| `Hero`                | Landing page hero section       |
| `MenuDock`            | Mobile bottom navigation        |
| `PackageCard`         | Package card display            |
| `PackageForm`         | Create/Edit package form        |
| `ReviewForm`          | Submit review form              |
| `ReviewCard`          | Display single review           |
| `StarRating`          | Interactive/Display star rating |
| `PaymentUpload`       | Upload payment proof            |
| `PaymentVerification` | Verify payment (Agent)          |
| `ProtectedRoute`      | Route guard component           |
| `ErrorBoundary`       | Error boundary wrapper          |

---

## 🪝 Custom Hooks

| Hook                | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `useAsync`          | Handle async operations with loading/error |
| `useAuthGuard`      | Protect routes & check auth                |
| `useDebounce`       | Debounce value changes                     |
| `useFileArray`      | Manage file uploads array                  |
| `useFormValidation` | Form validation with Zod                   |
| `useImageArray`     | Manage image uploads                       |
| `useMobile`         | Detect mobile viewport                     |
| `useSeo`            | Set page title/meta                        |
| `useUrlParams`      | Parse URL query params                     |

---

## 📐 Layout System

### MainLayout (`main-layout.jsx`)

```jsx
// Desktop: Navbar + Content + Footer
// Mobile: Content + Bottom Dock Menu
<MainLayout>{children}</MainLayout>
```

### Responsive Design

- **Mobile First**: TailwindCSS responsive utilities
- **Breakpoints**: Default Tailwind breakpoints
- **Mobile Menu**: Bottom dock navigation

---

## 🔧 Configuration

### Constants (`lib/constants.js`)

```javascript
// Routes
ROUTES = {
  HOME: "/",
  PACKAGES: "/packages",
  // ...
};

// Validation Rules
VALIDATION_RULES = {
  NAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 8,
  COMMENT_MIN_LENGTH: 10,
  COMMENT_MAX_LENGTH: 500,
  // ...
};

// Booking Status
BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// User Roles
USER_ROLES = {
  TOURIST: "tourist",
  AGENT: "agent",
};

// API Config
API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6543";
API_TIMEOUT = 10000;

// File Limits
MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
```

### Environment Variables

```env
VITE_API_URL=http://localhost:6543
```

---

## 🚀 Running the App

### Development

```bash
# Install dependencies
npm install
# atau
bun install

# Run dev server
npm run dev
# atau
bun dev
```

App berjalan di: `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Linting & Formatting

```bash
npm run lint        # Check ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format with Prettier
```

---

## 🔄 Data Flow

### Authentication Flow

```
1. User submits login form
2. auth.service.login() → POST /api/auth/login
3. Receive { user, token }
4. Store token in localStorage
5. Update authStore (user, isAuthenticated)
6. Redirect to dashboard
```

### Booking Flow

```
1. Tourist views package detail
2. Click "Book Now" → /book/:id
3. Fill booking form (date, travelers)
4. Submit → booking.service.createBooking()
5. Redirect to booking success
6. Upload payment proof
7. Agent verifies payment
8. Booking confirmed
```

### Protected Route Flow

```
1. User navigates to protected route
2. ProtectedRoute checks authStore.isAuthenticated
3. If not authenticated → redirect to /sign-in
4. If authenticated, check allowedRoles
5. If role not allowed → redirect to /dashboard
6. Render protected content
```

---

## 📱 Mobile Responsiveness

### Detection (`use-mobile.js`)

```javascript
const isMobile = useIsMobile();
// Returns true if viewport < 768px
```

### Layout Adaptation

- **Desktop**: Full navbar + sidebar (if applicable) + footer
- **Mobile**: Bottom dock navigation, simplified layouts

---

## ⚠️ Important Notes

1. **Lazy Loading**: All pages except LandingPage are lazy loaded
2. **Error Boundary**: Wraps entire app for error handling
3. **Toast Notifications**: Using Sonner for consistent UX
4. **Form Validation**: Zod schemas + React Hook Form
5. **State Persistence**: Auth store persisted to localStorage
6. **API Interceptors**: Auto token injection & error handling
7. **Image Handling**: Max 5MB, supports jpg/png/gif/webp
8. **Role-Based UI**: Components adapt based on user.role

---

## 🎯 Key Features by Role

### Tourist Features

- ✅ Browse & search packages
- ✅ View package details
- ✅ Book packages
- ✅ Upload payment proof
- ✅ View booking history
- ✅ Write reviews (after completion)
- ✅ Save to wishlist
- ✅ View personal dashboard

### Agent Features

- ✅ All tourist features (view only)
- ✅ Create/Edit/Delete packages
- ✅ Create destinations
- ✅ Verify/Reject payments
- ✅ Manage QRIS codes
- ✅ View analytics dashboard
- ✅ View package performance

---

## 🔗 API Integration Summary

| Service             | Endpoints Used                                                                        |
| ------------------- | ------------------------------------------------------------------------------------- |
| auth.service        | `/auth/register`, `/auth/login`, `/auth/me`, `/auth/profile`, `/auth/change-password` |
| package.service     | `/packages`, `/packages/{id}`, `/packages/agent/{id}`                                 |
| booking.service     | `/bookings`, `/bookings/{id}`, `/bookings/tourist/{id}`, `/bookings/payment/pending`  |
| destination.service | `/destinations`, `/destinations/{id}`                                                 |
| review.service      | `/reviews`, `/reviews/package/{id}`                                                   |
| payment.service     | `/payment/generate`                                                                   |
| qris.service        | `/qris`, `/qris/{id}`, `/qris/preview`                                                |
| analytics.service   | `/analytics/agent/stats`, `/analytics/tourist/stats`                                  |
