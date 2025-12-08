Logo kemdiktisaintekLogo Magang BerdampakLogo ITERA
UJIAN AKHIR SEMESTER
IF25-22014 - Pengembangan Aplikasi Web

Full-Stack Group Project - Take Home

Waktu: 3 Minggu

👥 PROYEK KELOMPOK 👥

5 Orang per Tim

⏰ DEADLINE PENGUMPULAN ⏰

Jumat, 19 Desember 2025

Pukul 23:59:59 WIB

Informasi Umum
Sifat	Kelompok (5 orang) - Take Home Final Project
Waktu Pengerjaan	3 minggu sejak soal dibagikan
Pengumpulan	GitHub Repository + Frontend Deployment (Vercel) + Backend Deployment (Domain) + Video Presentasi
Platform	ReactJS (Frontend) + Python Pyramid (Backend) + PostgreSQL (Database)
PENTING - PENENTUAN STUDI KASUS
Studi kasus yang dikerjakan ditentukan berdasarkan MODULASI URUTAN KELOMPOK yang dibagi oleh Asisten Mata Kuliah. Kelompok akan mendapatkan nomor studi kasus (0-9) sesuai dengan pembagian dari Asisten.

Capaian Pembelajaran Mata Kuliah (CPMK)
CPMK	Pertemuan	Materi yang Diujikan	Bobot UAS
CPMK0501	P1-P15	HTML/CSS, Form, Table, JavaScript, ReactJS, Python, OOP, Pyramid, PostgreSQL, Full-Stack Project	100%
Bonus	-	Deployment, Documentation, Video Presentation	10%
Kriteria Penilaian Detail
CPMK0501: Full-Stack Web Development - 100 poin
Aspek	Bobot	Kriteria
Frontend - React Components	15	Minimal 6 functional components, proper component hierarchy, props passing, reusable components, routing dengan React Router
Frontend - State Management	10	useState dan useEffect digunakan dengan tepat, proper state lifting, controlled components
Frontend - UI/UX dan CSS	15	Responsive design, CSS modern (Flexbox/Grid), consistent design, loading states, user-friendly interface
Frontend - Forms dan Validation	10	Minimal 3 forms dengan validation, error handling, user feedback yang baik
Backend - RESTful API	15	Minimal 6 endpoints (GET, POST, PUT, DELETE), proper HTTP methods dan status codes, JSON response
Backend - Business Logic dan OOP	10	Python OOP implementation, business logic terstruktur, data validation, error handling
Database - Design dan Implementation	15	PostgreSQL dengan SQLAlchemy ORM, minimal 3 tabel dengan relasi yang tepat, migrations dengan Alembic
Authentication dan Authorization	10	User login/register, password hashing, session/token management, protected routes, role-based access
Catatan: Total bobot CPMK0501 adalah 100 poin. Semua aspek frontend, backend, dan database akan dinilai secara komprehensif.

Bonus: Deployment, Documentation dan Presentation - 10 poin
Aspek	Bobot	Kriteria
Frontend Deployment	2	Deploy frontend ke Vercel, berfungsi dengan baik
Backend Deployment	2	Deploy backend ke domain *.web.id (beli sendiri di Niagahoster/Rumahweb)
GitHub Repository	2	Repository terorganisir, minimal 30 commits dari berbagai anggota, .gitignore proper, clean code
Documentation	2	README lengkap (tim, deskripsi, tech stack, cara install, API docs), code comments yang membantu
Video Presentation	2	Video demo aplikasi (max 10 menit), penjelasan fitur, pembagian tugas, upload ke YouTube/Drive
Ringkasan Bobot Penilaian
Komponen	Bobot
CPMK0501 - Full-Stack Web Development	100%
(Bonus) - Deployment, Documentation, Video	10%
TOTAL	110%
10 Studi Kasus Berdasarkan Digit Terakhir NIM Ketua
Digit 0 - E-Learning Platform
Deskripsi: Platform pembelajaran online sederhana dengan sistem manajemen kursus dan enrollment.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login, Logout dengan Student dan Instructor roles
2	Course Management - Instructor: CRUD courses berisi title, description, category | Student: Browse courses
3	Enrollment System - Student enroll atau unenroll course, view enrolled courses
4	Content/Module Management - Instructor: Add modules atau materials per course berisi text, video links
5	Dashboard - Instructor: View enrolled students | Student: View enrolled courses dan progress
Fitur Opsional Bonus: Search dan filter courses, rating atau review system

Database: Users (id, name, email, password, role), Courses (id, title, description, category, instructor_id), Enrollments (id, student_id, course_id, enrolled_date), Modules (id, course_id, title, content, order)
Digit 1 - Clinic Appointment System
Deskripsi: Sistem booking appointment klinik dengan manajemen jadwal dokter dan patient records.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login dengan Patient dan Doctor roles
2	Doctor Management - View daftar dokter dengan specialization dan jadwal praktek
3	Appointment Booking - Patient: Book appointment, view upcoming appointments | Doctor: View schedule
4	Medical Records - Doctor: Create dan view patient notes atau diagnosis setelah appointment
5	Dashboard - Doctor: View daily appointments | Patient: View appointment history
Fitur Opsional Bonus: Reschedule atau cancel appointment, appointment status pending atau confirmed atau completed

Database: Users (id, name, email, password, role), Doctors (id, user_id, specialization, schedule), Appointments (id, patient_id, doctor_id, date, time, status), Medical_Records (id, appointment_id, diagnosis, notes)
Digit 2 - Food Ordering System
Deskripsi: Sistem pemesanan makanan online dengan shopping cart dan order tracking.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Customer dan Restaurant Owner roles)
2	Menu Management - Owner: CRUD menu items (name, category, price, image) | Customer: Browse menu
3	Shopping Cart - Add to cart, update quantity, remove items, view total
4	Order Management - Customer: Place order, view order history | Owner: View incoming orders
5	Order Status - Owner: Update status (pending/processing/ready/delivered) | Customer: Track status
Fitur Opsional (Bonus): Search dan filter menu, payment method selection

Database: Users (id, name, email, password, role), Menu_Items (id, name, category, price, image_url, available), Orders (id, customer_id, total, status, order_date), Order_Items (id, order_id, menu_item_id, quantity, price)
Digit 3 - Property Listing Platform
Deskripsi: Platform listing properti untuk jual/sewa dengan sistem inquiry dan favorites.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Buyer dan Agent roles)
2	Property Listing - Agent: CRUD properties (title, description, price, type, location, photos) | Buyer: Browse
3	Search dan Filter - Filter by price range, property type (house/apartment), location
4	Property Details - View detail property dengan photos, specs (bedrooms, bathrooms, area)
5	Inquiry System - Buyer: Send inquiry/contact agent | Agent: View inquiries
6	Favorites - Buyer: Save/unsave favorite properties, view saved list
Fitur Opsional (Bonus): Agent profile page, property comparison

Database: Users (id, name, email, password, role, phone), Properties (id, agent_id, title, description, price, type, location, bedrooms, bathrooms, area), Property_Photos (id, property_id, photo_url), Favorites (id, user_id, property_id), Inquiries (id, property_id, buyer_id, message, date)
Digit 4 - Job Portal System
Deskripsi: Platform lowongan kerja dengan job posting, aplikasi, dan applicant tracking.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Job Seeker dan Employer roles)
2	Job Posting - Employer: CRUD job posts (title, description, requirements, salary) | Seeker: Browse jobs
3	Profile Management - Seeker: Create profile (name, skills, experience, CV upload/link)
4	Job Application - Seeker: Apply to jobs, view application status | Employer: View applicants
5	Search dan Filter - Filter jobs by title, location, salary range, job type
6	Application Management - Employer: Review, shortlist, atau reject applicants
Fitur Opsional (Bonus): Saved jobs, company profile page

Database: Users (id, name, email, password, role), Job_Seekers (id, user_id, skills, experience, cv_url), Jobs (id, employer_id, title, description, requirements, salary, location, type), Applications (id, job_id, seeker_id, status, applied_date)
Digit 5 - Inventory Management System
Deskripsi: Sistem manajemen stok barang dengan supplier management dan stock tracking.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Admin dan Staff roles)
2	Product Management - CRUD products (name, SKU, category, price, stock quantity, min stock)
3	Supplier Management - CRUD suppliers (name, contact, email, products supplied)
4	Stock In/Out - Add stock (purchase), reduce stock (sales), view transaction history
5	Low Stock Alert - Highlight products dengan stock di bawah minimum
6	Reports - View stock summary, transaction history, supplier list
Fitur Opsional (Bonus): Export reports to CSV, barcode generation

Database: Users (id, name, email, password, role), Products (id, name, sku, category, price, stock, min_stock), Suppliers (id, name, contact, email), Transactions (id, product_id, type, quantity, date, notes), Product_Suppliers (id, product_id, supplier_id)
Digit 6 - Gym Class Booking System
Deskripsi: Platform booking kelas gym dengan membership dan attendance tracking.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Member dan Trainer roles)
2	Class Management - Trainer: CRUD classes (name, description, schedule, capacity) | Member: Browse classes
3	Booking System - Member: Book class, view booked classes | Trainer: View participants
4	Membership Management - Admin: CRUD membership plans | Member: View membership status dan expiry
5	Attendance - Trainer: Mark attendance | Member: View attendance history
Fitur Opsional (Bonus): Cancel booking, class capacity limit, personal training sessions

Database: Users (id, name, email, password, role), Members (id, user_id, membership_plan, expiry_date), Classes (id, trainer_id, name, description, schedule, capacity), Bookings (id, member_id, class_id, booking_date), Attendance (id, booking_id, attended, date)
Digit 7 - Library Management System
Deskripsi: Sistem perpustakaan dengan book cataloging, borrowing, dan return management.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Member dan Librarian roles)
2	Book Management - Librarian: CRUD books (title, author, ISBN, category, copies available) | Member: Browse
3	Borrowing System - Member: Borrow book (max 3), view current borrows | Librarian: Process borrow request
4	Return System - Member: Return book | Librarian: Process return, calculate late fees
5	Search dan Filter - Search books by title, author, or category
6	History - Member: View borrowing history | Librarian: View all transactions
Fitur Opsional (Bonus): Book reservation, rating/review books

Database: Users (id, name, email, password, role), Books (id, title, author, isbn, category, copies_total, copies_available), Borrowings (id, book_id, member_id, borrow_date, due_date, return_date, fine)
Digit 8 - Event Ticketing System
Deskripsi: Platform booking tiket event dengan seat selection dan ticket management.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Attendee dan Organizer roles)
2	Event Management - Organizer: CRUD events (name, date, venue, capacity, ticket price) | Attendee: Browse
3	Ticket Booking - Attendee: Book tickets (select quantity), view booked tickets
4	Booking Management - Organizer: View bookings dan attendees | Attendee: View booking history
5	Ticket Confirmation - Generate booking code, email confirmation
Fitur Opsional (Bonus): QR code tickets, seat selection, payment integration

Database: Users (id, name, email, password, role), Events (id, organizer_id, name, description, date, venue, capacity, ticket_price), Bookings (id, event_id, attendee_id, quantity, total_price, booking_code, booking_date)
Digit 9 - Travel Package Booking
Deskripsi: Platform booking paket wisata dengan destination catalog dan booking management.

Fitur Wajib (Core Features):

1	User Authentication - Register, Login (Tourist dan Travel Agent roles)
2	Package Management - Agent: CRUD packages (name, destination, duration, price, itinerary) | Tourist: Browse
3	Destination Catalog - View destinations dengan photos, description, popular packages
4	Booking System - Tourist: Book package (date, number of travelers), view bookings
5	Booking Management - Agent: View dan manage bookings (confirm/cancel)
6	Reviews - Tourist: Review packages after trip | View package ratings
Fitur Opsional (Bonus): Payment integration, tour guide assignment

Database: Users (id, name, email, password, role), Destinations (id, name, description, photo_url), Packages (id, agent_id, destination_id, name, duration, price, itinerary, max_travelers), Bookings (id, package_id, tourist_id, travel_date, travelers_count, total_price, status), Reviews (id, package_id, tourist_id, rating, comment)
Technical Requirements dan Stack
🚀 Required Technology Stack
Komponen	Teknologi
Frontend	ReactJS (Create React App atau Vite), React Router, Axios/Fetch API
Styling	CSS murni (wajib untuk CPMK0501) - boleh tambah Tailwind/Bootstrap
Backend	Python 3.x, Pyramid Framework, SQLAlchemy ORM, Alembic (migrations)
Database	PostgreSQL (wajib)
Deployment	Frontend: Vercel | Backend: Domain *.web.id (beli sendiri di Niagahoster/Rumahweb)
Struktur Project Minimal
project-root/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API calls
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── app/
│   │   ├── models/            # Database models (SQLAlchemy)
│   │   ├── views/             # API endpoints/routes
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── alembic/               # Database migrations
│   ├── requirements.txt
│   ├── development.ini
│   └── README.md
│
└── README.md (root - project overview)
🌐 DOMAIN UNTUK BACKEND DEPLOYMENT
Setiap kelompok WAJIB membeli domain sendiri untuk deploy backend.

Domain: *.web.id (contoh: kelompok1.web.id, team-elearning.web.id)

Tempat Beli: Niagahoster, Rumahweb, atau penyedia domain Indonesia lainnya

Harga: Sekitar Rp 15.000 - Rp 25.000 per tahun untuk .web.id

💡 Beli domain maksimal minggu pertama! Gunakan untuk deployment backend Pyramid + PostgreSQL

Ketentuan Pengumpulan
Format Pengumpulan Lengkap
Item	Deskripsi
1. GitHub Repository	• Repository public dengan nama: uas-paw-kelompok-[nama]
• Struktur folder terorganisir (frontend/ dan backend/)
• Minimal 30 commits dari berbagai anggota
• .gitignore untuk environment files dan dependencies
• Branch protection dan PR workflow (opsional, bonus poin)
2. README.md	• Nama tim dan anggota (nama, NIM, pembagian tugas)
• Deskripsi project dan fitur utama
• Tech stack yang digunakan
• Cara instalasi dan menjalankan (local development)
• Link deployment (frontend dan backend)
• API documentation (endpoints, request/response format)
• Screenshot aplikasi
• Link video presentasi
3. Frontend Deployment	• Deploy ke Vercel
• URL: [nama-tim].vercel.app
• Environment variables configured
• Berfungsi penuh dan responsive
4. Backend Deployment	• Deploy ke domain *.web.id yang sudah dibeli
• URL: [nama-kelompok].web.id
• PostgreSQL database configured
• All endpoints accessible dan documented
5. Video Presentasi	• Durasi: maksimal 10 menit
• Isi: intro tim, demo aplikasi dengan semua fitur, pembagian tugas anggota
• Upload ke YouTube unlisted atau public, atau Google Drive
• Link video di README.md
6. Database Schema	• Export SQL schema atau migrations
• ERD diagram (opsional, bonus poin)
• Seed data untuk testing
SUBMIT TUGAS UAS DI SINI
Checklist Sebelum Submit
✓	Frontend: Semua fitur wajib berfungsi, responsive, no console errors
✓	Backend: Semua endpoints tested, proper error handling, validation
✓	Database: Minimal 3 tabel dengan relasi, migrations lengkap, seed data
✓	Forms: Minimal 3 forms dengan validation berfungsi
✓	CRUD: Create, Read, Update, Delete semua berfungsi
✓	Authentication: Login/register berfungsi, password hashed, role-based access
✓	Deployment: Frontend dan backend live, URL accessible, CORS configured
✓	GitHub: Minimal 30 commits, dari berbagai anggota, code terorganisir
✓	Documentation: README lengkap, API docs, cara install dan run
✓	Video: Max 10 menit, demo all features, pembagian tugas, link di README
Pembagian Tugas Tim (Rekomendasi)
Role	Tanggung Jawab Utama	Jumlah
Team Leader	Koordinasi tim, integration frontend-backend, deployment, dokumentasi, video	1 orang
Frontend Developer	React components, routing, state management, UI/UX, forms, validation, responsive design	2 orang
Backend Developer	API endpoints, business logic, authentication, security, error handling	2 orang
Database Specialist	Database design, models, migrations, queries, relasi antar tabel	1 orang
Note: Pembagian bisa disesuaikan (misalnya 1 leader + 2 full-stack). Yang penting semua anggota contribute secara aktif dan terlihat di git commits.

Tips Pengerjaan Proyek
1	Week 1 - Planning dan Setup: Diskusi fitur, design database schema (ERD), setup repository, setup development environment, bagi tugas, buat mockup/wireframe
2	Week 2 - Development: Backend API development (endpoints, models, auth), Frontend components (pages, forms), Database migrations, Testing API dengan Postman
3	Week 3 - Integration dan Finalisasi: Frontend-backend integration, CORS configuration, bug fixes, deployment, video recording dan editing, finalisasi dokumentasi
4	Git Workflow: Gunakan branches (feature branches), pull requests untuk code review, commit messages yang jelas, jangan push langsung ke main
5	Communication: Daily/regular updates di grup, dokumentasikan keputusan penting, gunakan project management tools (Trello, Notion, GitHub Projects)
6	Testing: Test setiap feature sebelum merge, test integration frontend-backend, prepare seed data untuk demo, test di production sebelum submit
7	Database: Buat ERD dulu sebelum coding, gunakan Alembic untuk migrations, test relasi antar tabel, backup database regularly
8	Documentation: Document as you go (jangan tunggu akhir), API docs penting untuk kolaborasi frontend-backend, screenshot fitur untuk README
⚠️ PLAGIARISME dan ACADEMIC INTEGRITY
Setiap bentuk plagiarisme akan dikenakan sanksi tegas:

NILAI 0	Jika ditemukan kemiripan code >40% dengan kelompok lain pada logic utama
NILAI 0	Jika copy-paste project dari internet tanpa modifikasi signifikan
NILAI 0	Jika ada anggota yang tidak contribute (no git commits atau fake commits)
DIPERBOLEHKAN:

Menggunakan tutorial dan dokumentasi official sebagai learning reference
Menggunakan library dan framework yang umum (Axios, React components library)
Bertanya ke AI assistant untuk debugging dan learning (tapi HARUS dipahami dan dimodifikasi)
Resources dan References
📚 Recommended Resources
ReactJS Documentation: https://react.dev/learn
React Router: https://reactrouter.com/
Python Pyramid: https://docs.pylonsproject.org/projects/pyramid/
SQLAlchemy ORM: https://docs.sqlalchemy.org/
Alembic Migrations: https://alembic.sqlalchemy.org/
PostgreSQL: https://www.postgresql.org/docs/
Vercel Deployment: https://vercel.com/docs
Git Best Practices: https://git-scm.com/book/en/v2
REST API Design: https://restfulapi.net/
— TEAMWORK MAKES THE DREAM WORK —

"Alone we can do so little;
together we can do so much."

Selamat mengerjakan UAS Final Project!

Kontak dan Pertanyaan
Jika ada pertanyaan terkait soal UAS atau request subdomain, silakan hubungi dosen pengampu.

📧 TANYA DOSEN VIA EMAIL
Program Studi Teknik Informatika
Fakultas Teknologi Industri - Institut Teknologi Sumatera
IF25-22014 - Pengembangan Aplikasi Web | Dosen Pengempu: M Habib Algifari, S.Kom., M.T.I.