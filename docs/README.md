# **API Documentation: Ai-venture**

## **Overview**

We extend a warm welcome to you, our esteemed reader, to the documentation pertaining to the application programming interface (API). This section contains a comprehensive list of all available endpoints for interacting with the system. Each endpoint is accompanied by a detailed description, a description of the associated method, a list of parameters, and an illustrative sample response. The objective of this documentation is to facilitate the integration of the API into applications by providing guidance to Mobile Development (MD) teams.

---

## **Table of Contents**

1. [Authentication (`/auth`)](#authentication-auth)
2. [Image Management (`/images`)](#image-management-images)
3. [Places (`/places`)](#places-places)
4. [Ratings (`/ratings`)](#ratings-ratings)
5. [Scan Operations (`/scans`)](#scan-operations-scans)
6. [Restaurants (`/restaurants`)](#restaurants-restaurants)
7. [Hotels (`/hotels`)](#hotels-hotels)
8. [Bookmarks (`/bookmarks`)](#bookmarks-bookmarks)
9. [Tickets (`/tickets`)](#tickets-tickets)
10. [Notifications (`/notifications`)](#notifications-notifications)
11. [History (`/histories`)](#history-histories)

---

### **1. Authentication (`/auth`)**

- **Description:** Endpoint untuk autentikasi user. Mengelola data pengguna, termasuk profil dan autentikasi Google.
- **Available Routes:**
  - `POST /auth/register` (Create)
  - `POST /auth/login` (Read/Login)
  - `GET /user/google` (Read)
    - Deskripsi: Redirect ke Google untuk autentikasi.
  - `GET /user/google/callback` (Read)
    - Deskripsi: Callback setelah autentikasi Google.
  - `POST /auth/register` (Create)
  - `POST /auth/register/verify-otp` (Verify)
  - `POST /auth/login` (Read/Login)
  - `GET /auth/profile` (Read)
    - Deskripsi: Mendapatkan informasi profil user yang sedang login.

---

### **2. Images (`/images`)**

- **Description:** Mengelola upload dan retrieval gambar.
- **Available Routes:**
  - `GET /images` (Read)
    - Deskripsi: Mendapatkan semua gambar.
  - `POST /images` (Create)
  - `GET /images/:id` (Read)
    - Deskripsi: Mendapatkan detail gambar berdasarkan ID.
  - `PUT /images/:id` (Update)
  - `DELETE /images/:id` (Delete)

---

### **3. Places (`/places`)**

- **Description:** Mengelola informasi tempat wisata.
- **Available Routes:**
  - `GET /places` (Read)
  - `POST /places` (Create)
  - `GET /places/:id` (Read)
  - `GET /places/cluster/:cluster` (Read)
  - `PUT /places/:id` (Update)
  - `DELETE /places/:id` (Delete)

---

### **4. Ratings (`/ratings`)**

- **Description:** Menambahkan, memperbarui, atau mendapatkan rating untuk hotel, tempat wisata, dan restoran.
- **Available Routes:**
  - `GET /ratings/hotel/:hotelId/ratings` (Read)
  - `GET /ratings/place/:placeId/rating` (Read)
  - `GET /ratings/restaurant/:restaurantId/rating` (Read)
  - `POST /ratings/hotel/:hotelId` (Create)
  - `POST /ratings/place/:placeId` (Create)
  - `POST /ratings/restaurant/:restaurantId` (Create)

---

### **5. Scan Operations (`/scans`)**

- **Description:** Mengelola proses scanning.
- **Available Routes:**
  - `GET /scans` (Read)
  - `POST /scans` (Create)
  - `GET /scans/:id` (Read)
  - `PUT /scans/:id` (Update)
  - `DELETE /scans/:id` (Delete)

---

### **6. Restaurants (`/restaurants`)**

- **Description:** Mengelola informasi restoran.
- **Available Routes:**
  - `GET /restaurants` (Read)
  - `POST /restaurants` (Create)
  - `GET /restaurants/:id` (Read)
  - `PUT /restaurants/:id` (Update)
  - `DELETE /restaurants/:id` (Delete)

---

### **7. Hotels (`/hotels`)**

- **Description:** Mengelola informasi hotel.
- **Available Routes:**
  - `GET /hotels` (Read)
  - `POST /hotels` (Create)
  - `GET /hotels/:id` (Read)
  - `PUT /hotels/:id` (Update)
  - `DELETE /hotels/:id` (Delete)

---

### **8. Bookmarks (`/bookmarks`)**

- **Description:** Menyimpan data bookmark untuk tempat atau restoran favorit.
- **Available Routes:**
  - `GET /bookmarks` (Read)
  - `POST /bookmarks` (Create)
  - `PUT /bookmarks/:id` (Update)
  - `DELETE /bookmarks/:id` (Delete)

---

### **9. Tickets (`/tickets`)**

- **Description:** Mengelola informasi tiket.
- **Available Routes:**
  - `GET /tickets` (Read)
  - `POST /tickets` (Create)
  - `GET /tickets/:id` (Read)
  - `PUT /tickets/:id` (Update)
  - `DELETE /tickets/:id` (Delete)

---

### **10. Notifications (`/notifications`)**

- **Description:** Mengelola pemberitahuan user.
- **Available Routes:**
  - `GET /notifications` (Read)
  - `POST /notifications` (Create)
  - `GET /notifications/:id` (Read)
  - `PUT /notifications/:id` (Update)
  - `DELETE /notifications/:id` (Delete)

---

### **11. History (`/histories`)**

- **Description:** Melacak riwayat aktivitas pengguna.
- **Available Routes:**
  - `GET /histories` (Read)
  - `POST /histories` (Create)
  - `GET /histories/:id` (Read)
  - `DELETE /histories/:id` (Delete)

---
