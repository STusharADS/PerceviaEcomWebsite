
<img height="250" alt="image" src="https://github.com/user-attachments/assets/bbbdf0a6-1a59-41d5-b3bd-f7038a287fc2" />
<img  height="250"  alt="image" src="https://github.com/user-attachments/assets/46b5d945-79b1-4c87-ade6-2ff83f3bde40" />
<></>
# Percevia E‑com Landing & Preorder (MERN)

This repository contains the source for the Percevia e-commerce landing and preorder site — a MERN stack project (React + Vite frontend, Node/Express + Mongoose backend) that provides:

- A marketing landing site with hero video, demo, product specs and APK/QR download section.
- A Preorder form that saves entries (name, email, phone, qty, age, city) to MongoDB.
- An Admin dashboard to view and manage preorders and see simple analytics (age buckets, top cities, recent users).
- User authentication (JWT) and admin-only routes for management actions.

<img height="270" alt="image" src="https://github.com/user-attachments/assets/2d1119b2-e23b-49d6-973b-7f008c407463" />


This README explains how the project is organized, how to run it locally, the environment variables required, and deployment notes.

## Tech stack

- Frontend: React, Vite, vanilla CSS / utility classes. Uses `import.meta.env.VITE_API_URL` to point at the backend.
- Backend: Node.js, Express, Mongoose (MongoDB), dotenv, bcrypt, jsonwebtoken (JWT).
- Database: MongoDB (Atlas recommended in production).

## Environment variables

Create a `.env` (or set environment variables in your host) for the server. See `server/.env.example` for reference. Important variables:

- `MONGO_DB_URI` — full connection string to MongoDB (Atlas URI recommended).
- `JWT_SECRET` — secret used to sign JWTs (keep this secure in production).
- `PORT` — port the backend listens on (defaults are handled in code).

## To Run on your device locally

Prerequisites:

- Node.js (16+ recommended)
- npm
- A running MongoDB instance or Atlas cluster and the `MONGO_DB_URI` value

1) Clone the repository and install dependencies

```powershell
cd C:\Users\tusha\Desktop\CrazyProjects\PerceviaEcomWebsite
cd server
npm install
cd ..\client
npm install
```

2) Server — configure `.env` (example in `server/.env.example`) and start

```powershell
# from repository root
cd server
# create .env or set env vars; example values are in server/.env.example
npm run dev    # if a dev script exists (e.g. nodemon) or
node index.js   # runs server/index.js (ensure PORT and MONGO_DB_URI are set)
```

3) Client — run the dev server

```powershell
cd client
npm run dev
# Visit http://localhost:5173 (or the address printed by Vite)
```

Notes:
- The frontend reads the API base URL from `import.meta.env.VITE_API_URL`. For local dev you can set this in an `.env` file under `client/` (e.g. `VITE_API_URL=http://localhost:5000`) or let it default to relative calls.
- Typical backend port is `5000` or `process.env.PORT`.

## Build & production

Frontend:

```powershell
cd client
npm run build
# deploy the output in client/dist to your static host (Vercel, Netlify, S3+CloudFront, etc.)
```

Backend:

```powershell
cd server
npm install --production
npm start
# The server should serve API endpoints, e.g. GET /api/admin/preorders
```

Deployment notes:

- The project was designed for a split deployment: `client` deployed (Vercel/Netlify) and `server` hosted separately (Render/Railway/Heroku). When deploying, set `VITE_API_URL` for the deployed client to point at your server's base URL.
- Ensure `JWT_SECRET` and `MONGO_DB_URI` are set in your production environment.
- A `/healthz` endpoint is present for basic platform health checks.

## API (high level)

Public endpoints (examples):

- POST /api/preorders — submit a preorder payload { name, email, phone, qty, age, city }
- POST /api/auth/register — register new user (if implemented in your server routes)
- POST /api/auth/login — login and receive a JWT token

Admin endpoints (require Authorization: Bearer <token> of an admin user):

- GET /api/admin/preorders — list preorders (sorted: unprocessed first)
- PATCH /api/admin/preorders/:id — toggle processed state for a preorder
- DELETE /api/admin/preorders/:id — delete a preorder
- GET /api/admin/users — recent registered users (admin only)

If you need the exact request/response shapes, open the relevant server route files under `server/routes/`.

## Admin & auth notes

- The admin area in the frontend stores the JWT in `localStorage` under the key `percevia_token`.
- Admin routes on the server use a `requireAuth` + `requireAdmin` middleware to verify JWTs and roles. If tokens are invalid or `JWT_SECRET` doesn't match what was used to create the token, admin requests will return an authorization error.
- If you seed an admin account locally, ensure the `JWT_SECRET` used when seeding matches the running server's `JWT_SECRET`.

## Troubleshooting

- Admin dashboard shows empty lists but DB has documents:
	- Confirm the frontend is pointing to the correct backend URL (`VITE_API_URL`).
	- Confirm you are logged in as an admin (check `localStorage.getItem('percevia_token')`).
	- Check server logs for incoming admin API requests and any auth errors.

- Render/Vercel deploy issues:
	- For monorepos, set the service root (Render) or project root (Vercel) to `server` or `client` respectively when creating services.
	- Ensure `start` script exists in `server/package.json` for production start.

## Tests

There are no automated tests included by default. If you add tests, consider a GitHub Actions workflow that runs the server & client build and tests on push/PR.

## Contributing

Contributions are welcome. Please open an issue describing the feature or bug before submitting a PR. Keep changes focused and include tests where applicable.

## License

This project does not include a license file. Add a `LICENSE` if you intend to make it open-source; otherwise keep it private.

---

If you'd like, I can also:

- Add a short 'Quick start' script in `package.json` that runs both client and server in parallel for development.
- Add a sample `.env.local` for the frontend to demonstrate `VITE_API_URL` usage.

Tell me if you want the README adjusted (tone, length, or additional sections) and I will update it.











