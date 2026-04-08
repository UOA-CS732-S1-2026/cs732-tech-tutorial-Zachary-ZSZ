# ClassicRide

**The Cinematic Archive of Automotive Heritage**

ClassicRide is a luxury automotive exhibition web application that presents classic and iconic vehicles as a curated technical narrative. Built on the MERN stack, it features a full-screen timeline browsing experience, a dynamic technical sidebar, and a curator admin panel for managing the collection.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [Seeding the Database](#seeding-the-database)
- [API Overview](#api-overview)
- [Available Scripts](#available-scripts)

---

## Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Frontend       | React 18 + Vite                                 |
| Styling        | Tailwind CSS v3 (custom design token system)    |
| Routing        | React Router v6                                 |
| Server State   | TanStack Query (React Query v5)                 |
| UI State       | Zustand                                         |
| Animation      | Framer Motion                                   |
| Backend        | Node.js + Express                               |
| ODM            | Mongoose                                        |
| Database       | MongoDB (Atlas recommended)                     |
| Auth           | JWT + bcryptjs (curator admin only)             |
| Image Uploads  | Multer + Cloudinary                             |

---

## Project Structure

```
ClassicRide/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Header, Footer
│   │   │   ├── ui/                # Chip, PillButton, GhostButton, VignetteImage
│   │   │   ├── timeline/          # TimelineSection, TimelineNode
│   │   │   ├── sidebar/           # TechnicalSidebar
│   │   │   └── filter/            # FilterBar
│   │   ├── pages/                 # Home, MarquePage, CarDetail, Archive, admin/
│   │   ├── hooks/                 # useCars, useMarques
│   │   ├── services/              # api.js — Axios instance + all API calls
│   │   └── store/                 # filterStore.js (Zustand)
│   ├── tailwind.config.js         # All design tokens
│   └── vite.config.js             # Dev server + /api proxy
├── server/
│   ├── models/                    # Car, Marque, Inquiry, User
│   ├── routes/                    # cars, marques, inquiries, auth
│   ├── controllers/               # Business logic per resource
│   ├── middleware/                 # auth.js (JWT), errorHandler.js
│   └── seed/
│       └── seed.js                # Database seed script (43 cars, 9 marques)
├── .env.example                   # Environment variable template
├── package.json                   # Root scripts (dev, build, seed)
└── README.md
```

---

## Prerequisites

Ensure the following are installed before proceeding:

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (bundled with Node.js)
- **MongoDB Atlas account** (free tier is sufficient) — [mongodb.com/atlas](https://www.mongodb.com/atlas)
- **Cloudinary account** (free tier, required only for image uploads) — [cloudinary.com](https://cloudinary.com)

---

## Installation

Clone the repository and install dependencies for all three workspaces (root, client, server):

```bash
git clone https://github.com/Zachary-ZSZ/ClassicRide.git
cd ClassicRide

# Install root dev tools (concurrently)
npm install

# Install frontend dependencies
npm install --prefix client

# Install backend dependencies
npm install --prefix server
```

---

## Environment Configuration

Copy the example environment file and fill in your own values:

```bash
cp .env.example .env
```

Open `.env` and configure each variable:

```env
# ── MongoDB ──────────────────────────────────────────────────────────────────
# The MONGO_URI for this project is provided via the Canvas assignment submission.
# Please refer to the Canvas assignment page to obtain the connection string,
# or contact zacharyzhang2088@gmail.com if you have any questions.
MONGO_URI=<see Canvas assignment or contact zacharyzhang2088@gmail.com>

# ── JSON Web Token ────────────────────────────────────────────────────────────
# A long random string used to sign curator JWTs.
# Generate one with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_64_char_random_secret_here

# Token expiry duration (e.g. 7d, 24h)
JWT_EXPIRES_IN=7d

# ── Cloudinary (image uploads) ────────────────────────────────────────────────
# Found in your Cloudinary dashboard under Settings → API Keys.
# Only required if you use the admin panel to upload images.
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Server ────────────────────────────────────────────────────────────────────
PORT=5000
NODE_ENV=development
```

> **MongoDB credentials:** The `MONGO_URI` for this project is distributed through the Canvas assignment submission. If you are a course assessor, please check the Canvas assignment page for the connection string. For any other queries, reach out to **zacharyzhang2088@gmail.com**.

---

## Running the Project

Start both the frontend (port 5173) and backend (port 5000) with a single command from the project root:

```bash
npm run dev
```

This runs `concurrently` to launch:

| Service  | URL                       | Description                      |
|----------|---------------------------|----------------------------------|
| Frontend | http://localhost:5173     | React + Vite dev server          |
| Backend  | http://localhost:5000     | Express API server               |

The Vite dev server automatically proxies all `/api` requests to `http://localhost:5000`, so no cross-origin configuration is needed during development.

Once both services are running, open **http://localhost:5173** in your browser.

---

## Seeding the Database

The project includes a seed script that populates the database with **9 marques** and **43 classic vehicles**, each with descriptions, technical specifications, provenance notes, and Wikipedia Commons images.

Run the seed script once after your first setup (make sure the backend is **not** running when you seed, or run it separately):

```bash
# From the project root
npm run seed
```

Expected output:

```
MongoDB connected
Cleared existing data
Inserted 9 marques
Inserted 43 cars

Seed complete!
  Marques: Bugatti, Ferrari, Lamborghini, Porsche, Mercedes-Benz, BMW, Volkswagen, Ford, Toyota
  ...
```

> The seed script is **idempotent** — running it multiple times will clear and re-insert data cleanly.

---

## API Overview

The backend exposes the following REST endpoints. Protected routes require an `Authorization: Bearer <token>` header.

| Method | Route                   | Auth | Description                               |
|--------|-------------------------|------|-------------------------------------------|
| GET    | `/api/health`           | —    | Health check (`{ status, db }`)           |
| GET    | `/api/cars`             | —    | List cars; supports `?marque=`, `?era=`, `?sort=` |
| GET    | `/api/cars/:slug`       | —    | Single car detail (populated marque)      |
| POST   | `/api/cars`             | ✓    | Create a new car                          |
| PUT    | `/api/cars/:slug`       | ✓    | Update a car                              |
| DELETE | `/api/cars/:slug`       | ✓    | Delete a car                              |
| GET    | `/api/marques`          | —    | All marques                               |
| GET    | `/api/marques/:slug`    | —    | Marque profile + its cars                 |
| POST   | `/api/inquiries`        | —    | Submit a visitor inquiry                  |
| GET    | `/api/inquiries`        | ✓    | List all inquiries (curator)              |
| POST   | `/api/auth/login`       | —    | Curator login — returns JWT               |
| POST   | `/api/auth/register`    | ✓    | Create a curator account (requires token) |

**Sort options for `/api/cars`:**

| Value       | Description          |
|-------------|----------------------|
| `year_asc`  | Oldest first         |
| `year_desc` | Newest first         |
| `name_az`   | Name A → Z           |
| `name_za`   | Name Z → A           |

---

## Available Scripts

All commands are run from the **project root** unless noted.

| Command         | Description                                                  |
|-----------------|--------------------------------------------------------------|
| `npm run dev`   | Start frontend + backend concurrently in development mode    |
| `npm run seed`  | Populate the database with 9 marques and 43 cars             |
| `npm run build` | Build the frontend for production (`client/dist/`)           |
| `npm start`     | Start the Express server in production mode                  |

---

## Notes

- **No production deployment is configured.** The project is intended to run locally. There is no CI/CD pipeline or hosting setup.
- **Admin panel** is accessible at `/admin/login`. Use `POST /api/auth/register` (with a valid JWT) to create the initial curator account.
- All car images are sourced from **Wikimedia Commons** (public domain / freely licensed). No third-party image CDN keys are required to run the project.

---

## Additional Folders

The repository includes two folders that are **not part of the core project structure** and can be safely deleted if they are not needed:

| Folder     | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| `design/`  | Personal UI design drafts and prototype files used as visual references during development. Not required to run the application. |
| `dataset/` | Raw data files (CSV / JSON) used as the source material when writing the database seed script. Not required once the database has been seeded. |
