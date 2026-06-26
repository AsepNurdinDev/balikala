# Blog Backend API (Go + Gin + GORM + MySQL)

## Struktur
```
backend/
├── cmd/main.go                  # entry point
├── internal/
│   ├── config/database.go       # koneksi & migrasi MySQL
│   ├── controllers/             # auth_controller.go, post_controller.go
│   ├── helpers/jwt.go           # generate JWT
│   ├── middlewares/auth_midleware.go
│   ├── models/                  # Admin, Post
│   ├── routes/routes.go         # daftar endpoint
│   └── seeders/seed_admin.go    # buat admin default otomatis
├── uploads/                     # dibuat otomatis, tempat gambar post tersimpan
├── Dockerfile                   # build image untuk service "app"
├── docker-compose.yml           # service app + MySQL
├── .dockerignore
├── go.mod / go.sum
└── .env
```

## 1. Cara A — Jalankan dengan Docker (paling mudah, sudah termasuk MySQL)

Ini cara paling simpel karena MySQL ikut dijalankan otomatis lewat `docker-compose`, tidak perlu install MySQL manual.

1. Pastikan Docker & Docker Compose sudah terinstall.
2. Cek file `docker-compose.yml`, environment DB sudah diset di sana (`DB_HOST=db` — nama service MySQL, BUKAN `localhost`/`host.docker.internal`):
   ```yaml
   DB_USER: root
   DB_PASS: 281205
   DB_HOST: db
   DB_PORT: 3306
   DB_NAME: db_balikala
   ADMIN_EMAIL: admin@example.com
   ADMIN_PASSWORD: 281205
   JWT_SECRET: ...
   ```
3. Jalankan:
   ```bash
   docker compose up --build
   ```
   - Service `db` (MySQL 8.0) otomatis membuat database `db_balikala` (dari `MYSQL_DATABASE`) saat container pertama kali dibuat.
   - Service `app` menunggu MySQL benar-benar siap (`healthcheck`) sebelum start, lalu otomatis menjalankan `AutoMigrate` (membuat tabel `posts` dan `admins`) dan membuat akun admin default.
4. API langsung bisa diakses di `http://localhost:8080`.
5. Untuk stop:
   ```bash
   docker compose down
   ```
   Data MySQL & file upload tetap tersimpan di Docker volume (`mysql_data`, `uploads_data`) walau container dimatikan. Kalau mau reset total (hapus semua data termasuk admin & post):
   ```bash
   docker compose down -v
   ```
6. Cek isi MySQL dari dalam container (opsional, untuk debug):
   ```bash
   docker exec -it blog_mysql mysql -uroot -p281205 db_balikala
   ```

> Catatan: kalau port `3306` atau `8080` di komputer kamu sudah dipakai aplikasi lain, ubah saja bagian `ports:` di `docker-compose.yml`, misal `"3307:3306"`.

## 2. Cara B — Jalankan manual (tanpa Docker, MySQL diinstall sendiri)

1. Install MySQL di komputer (XAMPP/Laragon/MySQL Server biasa), lalu buat database:
   ```sql
   CREATE DATABASE db_balikala;
   ```
2. Ubah `.env` agar `DB_HOST` mengarah ke MySQL lokal:
   ```
   DB_USER=root
   DB_PASS=281205
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=db_balikala
   ADMIN_PASSWORD=281205
   JWT_SECRET=...
   ```
   (`host.docker.internal` hanya valid kalau aplikasi Go-nya dijalankan di dalam Docker tapi MySQL-nya di host — kalau keduanya manual di komputer yang sama, pakai `localhost`.)
3. Install dependency:
   ```
   go mod tidy
   ```
4. Jalankan server:
   ```
   go run ./cmd
   ```
Server jalan di `http://localhost:8080`. Tabel `posts` & `admins` dibuat otomatis lewat `AutoMigrate` saat pertama kali start.

Saat pertama kali start, sistem otomatis membuat 1 akun admin (karena tabel admin masih kosong):
- email: `admin@example.com`
- password: nilai `ADMIN_PASSWORD` di `.env`

(Bisa ganti email default dengan menambahkan `ADMIN_EMAIL=...` di `.env`.)

## 3. Akun admin default & Endpoint untuk ditest di Postman untuk ditest di Postman

| Method | Endpoint            | Auth          | Body (form-data / json)                  |
|--------|---------------------|---------------|-------------------------------------------|
| POST   | /api/login           | -             | json: `email`, `password`                 |
| GET    | /api/posts            | -             | query opsional: `?search=kata`             |
| GET    | /api/posts/:id        | -             | -                                          |
| POST   | /api/posts            | Bearer Token  | form-data: `title`, `content`, `image`(file) |
| PUT    | /api/posts/:id        | Bearer Token  | form-data: `title`, `content`, `image`(file, opsional) |
| DELETE | /api/posts/:id        | Bearer Token  | -                                          |

Untuk endpoint yang butuh auth, tambahkan header:
```
Authorization: Bearer <token_dari_login>
```

Gambar yang diupload bisa diakses via:
```
http://localhost:8080/uploads/<nama_file>
```

## 4. Urutan testing yang disarankan di Postman
1. `POST /api/login` dengan email & password admin default → ambil `token` dari response.
2. `POST /api/posts` (form-data, set Authorization Bearer token) → buat post baru.
3. `GET /api/posts` → cek list post.
4. `GET /api/posts/:id` → cek detail.
5. `PUT /api/posts/:id` → update post (pakai token).
6. `DELETE /api/posts/:id` → hapus post (pakai token).
