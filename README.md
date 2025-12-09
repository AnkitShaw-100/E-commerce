# E-commerce Project

A fullstack e-commerce application built with **Node.js/Express** (backend) and **React/Vite** (frontend).

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Routes](#backend-routes)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)

---

## Features

### Backend (Completed)
-  User authentication (register, login, role-based access)
-  Password hashing with bcrypt
-  JWT token generation and verification
-  Role-based authorization (Admin = role 1, User = role 0)
-  Protected routes with middleware
-  Admin-only test routes
-  User model with roles, phone, address support
-  Error handling and logging

### Frontend (In Progress)
- React components structure
- Vite build tooling
- TailwindCSS styling

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcrypt
- **Logging:** Morgan
- **Utilities:** dotenv

### Frontend
- **Library:** React
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM

---

## Backend Routes

### Authentication Routes
**Base URL:** `http://localhost:8080/api/v1/auth`

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | `/register` | Register a new user | ❌ No |
| POST | `/login` | Login user and get JWT token | ❌ No |

### Test Routes (Protected)
**Base URL:** `http://localhost:8080/api/v1/test`

| Method | Route | Description | Auth Required | Role Required |
|--------|-------|-------------|---------------|---------------|
| GET | `/user` | Test authenticated user access | ✅ Yes | Any (0 or 1) |
| GET | `/admin` | Test admin-only access | ✅ Yes | Admin (1) |

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to backend folder:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file in `backend/` directory:
```env
PORT=8080
DEV_MODE=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the backend server:
```powershell
# Development mode (with auto-reload)
npm run server

# Production mode
npm start
```

Server will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend folder:
```powershell
cd frontend/vite-project
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

Frontend will run on `http://localhost:5173` (or similar - check terminal output)

---

## Running the Project

### Option 1: Run Backend and Frontend Separately (Recommended for Development)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run server
```

**Terminal 2 - Frontend:**
```powershell
cd frontend/vite-project
npm run dev
```

Then open: `http://localhost:5173`

### Option 2: Run Backend Only (for API testing)

```powershell
cd backend
npm run server
```

Test with Postman or curl

---

## API Documentation

### Register User
```http
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main Street, City"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User Registered Successfully",
  "user": { ... }
}
```

---

### Login User
```http
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main Street, City",
    "role": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Test Admin Route
```http
GET http://localhost:8080/api/v1/test/admin
Authorization: Bearer <your_jwt_token>
```

**Response (if role = 1):**
```json
{
  "success": true,
  "message": "Hello Admin! You have access to this protected route."
}
```

**Response (if role = 0):**
```json
{
  "success": false,
  "message": "Unauthorized Access - Admin only"
}
```

---

### Test User Route
```http
GET http://localhost:8080/api/v1/test/user
Authorization: Bearer <your_jwt_token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Hello User! You are authenticated."
}
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=8080
DEV_MODE=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
```

---

## Project Structure

```
ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Auth logic (register, login)
│   ├── helper/
│   │   └── authHelper.js         # Password hashing & comparison
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification & role checks
│   ├── models/
│   │   └── userModels.js         # User schema
│   ├── routes/
│   │   ├── authRoute.js          # Auth endpoints
│   │   └── testRoute.js          # Protected test endpoints
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Entry point
├── frontend/
│   └── vite-project/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
└── README.md
```

---

## Troubleshooting

### Backend won't start
- Check if port 8080 is available
- Ensure MongoDB is running
- Check `.env` file exists with correct values
- Run `npm install` to ensure all dependencies are installed

### Frontend won't start
- Check if port 5173 is available
- Delete `node_modules` and run `npm install` again
- Clear browser cache

### Cannot access protected routes
- Ensure you're sending a valid JWT token in the `Authorization` header
- Token should be prefixed with `Bearer ` (e.g., `Bearer eyJhbGc...`)
- Check if token has expired (default expiry: 24 hours)
