# 🛠️ QuickHire – Backend API

This is the core backend service for the **QuickHire** job board application. It manages job listings, applications.

---

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** Express.js / Node.js
- **Databases:** MongoDB (Atlas) 
- **ORM/ODM:** Mongoose 
- **Security:** JWT, Rate Limiting, CORS

---

## ✨ Features

- **Job Management:** Complete CRUD (Create, Read, Update, Delete) for job posts.
- **Advanced Search:** Backend support for keyword, category, and location filtering.
- **Secure Auth:** JWT-based authentication for admin routes.
- **Logging:** Comprehensive debug logging for development and production.

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/aiarnob23/QuickHire-Backend.git](https://github.com/aiarnob23/QuickHire-Backend.git)
cd QuickHire-Backend
bun install

Create a .env file in the root directory and fill in your credentials:

Code snippet
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=your_mongodb_or_postgresql_url
DATABASE_PASSWORD=your_db_password
DATABASE_USER=your_db_user

# Logging
LOG_LEVEL=debug
LOG_TO_FILE=false
LOG_FILE_PATH=logs/app.log

# Security
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d
JWT_ISSUER=ignitor-app

# Development mode
bun run dev

# Production mode
bun start