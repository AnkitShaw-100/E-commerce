# Project Tasks & Roadmap

This file lists remaining work required to complete and improve the E-commerce project. Items are prioritized and grouped. Feel free to ask me to start implementing any one of these.

**High Priority**
- **Fix backend controller bugs:** Correct `req.json`/`res.json`, `req.param`/`req.params`, and similar typos (see `backend/controllers/*.js`).
- **Add request validation:** Use `express-validator` (or similar) for auth, product and order endpoints.
- **Protect sensitive endpoints:** Restrict `GET /api/users` and any other admin-only routes; check role checks in middleware (`authorizeRoles`).
- **Add `env.example` & scripts:** Add `backend/.env.example`, and `start` / `dev` scripts in `backend/package.json`.

**Medium Priority**
- **Add unit & integration tests:** Jest or Mocha + Supertest for API endpoints (auth, products, orders).
- **Add API documentation:** Generate OpenAPI/Swagger docs for the REST API.
- **Add Dockerfile & deployment files:** Create `Dockerfile`, `docker-compose.yml` (optional), and a sample `Procfile` or GH Actions workflow for deployment.
- **Configure CI/CD:** Set up GitHub Actions to run lint/tests and optionally build/deploy.

**Frontend Improvements**
- **Form validation & UX:** Validate signup/login, product add/edit forms; show clear errors and loading states.
- **Cart persistence & flows:** Ensure cart persists across sessions and supports checkout flow.
- **Product listing UX:** Add pagination, search, sorting, and product detail page.
- **Image preview & upload UX:** Show previews for uploaded images before submit.

**Image & Storage**
- **Improve image lifecycle:** Ensure local temp files cleaned reliably and Cloudinary errors handled gracefully (`backend/utils/uploadToCloudinary.js`).
- **Support multiple uploads:** Improve frontend and backend to handle multiple images consistently.

**Performance & Observability**
- **DB indexes & queries:** Add necessary MongoDB indexes for frequent queries (e.g., `Product` category, `Order` user).
- **Caching:** Add caching for product listing (Redis or in-memory) if needed.
- **Logging & monitoring:** Integrate a logging system (winston/pino) and error tracking (Sentry or similar).

**Security**
- **Rate limiting & brute-force protection:** Add rate limit middleware for auth and OTP endpoints.
- **Sanitize inputs:** Prevent injection attacks and validate uploaded file types/sizes.
- **Secrets management:** Ensure secrets are never committed; recommend using environment manager or secret store in production.

**Optional / Nice-to-have**
- **Email templates:** Improve email content and implement transactional email provider for production.
- **Admin dashboard:** Small admin UI for managing users, orders, products.
- **Analytics & metrics:** Add basic metrics for traffic, orders conversion.

---

How I can help next (pick one):
- Fix the controller bugs now (I'll run quick tests against the controllers).
- Create `backend/.env.example` and update `backend/package.json` scripts.
- Add input validation for auth and product endpoints.
- Scaffold tests for one endpoint (e.g., `POST /api/auth/signup`).

Tell me which task to start with and I will begin.
