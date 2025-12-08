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