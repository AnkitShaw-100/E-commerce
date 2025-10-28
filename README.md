# E-commerce (Fullstack) — Project README

This repository contains a simple fullstack E-commerce project with a Node/Express backend and a React (Vite) frontend. The README below summarizes the routes, features, models, environment variables, and how to run the project locally based on the current code in the repository.

---

## Features (implemented so far)
- User authentication: sign-up, login, password reset (OTP flow).
- Role-based access: `buyer`, `seller`, `admin`.
- Product management: create (with image upload), read, update (including image management), delete.
- Order management: buyers can create orders and view their orders; sellers/admins can view/update orders; admin can view all orders.
- Image handling using Cloudinary and a temporary local upload (multer) pipeline.
- Frontend pages for home, shop, product add, cart, profile, auth and more (built with React + Vite).

---

## Tech stack
- Backend: Node.js, Express, MongoDB (Mongoose), Cloudinary, Multer, JWT, Nodemailer
- Frontend: React (Vite), Tailwind CSS (installed deps), Axios

---

## Backend — API Endpoints
Base URL in code: `http://localhost:5000`

All backend routes are mounted in `backend/index.js` under `/api/*`.

- Auth
  - `POST /api/auth/signup` — Register a new user (body: `name`, `email`, `password`, `role`)
  - `POST /api/auth/login` — Login (body: `email`, `password`) → returns `token` and user info
  - `POST /api/auth/forgot` — Request OTP for password reset (body: `email`)
  - `POST /api/auth/verify-otp` — Verify OTP (body: `email`, `otp`) → returns temporary token
  - `POST /api/auth/reset-password` — Reset password using token (body: `token`, `newPassword`)

- Users
  - `GET /api/users` — Get all users (currently public in routes)
  - `GET /api/users/me` — Get current authenticated user profile (requires `Authorization: Bearer <token>`)
  - `PUT /api/users/me` — Update current user profile (requires auth)

- Products (`/api/products`)
  - `GET /api/products` — Get list of products (public)
  - `GET /api/products/:id` — Get product by id (public)
  - `POST /api/products/addProduct` — Add product (requires auth; role `seller` or `admin`); supports file upload `image` and `images` in body
  - `PUT /api/products/:id` — Update product (requires auth; role `seller` or `admin`); supports file upload and image removal by `removeImagePublicIds`
  - `DELETE /api/products/:id` — Delete product (requires auth; role `admin` or `seller`)

- Orders (`/api/orders`)
  - `POST /api/orders` — Place an order (auth; role `buyer`) — body: `orderItems`, `totalPrice`
  - `GET /api/orders/my` — Get current buyer's orders (auth; role `buyer`)
  - `GET /api/orders/:id` — Get order by id (auth; roles `buyer`, `seller`, `admin`)
  - `GET /api/orders` — Get all orders (auth; role `admin`)
  - `PUT /api/orders/:id` — Update order status (auth; roles `seller`, `admin`)

Notes: many of these routes are implemented in `backend/routes/*.js` and handled in `backend/controllers/*.js`.

---

## Models (summary)
- `User` (`backend/models/User.js`)
  - `name`, `email` (unique), `password`, `phone`, `address`, `role` (`buyer|seller|admin`), `resetOtp`, `resetOtpExpires`
- `Product` (`backend/models/Product.js`)
  - `name`, `description`, `price`, `category`, `brand`, `stock`, `countInStock`, `images` (array of `{url, publicId}`), `seller` (User reference)
- `Order` (`backend/models/Order.js`)
  - `user` (User ref), `orderItems` (array of `{product (ref), name, qty, price}`), `totalPrice`, `status` (`Pending|Shipped|Delivered`)

---

## Frontend (what's implemented)
The frontend app (`frontend/vite-project`) uses React + Vite and communicates with the backend via Axios.

Main pages/components (in `src/components`):
- `Home` — root `/`
- `ShopPage` — `/shop` (lists products)
- `AddProduct` — `/add-product` (seller/admin product creation form)
- `MyProfile` — `/profile` (view/update profile)
- `userCart` — `/cart` (cart page)
- Auth pages: `Signup` `/signup`, `Login` `/login`, `ForgotPassword` `/forgot`
- `AboutUs`, `ContactUs` pages

API client: `src/components/api.js` creates an Axios instance and attaches the auth token from `localStorage`/`sessionStorage`. High-level API helper functions are in `src/services/apiServices.js`.

---

## Environment variables
Create a `.env` file inside `backend/` with values similar to:

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_here

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (optional - for OTP emails)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=no-reply@example.com
SMTP_SECURE=false
```

Notes:
- The code uses `process.env` to read these values via `dotenv`.
- If SMTP config is not provided the auth route falls back to a nodemailer test account for local development.

---

## Run the project locally (Windows PowerShell)

1) Backend

```powershell
cd backend
npm install
# create a .env file (see sample above)
# Start with node
node index.js
# or using nodemon (installed as dependency)
npx nodemon index.js
```

2) Frontend

```powershell
cd frontend/vite-project
npm install
npm run dev
```

Open the frontend at the URL printed by Vite (commonly `http://localhost:5173`). The backend default port is `5000` as configured in `backend/index.js`.

---

## Useful files & locations
- Backend entry: `backend/index.js`
- Backend routes: `backend/routes/*.js`
- Controllers: `backend/controllers/*.js`
- Models: `backend/models/*.js`
- Cloudinary utils: `backend/utils/uploadToCloudinary.js`
- Frontend entry: `frontend/vite-project/src/main.jsx` and `src/App.jsx`
- Frontend API helpers: `frontend/vite-project/src/components/api.js` and `src/services/apiServices.js`

---

## Known issues / notes
- A few controller functions contain minor bugs or typos (for example `req.json(...)` vs `res.json(...)`, or `req.param` vs `req.params`) — these are implementation details visible in `backend/controllers/*`. If you want, I can fix those and add tests.
- `GET /api/users` is currently unprotected in routes — verify intended behavior before exposing user lists in production.

---

## Next steps (suggested)
- Add `start` scripts to `backend/package.json` (e.g., `"start": "node index.js"`, and `dev` script for `nodemon`).
- Add basic input validation and request body validation (e.g., `express-validator`).
- Add tests for critical endpoints.
- Lock down `GET /api/users` or add admin-only authorization.

---

If you'd like, I can:
- generate an `.env.example` file,
- fix the minor controller bugs,
- add `npm` scripts (`start`/`dev`) and a sample `Procfile` for deployment,
- or generate API documentation (OpenAPI/Swagger) from the code.

Tell me which of the above you'd like next.
