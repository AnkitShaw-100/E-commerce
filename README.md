# Apni Dukan — E‑commerce (Full‑stack)

A responsive, Tailwind CSS + React (Vite) front-end with a Node/Express backend for an e‑commerce demo called "Apni Dukan." This repo contains both frontend and backend code under separate folders and a simple authentication flow (token-based). The README below explains how to run and develop the project locally using PowerShell (Windows).

---

## Table of Contents

- Project overview
- Features
- Tech stack
- Repository structure
- Prerequisites
- Environment variables
- Local setup (backend & frontend)
- Running the app (development)
- Building for production
- Authentication notes
- Troubleshooting
- Contributing
- License
- Contact

---

## Project overview

Apni Dukan is a small e‑commerce example project that demonstrates:

- Role-based signup/login (buyer/seller)
- Product listing and shop pages
- Cart and order creation
- Responsive UI built with Tailwind CSS
- Simple token-based authentication
- Modular frontend and backend for easy development

This repository contains two main folders:
- `frontend/vite-project` — React + Vite application (UI)
- `backend` — Node.js + Express API (data and auth)

> Note: The repo's `README.md` (this file) lives in the root so it covers both services.

---

## Features

- Landing / Home page with slider and categories
- Product listing (Shop) and product detail pages
- Add to cart, view cart and checkout (order creation)
- User profile management (My Profile)
- Contact form
- Authentication (login/signup) with JWT token stored in localStorage

---

## Tech stack

- Frontend: React (Vite), Tailwind CSS, React Router, react-icons
- Backend: Node.js, Express, (MongoDB expected if you use remote DB), cloudinary helper code included
- Dev tooling: npm, Vite, nodemon (recommended for backend dev)

---

## Repository structure

Top level:

```
/ (repo root)
  /backend
    index.js
    package.json
    controllers/
    models/
    routes/
    config/
  /frontend
    /vite-project
      package.json
      src/
        components/
        context/
        services/
      public/
  README.md  <-- this file
```

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- (Optional) MongoDB connection (Atlas or local) if you want persistent backend storage

---

## Environment variables

Create a `.env` (or similar) for backend and frontend as required. Example variables used by the project:

Backend `.env` (place inside `backend/`):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Frontend environment (Vite) — optional: inside `frontend/vite-project/.env` or `.env.local`:

```
VITE_API_URL=http://localhost:5000
```

> If you do not have a logout endpoint on the backend, the frontend performs client‑side logout by clearing stored tokens. If you add a logout route later, the frontend has an API helper in `src/services/apiServices.js` that can be adapted.

---

## Local setup (backend & frontend)

Open two terminals (PowerShell recommended) and run backend and frontend separately. Example commands below assume you're at the repo root.

Backend (PowerShell):

```powershell
cd .\backend
npm install
# run in development with nodemon (if configured) or node
npm run dev     # or: nodemon index.js / node index.js depending on package.json
```

Frontend (PowerShell):

```powershell
cd .\frontend\vite-project
npm install
npm run dev
# Vite will start on a port (commonly 5173). Open the printed URL.
```

---

## Running the app (development)

1. Start backend: backend listens on the port from `.env` (default 5000).
2. Start frontend with Vite: the UI will call the backend using `VITE_API_URL` or `http://localhost:5000` by default.
3. Open your browser at the Vite URL (e.g., `http://localhost:5173`).

---

## Building for production

Frontend (build):

```powershell
cd .\frontend\vite-project
npm run build
# The built files will be in dist/
```

Backend deployment: Use your preferred host (Heroku, Render, AWS, DigitalOcean). Ensure environment variables and DB are configured.

---

## Authentication notes

- Login/signup are implemented on the frontend under `src/components/authPages`.
- The `AuthContext` stores user data and token in `localStorage` when `login()` is called. Logging out clears the stored token and user from the client.
- If you want server-side logout/invalidation, add a `POST /api/auth/logout` route on the backend and update `apiServices.authAPI.logout()`.

---

## Troubleshooting

- If pages don't update after login/logout, ensure `AuthProvider` wraps your `Router` in `src/App.jsx` (it should wrap the Router to make the auth state available to `Navbar`).
- If CORS errors occur, configure CORS on the backend (allow the Vite origin during development).
- If images fail to upload, verify Cloudinary credentials in backend `.env`.

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-change`
3. Make changes and commit: `git commit -m "Describe change"`
4. Push and create a PR

Please keep changes small and focused. Add tests if you modify logic.

---

## License

This project does not include a formal license file in the repo. Add a `LICENSE` file if you want to make the project open-source under a specific license (MIT, Apache-2.0, etc.).

---

## Contact

If you need help or want me to implement any of the setup steps, routing fixes, or add a logout endpoint, tell me which part you'd like me to do next and I will implement it.

Happy coding! 🚀
