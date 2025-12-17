# SUMMARY BACKEND - Travel Booking API

## 📋 Overview

Backend API untuk aplikasi Travel Booking menggunakan **Python Pyramid Framework** dengan PostgreSQL sebagai database. API menyediakan layanan untuk manajemen paket wisata, booking, review, pembayaran QRIS, dan autentikasi user.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.14+ | Runtime |
| Pyramid | 2.0.2 | Web Framework |
| SQLAlchemy | 2.0.44 | ORM |
| PostgreSQL | - | Database |
| Alembic | 1.17.2 | Database Migration |
| PyJWT | 2.10.1 | JWT Authentication |
| bcrypt | 5.0.0 | Password Hashing |
| Pydantic | 2.12.5 | Request Validation |
| Waitress | 3.0.2 | WSGI Server |
| hupper | 1.12.1 | Hot Reload |

---

## 📁 Struktur Project

```
backend/
├── main.py                    # Entry point, Pyramid config & routing
├── db.py                      # Database connection & session
├── requirements.txt           # Python dependencies
├── alembic.ini               # Alembic configuration
├── alembic/
│   └── versions/             # Migration files
├── models/
│   ├── __init__.py           # Model exports
│   ├── base.py               # SQLAlchemy Base
│   ├── user_model.py         # User model (Tourist/Agent)
│   ├── package_model.py      # Travel package model
│   ├── destination_model.py  # Destination model
│   ├── booking_model.py      # Booking model
│   ├── review_model.py       # Review model
│   └── qris_model.py         # QRIS payment model
├── views/
│   ├── auth/                 # Authentication views
│   ├── packages/             # Package CRUD views
│   ├── destinations/         # Destination views
│   ├── bookings/             # Booking views
│   ├── reviews/              # Review views
│   ├── qris/                 # QRIS management views
│   └── analytics/            # Analytics views
├── routes/                   # Route definitions (optional)
├── helpers/
│   ├── jwt_validate_helper.py # JWT validation decorator
│   └── qris_helper.py        # QRIS helper functions
└── storage/
    ├── packages/             # Package images
    ├── payment_proofs/       # Payment proof uploads
    └── qris/                 # QRIS images
```

---

## 🗃️ Database Models

### 1. User Model (`user_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- name: String(100)
- email: String(100) - unique, indexed
- password_hash: String(255) - bcrypt hashed
- role: Enum["tourist", "agent"]
- created_at: DateTime
- updated_at: DateTime

# Relationships:
- bookings: One-to-Many → Booking (for tourist)
- packages: One-to-Many → Package (for agent)
- reviews: One-to-Many → Review
```

### 2. Package Model (`package_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- agent_id: UUID (FK → users.id)
- destination_id: UUID (FK → destinations.id)
- name: String(200)
- duration: Integer (days)
- price: Numeric(10,2)
- itinerary: Text
- max_travelers: Integer
- contact_phone: String(20)
- images: ARRAY(String) - PostgreSQL array
- created_at: DateTime
- updated_at: DateTime

# Relationships:
- agent: Many-to-One → User
- destination: Many-to-One → Destination
- bookings: One-to-Many → Booking (cascade delete)
- reviews: One-to-Many → Review (cascade delete)
```

### 3. Destination Model (`destination_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- name: String(100)
- description: Text
- photo_url: String(500)
- country: String(100) - indexed
- created_at: DateTime
- updated_at: DateTime

# Relationships:
- packages: One-to-Many → Package
```

### 4. Booking Model (`booking_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- package_id: UUID (FK → packages.id) - cascade delete
- tourist_id: UUID (FK → users.id)
- travel_date: Date
- travelers_count: Integer
- total_price: Numeric(10,2)
- status: Enum["pending", "confirmed", "cancelled", "completed"]
- created_at: DateTime
- completed_at: DateTime (nullable)
- has_reviewed: Boolean

# Payment Fields:
- payment_status: Enum["unpaid", "pending_verification", "verified", "rejected"]
- payment_proof_url: String(500) - nullable
- payment_proof_uploaded_at: DateTime - nullable
- payment_verified_at: DateTime - nullable
- payment_rejection_reason: Text - nullable

# Relationships:
- package: Many-to-One → Package
- tourist: Many-to-One → User
- review: One-to-One → Review
```

### 5. Review Model (`review_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- package_id: UUID (FK → packages.id) - cascade delete
- tourist_id: UUID (FK → users.id)
- booking_id: UUID (FK → bookings.id) - cascade delete, nullable
- rating: Integer (1-5, constraint checked)
- comment: Text
- created_at: DateTime

# Relationships:
- package: Many-to-One → Package
- tourist: Many-to-One → User
- booking: One-to-One → Booking
```

### 6. QRIS Model (`qris_model.py`)
```python
# Fields:
- id: UUID (Primary Key)
- foto_qr_path: String(500)
- static_qris_string: String(500) - unique
- dynamic_qris_string: String(500)
- fee_type: Enum["persentase", "rupiah"] - nullable
- fee_value: Numeric(10,2) - nullable
- created_at: DateTime
```

---

## 🔐 Authentication System

### JWT Configuration
```python
# Token Generation (login_view.py):
payload = {
    "sub": user_id,        # User UUID
    "email": user_email,
    "role": user_role,     # "tourist" atau "agent"
    "exp": datetime + 30min,
    "iat": datetime.now()
}
secret = "secret"
algorithm = "HS256"
```

### JWT Validation Decorator (`jwt_validate_helper.py`)
```python
@jwt_validate
def protected_view(request):
    # Access claims via request.jwt_claims
    user_id = request.jwt_claims["sub"]
    role = request.jwt_claims["role"]
```

---

## 🌐 API Endpoints

### Authentication (`/api/auth/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | - | Register user (tourist/agent) |
| POST | `/login` | - | Login & get JWT token |
| GET | `/me` | Bearer | Get current user profile |
| PUT | `/profile` | Bearer | Update profile |
| POST | `/change-password` | Bearer | Change password |

### Packages (`/api/packages/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | - | List packages (with filters) |
| GET | `/{id}` | - | Get package detail |
| GET | `/agent/{agentId}` | - | Get packages by agent |
| POST | `/` | Agent | Create package (multipart/form-data) |
| PUT | `/{id}` | Agent | Update package |
| DELETE | `/{id}` | Agent | Delete package |

**Query Parameters for GET /packages:**
- `destination`: UUID filter
- `q` / `search`: Search by name
- `minPrice`, `maxPrice`: Price range
- `sortBy`: `price`, `duration`, `created_at`
- `order`: `asc`, `desc`

### Destinations (`/api/destinations/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | - | List all destinations |
| GET | `/{id}` | - | Get destination detail |
| POST | `/` | Agent | Create destination |
| PUT | `/{id}` | Agent | Update destination |
| DELETE | `/{id}` | Agent | Delete destination |

### Bookings (`/api/bookings/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Bearer | List all bookings |
| GET | `/{id}` | Bearer | Get booking detail |
| GET | `/tourist/{touristId}` | Bearer | Bookings by tourist |
| GET | `/package/{packageId}` | Bearer | Bookings by package |
| GET | `/payment/pending` | Agent | Pending payment bookings |
| POST | `/` | Tourist | Create booking |
| PUT | `/{id}/status` | Agent | Update booking status |
| POST | `/{id}/payment-proof` | Tourist | Upload payment proof |
| POST | `/{id}/payment-verify` | Agent | Verify payment |
| POST | `/{id}/payment-reject` | Agent | Reject payment |

### Reviews (`/api/reviews/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | - | List all reviews |
| GET | `/package/{packageId}` | - | Reviews by package |
| GET | `/tourist/{touristId}` | - | Reviews by tourist |
| POST | `/` | Tourist | Create review |

### QRIS (`/api/qris/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Agent | List all QRIS |
| GET | `/{id}` | - | Get QRIS detail |
| GET | `/preview` | - | Preview QRIS |
| POST | `/` | Agent | Create QRIS |
| DELETE | `/{id}` | Agent | Delete QRIS |

### Payment (`/api/payment/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/generate` | Bearer | Generate dynamic QRIS |

### Analytics (`/api/analytics/`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/agent/stats` | Agent | Agent statistics |
| GET | `/agent/package-performance` | Agent | Package performance |
| GET | `/tourist/stats` | Tourist | Tourist statistics |

---

## ⚙️ Konfigurasi

### Database Connection (`db.py`)
```python
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://app_prod_user:12345@localhost:5432/uas_pengweb"
)
```

### CORS Configuration (`main.py`)
```python
# CORS Tween - memungkinkan semua origin
response.headers['Access-Control-Allow-Origin'] = '*'
response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
```

### Static Files
```python
# Static file serving
config.add_static_view(name='qris', path='storage/qris')
config.add_static_view(name='payment_proofs', path='storage/payment_proofs')
config.add_static_view(name='destinations', path='storage/destinations')
config.add_static_view(name='packages', path='storage/packages')
```

---

## 🚀 Running the Server

### Development (with Hot Reload)
```bash
# Activate virtual environment
.\pemweb-backend\Scripts\activate

# Run server
python main.py
```
Server berjalan di: `http://0.0.0.0:6543`

### Database Migration
```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## 📝 Data Serialization

### Package Serialization
```python
{
    "id": str(pkg.id),
    "agentId": str(pkg.agent_id),
    "destinationId": str(pkg.destination_id),
    "name": pkg.name,
    "duration": pkg.duration,
    "price": float(pkg.price),
    "itinerary": pkg.itinerary,
    "maxTravelers": pkg.max_travelers,
    "contactPhone": pkg.contact_phone,
    "images": pkg.images,
    "rating": 0,  # Calculated from reviews
    "reviewsCount": 0,
    "destinationName": pkg.destination.name,
    "country": pkg.destination.country,
}
```

---

## 🔑 Role-Based Access

| Feature | Tourist | Agent |
|---------|---------|-------|
| View packages | ✅ | ✅ |
| Create package | ❌ | ✅ |
| Edit/Delete package | ❌ | ✅ (own only) |
| Book package | ✅ | ❌ |
| Upload payment proof | ✅ | ❌ |
| Verify payment | ❌ | ✅ |
| Write review | ✅ (after completed) | ❌ |
| Manage QRIS | ❌ | ✅ |
| View analytics | ✅ (own) | ✅ (own) |

---

## 📦 File Upload

### Package Images
- Max size: 5MB
- Allowed types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Storage: `storage/packages/`
- URL format: `/packages/{uuid}.{ext}`

### Payment Proof
- Storage: `storage/payment_proofs/`
- URL format: `/payment_proofs/{filename}`

---

## ⚠️ Important Notes

1. **JWT Secret**: Hardcoded sebagai `"secret"` - HARUS diganti di production
2. **CORS**: Allow all origins (`*`) - pertimbangkan restrict di production
3. **Password**: Di-hash menggunakan bcrypt
4. **UUID**: Semua primary key menggunakan UUID v4
5. **Cascade Delete**: Package deletion akan menghapus bookings dan reviews terkait
6. **Database Users**: 
   - `alembic_user`: Untuk migration
   - `app_prod_user`: Untuk aplikasi
