# Backend Python Pyramid

> Kode utama backend python pyramid tugas besar Pemrograman Aplikasi Web

## Daftar Isi

- [Installation](#installation)
- [Setup PostgreSQL](#setup-postgresql)
- [Setup Python](#setup-python)
- [Setup Alembic](#setup-alembic)
- [Run Aplikasi](#run-aplikasi)
- [Dokumentasi API](#dokumentasi-api)

---

## Installation

### Requirements

1. PostgreSQL
2. Python 3.14+

---

## Setup PostgreSQL

### 1. Buat Database

Masuk ke shell psql dan buat database:

```sh
CREATE DATABASE uas_pengweb;
```

### 2. Buat User/Role

```sh
CREATE USER alembic_user WITH PASSWORD '12345';
CREATE USER app_prod_user WITH PASSWORD '12345';
```

### 3. Berikan Hak Akses Database

Berikan hak akses koneksi database ke semua user:

```sh
GRANT CONNECT ON DATABASE uas_pengweb TO alembic_user;
GRANT CONNECT ON DATABASE uas_pengweb TO app_prod_user;
```

### 4. Masuk ke Database

```sh
\c uas_pengweb
```

### 5. Setup User Alembic

Berikan akses ke alembic_user (line 2 dan 3 opsional jika db kosong):

```sh
GRANT USAGE, CREATE ON SCHEMA public TO alembic_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO alembic_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO alembic_user;
```

### 6. Setup User Production

Berikan akses ke user prod:

```sh
GRANT USAGE ON SCHEMA public TO app_prod_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_prod_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_prod_user;
```

### 7. Setup Default Privileges

Beri akses tabel yang dibuat alembic nanti ke user prod:

```sh
ALTER DEFAULT PRIVILEGES FOR ROLE alembic_user IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_prod_user;

ALTER DEFAULT PRIVILEGES FOR ROLE alembic_user IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO app_prod_user;
```

---

## Setup Python

### 1. Clone Repository

```sh
git clone https://github.com/Tugas-Besar-Pemrograman-Aplikasi-Web/Pyramid-Backend.git
```

### 2. Masuk ke Root Repository

```sh
cd Pyramid-Backend/
```

### 3. Buat Virtual Environment

```sh
python -m venv env
```

### 4. Aktivasi Virtual Environment

```sh
source env/bin/activate
```

### 5. Install Dependencies

```sh
pip install -r requirements.txt
```

---

## Setup Alembic

### 1. Autogenerate Migration

```sh
alembic revision --autogenerate -m "initiate"
```

### 2. Upgrade Head

```sh
alembic upgrade head
```

---

## Run Aplikasi

### Jalankan Main.py

```sh
python main.py
```

---

## Dokumentasi API

> Dokumentasi lengkap dari semua API yang tersedia di backend python pyramid tugas besar Pemrograman Aplikasi Web

### Daftar Endpoint

- [Auth](#auth)
  - [POST /api/auth/register](#post-apiauthregister)
  - [POST /api/auth/login](#post-apiauthlogin)
  - [GET /api/auth/me](#get-apiauthme)
- [Destination](#destination)
  - [GET /api/destinations](#get-apidestinations)
  - [GET /api/destinations (with query)](#get-apidestinations-with-query)
  - [GET /api/destinations/{uuid}](#get-apidestinationsuuid)
- [Packages](#packages)
  - [GET /api/packages](#get-apipackages)
  - [GET /api/packages/{id}](#get-apipackagesid)
  - [GET /api/packages/agent/{id_agent}](#get-apipackagesagentid_agent)
  - [POST /api/packages](#post-apipackages)
  - [PUT /api/packages/{id_package}](#put-apipackagesid_package)
  - [DELETE /api/packages/{id_package}](#delete-apipackagesid_package)

---

## Auth

### POST /api/auth/register

Register/signup user baru (tourist atau agent)

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "tourist"
}
```

**Response (201 Created):**

```json
{
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "tourist"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /api/auth/login

Login user

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "tourist"
}
```

**Response (200 OK):**

```json
{
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "tourist"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### GET /api/auth/me

Get current authenticated user

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": "uuid-here",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "tourist"
}
```

---

## Destination

**Catatan:** Destination ditambahkan dari database, sehingga perlu membuat destination terlebih dahulu ke database.

### Setup Data Destination

Buka psql shell:

```sh
psql -h localhost -U app_prod_user -d uas_pengweb
```

**Contoh SQL Insert:**

```sql
INSERT INTO destinations (id, name, description, photo_url, country, created_at, updated_at) VALUES 
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
    'Maldives', 
    'Crystal clear waters and luxurious overwater villas in the heart of the Indian Ocean. Perfect for honeymooners and diving enthusiasts seeking a tropical paradise.', 
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop', 
    'Maldives', 
    NOW(), 
    NOW()
),
(
    'b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22', 
    'Bali', 
    'Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Experience the spiritual atmosphere of Ubud and the beach life of Seminyak.', 
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop', 
    'Indonesia', 
    NOW(), 
    NOW()
),
(
    'c200de77-1e2d-6ff0-dd8f-8dd1df502c33', 
    'Santorini', 
    'Iconic white-washed buildings and breathtaking sunsets over the Aegean Sea. A romantic getaway with unique volcanic beaches and world-class wineries.', 
    'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2000&auto=format&fit=crop', 
    'Greece', 
    NOW(), 
    NOW()
),
(
    'd311ef66-2f3e-7001-ee90-9ee2ef613d44', 
    'Swiss Alps', 
    'Majestic mountains, pristine lakes, and charming alpine villages. Ideal for hiking in summer and skiing in winter, offering breathtaking panoramic views.', 
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2000&auto=format&fit=crop', 
    'Switzerland', 
    NOW(), 
    NOW()
),
(
    'e422f055-304f-8112-ff01-0ff3f0724e55', 
    'Kyoto', 
    'The cultural heart of Japan, famous for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.', 
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop', 
    'Japan', 
    NOW(), 
    NOW()
);
```

**Select ID (get id destinations):**

```sql
SELECT id, name FROM destinations;
```

---

### GET /api/destinations

Get all destinations list

**Method:** GET

**Authentication:** No

**Response (200 OK):**

```json
[
  {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "name": "Maldives",
    "description": "Crystal clear waters and luxurious overwater villas in the heart of the Indian Ocean. Perfect for honeymooners and diving enthusiasts seeking a tropical paradise.",
    "photoUrl": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
    "country": "Maldives"
  },
  {
    "id": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
    "name": "Bali",
    "description": "Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Experience the spiritual atmosphere of Ubud and the beach life of Seminyak.",
    "photoUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
    "country": "Indonesia"
  }
]
```

---

### GET /api/destinations (with query)

Get all destinations dengan filter query

**Method:** GET

**Authentication:** No

**Query Parameters:**

```
key: country
value: Indonesia
```

**Catatan:** Query bersifat case sensitive

**Response (200 OK):**

```json
[
  {
    "id": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
    "name": "Bali",
    "description": "Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Experience the spiritual atmosphere of Ubud and the beach life of Seminyak.",
    "photoUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
    "country": "Indonesia"
  }
]
```

---

### GET /api/destinations/{uuid}

Get destination by ID

**Method:** GET

**Authentication:** No

**URL Example:**

```
/api/destinations/b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22
```

**Response (200 OK):**

```json
[
  {
    "id": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
    "name": "Bali",
    "description": "Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Experience the spiritual atmosphere of Ubud and the beach life of Seminyak.",
    "photoUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
    "country": "Indonesia"
  }
]
```

---

## Packages

### GET /api/packages

Get all packages dengan filter dan sorting

**Method:** GET

**Authentication:** No

**Query Parameters:**

```
search: bali
sortBy: price
order: asc
```

---

### GET /api/packages/{id}

Get detail package by ID

**Method:** GET

**Authentication:** No

**URL Example:**

```
/api/packages/{id}
```

---

### GET /api/packages/agent/{id_agent}

Get packages by agent ID

**Method:** GET

**Authentication:** No

**URL Example:**

```
/api/packages/agent/{id_agent}
```

---

### POST /api/packages

Create new package

**Method:** POST

**Authentication:** Required

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "destinationId": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
  "name": "Paket Liburan Bali 3 Hari",
  "duration": 3,
  "price": 1500000,
  "itinerary": "Hari 1: Pantai Kuta. Hari 2: Ubud. Hari 3: Pulang.",
  "maxTravelers": 10,
  "contactPhone": "08123456789",
  "images": ["https://images.unsplash.com/photo-1537996194471-e657df975ab4"]
}
```

**Example cURL:**

```sh
curl -X POST http://localhost:6543/api/packages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "destinationId": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
    "name": "Paket Liburan Bali 3 Hari",
    "duration": 3,
    "price": 1500000,
    "itinerary": "Hari 1: Pantai Kuta. Hari 2: Ubud. Hari 3: Pulang.",
    "maxTravelers": 10,
    "contactPhone": "08123456789",
    "images": ["https://images.unsplash.com/photo-1537996194471-e657df975ab4"]
  }'
```

**Response (200 OK):**

```json
{
  "id": "c61da954-5ce0-4605-ba3a-bb84ce070574",
  "agentId": "61252b4b-0c62-4326-9e84-71180f171afa",
  "destinationId": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22",
  "name": "Paket Liburan Bali 3 Hari",
  "duration": 3,
  "price": 1500000.0,
  "itinerary": "Hari 1: Pantai Kuta. Hari 2: Ubud. Hari 3: Pulang.",
  "maxTravelers": 10,
  "contactPhone": "08123456789",
  "images": ["https://images.unsplash.com/photo-1537996194471-e657df975ab4"],
  "rating": 0,
  "reviewsCount": 0,
  "destinationName": "Bali",
  "country": "Indonesia"
}
```

---

### PUT /api/packages/{id_package}

Update package by ID

**Method:** PUT

**Authentication:** Required

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "price": 1750000,
  "name": "Premiums Bali Holiday"
}
```
Curl :

```bash
curl -X PUT http://localhost:6543/api/packages/c61da954-5ce0-4605-ba3a-bb84ce070574 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTI1MmI0Yi0wYzYyLTQzMjYtOWU4NC03MTE4MGYxNzFhZmEiLCJlbWFpbCI6ImFnZW5AdGVzdC5jb20iLCJyb2xlIjoiYWdlbnQiLCJleHAiOjE3NjU1NjA5MzYsImlhdCI6MTc2NTU1OTEzNn0.B3ocCVTpwcWzeSbbyWoORfyKLZ7Ehteje77TZgrF_Go" \
  -d '{
    "price": 1750000,
    "name": "Premiums Bali Holiday"
  }'
```
```
{"id": "c61da954-5ce0-4605-ba3a-bb84ce070574", "agentId": "61252b4b-0c62-4326-9e84-71180f171afa", "destinationId": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22", "name": "Premiums Bali Holiday", "duration": 3, "price": 1750000.0, "itinerary": "Hari 1: Pantai Kuta. Hari 2: Ubud. Hari 3: Pulang.", "maxTravelers": 10, "contactPhone": "08123456789", "images": ["https://images.unsplash.com/photo-1537996194471-e657df975ab4"], "rating": 0, "reviewsCount": 0, "destinationName": "Bali", "country": "Indonesia"}
```
**Response (200 OK):**

```json
{
  "message": "Package updated successfully"
}
```

---

### DELETE /api/packages/{id_package}

Delete package by ID

**Method:** DELETE

**Authentication:** Required

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Package deleted successfully"
}
```
Curl :
```bash
curl -X DELETE http://localhost:6543/api/packages/c61da954-5ce0-4605-ba3a-bb84ce070574 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTI1MmI0Yi0wYzYyLTQzMjYtOWU4NC03MTE4MGYxNzFhZmEiLCJlbWFpbCI6ImFnZW5AdGVzdC5jb20iLCJyb2xlIjoiYWdlbnQiLCJleHAiOjE3NjU1NjA5MzYsImlhdCI6MTc2NTU1OTEzNn0.B3ocCVTpwcWzeSbbyWoORfyKLZ7Ehteje77TZgrF_Go"
```

result: 
```
{"message": "Package Successfully Deleted"}
```

### GET /api/packages/agent/{agentID}
Get all packages by agent
Using curl : 
```bash
curl -v http://localhost:6543/api/packages/agent/{agentID}
```

result:
```
{"id": "7f1df8df-3161-47ab-86ee-108c17119561", "agentId": "61252b4b-0c62-4326-9e84-71180f171afa", "destinationId": "b1ffcd88-0d1c-5ef9-cc7e-7cc0ce491b22", "name": "Premiums Bali Holiday", "duration": 3, "price": 1750000.0, "itinerary": "Hari 1: Pantai Kuta. Hari 2: Ubud. Hari 3: Pulang.", "maxTravelers": 10, "contactPhone": "08123456789", "images": ["https://images.unsplash.com/photo-1537996194471-e657df975ab4"], "rating": 0, "reviewsCount": 0, "destinationName": "Bali", "country": "Indonesia"}
```
