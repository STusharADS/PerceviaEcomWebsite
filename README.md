


https://github.com/user-attachments/assets/faa04146-49d7-4296-b722-805574663b3d


## Percevia E‑com Landing & Preorder (MERN)

This repository contains the source for the Percevia e-commerce landing and preorder site — a MERN stack project (React + Vite frontend, Node/Express + Mongoose backend) that provides:

- A marketing landing site with hero video, demo, product specs and APK/QR download section.
- A Preorder form that saves entries (name, email, phone, qty, age, city) to MongoDB.
- An Admin dashboard to view and manage preorders and see simple analytics (age buckets, top cities, recent users).
- User authentication (JWT) and admin-only routes for management actions.

<img height="500" alt="image" src="https://github.com/user-attachments/assets/2d1119b2-e23b-49d6-973b-7f008c407463" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/7f505987-b177-447d-8c3a-796b74d9ade7" />


We are storing all the details of users and preorders in mongoDB and displaying them in the admin window.
  (The project also includes a standalone Flutter | Dart App for our users).

<img height="250" alt="image" src="https://github.com/user-attachments/assets/24c7bdfe-9343-4c1e-bb4a-d3b5e0376e34" />


## Tech stack

- Frontend: React, Vite, vanilla CSS / utility classes. Uses `import.meta.env.VITE_API_URL` to point at the backend.
- Backend: Node.js, Express, Mongoose (MongoDB), dotenv, bcrypt, jsonwebtoken (JWT), Render.
- Database: MongoDB (Atlas recommended in production).



















