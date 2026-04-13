# ClassicRide

English | [中文](README-Chinese.md)

## Introduction

ClassicRide is a full-stack MERN web application built as the companion demo codebase for the **University of Auckland CS732 (2026 S1) Tech Tutorial assignment**. The project demonstrates how two AI-powered development tools — **Google Stitch** (for UI design generation) and **Claude Code** (for AI-assisted full-stack development) — can be used together to drive the entire lifecycle of a modern web application, from visual design to production-ready code.

The application itself is a luxury automotive exhibition platform that presents classic and iconic vehicles as a curated cinematic narrative. It features a full-screen timeline browsing experience, a dynamic technical sidebar, and a curator admin panel for managing the collection.

> This repository is intended to be viewed alongside the accompanying video presentation. The video introduces the AI tooling workflow in detail; the codebase serves as the hands-on reference.

---

## Table of Contents

- [ClassicRide](#classicride)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Step1: Dependencies Installation](#step1-dependencies-installation)
    - [Step2: Environment Configuration](#step2-environment-configuration)
    - [Step3(Optional): Seeding the Database](#step3optional-seeding-the-database)
    - [Step4: Running the Project](#step4-running-the-project)
  - [API Overview](#api-overview)
  - [Available Scripts](#available-scripts)
  - [Notes](#notes)
  - [Additional Folders](#additional-folders)

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
| Database       | MongoDB (Atlas)                                 |
| Auth           | JWT + bcryptjs (curator admin only)             |

---

## Project Structure

```text
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
│   ├── middleware/                # auth.js (JWT), errorHandler.js
│   └── seed/
│       └── seed.js                # Database seed script (43 cars, 9 marques)
├── .env.example                   # Environment variable template
├── package.json                   # Root scripts (dev, build, seed)
└── README.md
```

> **Note on Claude Code files:** The diagram above shows only the core application structure. The actual repository also contains Claude Code configuration files (`.claude/` & CLAUDE.md) generated during AI-assisted development. These are intentionally kept in the repository so that viewers can follow along with the video presentation and see the exact development environment used. Refer to the video for a walkthrough of how these files were used.

---

## Prerequisites

Ensure the following are installed before proceeding:

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (bundled with Node.js)
- **MongoDB Atlas account** *(only needed if connecting to your own database)* — [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## Installation

### Step1: Dependencies Installation

Open your terminal in VCode or your preferred IDE, then fellow the steps and commands below:
Clone the repository and install dependencies for all three workspaces (root, client, server):

```bash
git clone https://github.com/UOA-CS732-S1-2026/cs732-tech-tutorial-Zachary-ZSZ.git
cd cs732-tech-tutorial-Zachary-ZSZ

# Install root dev tools (concurrently)
npm install

# Install frontend dependencies
npm install --prefix client

# Install backend dependencies
npm install --prefix server
```

---

### Step2: Environment Configuration

Copy the example environment file:

```bash
# Windows PowerShell/ macOS / Linux / Git Bash
cp .env.example .env

# Only if your terminal environment is Windows CMD, then use the command below:
copy .env.example .env
```

Then open `.env` and replace only the `MONGO_URI` value — all other variables are pre-filled and ready to use:

```env
# ── MongoDB ──────────────────────────────────────────────────────────────────
# Provided via the Canvas assignment page. Contact zacharyzhang2088@gmail.com if needed.
MONGO_URI=<see Canvas assignment or contact zacharyzhang2088@gmail.com>

# ── JSON Web Token ────────────────────────────────────────────────────────────
JWT_SECRET=76c90f6b6ea8cf04282fe7527c97d1124d6d90eb4a280312c5bd303458ce05bb80eec6fad51e592412de5eadb743950c6a9f96e2e851c7202600a906570beaef
JWT_EXPIRES_IN=7d

# ── Server ────────────────────────────────────────────────────────────────────
PORT=5000
NODE_ENV=development
```

> **MongoDB credentials:** The `MONGO_URI` for this project is distributed through the Canvas assignment submission. If you are a course assessor or peer reviewer, please check the Canvas assignment page for the connection string. For any other queries, reach out to **zacharyzhang2088@gmail.com**.

---

### Step3(Optional): Seeding the Database

> **<u>If you are using the shared `MONGO_URI` provided via Canvas, the database is already fully seeded — you do not need to run this step.</u>** Skip directly to step4 [Running the Project](#running-the-project).
>
>**<u>！！！Only follow this section if you are connecting to your own MongoDB instance.！！！</u>**

The project includes a seed script that populates the database with **9 marques** and **43 classic vehicles**, each with descriptions, technical specifications, provenance notes, and Wikimedia Commons images.

Run the seed script once before starting the server (make sure the backend is **not** already running):

```bash
# From the project root
npm run seed
```

Expected output:

```text
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

### Step4: Running the Project

Start both the frontend (port 5173) and backend (port 5000) with a single command from the project root:

```bash
npm run dev
```

This runs `concurrently` to launch:

| Service  | URL                                   | Description             |
|----------|---------------------------------------|-------------------------|
| Frontend | <http://localhost:5173>               | React + Vite dev server |
| Backend  | <http://localhost:5000>               | Express API server      |

The Vite dev server automatically proxies all `/api` requests to `http://localhost:5000`, so no cross-origin configuration is needed during development.

Once both services are running, open <http://localhost:5173> in your browser.

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

| Value       | Description  |
|-------------|--------------|
| `year_asc`  | Oldest first |
| `year_desc` | Newest first |
| `name_az`   | Name A → Z   |
| `name_za`   | Name Z → A   |

---

## Available Scripts

All commands are run from the **project root** unless noted.

| Command         | Description                                                |
|-----------------|------------------------------------------------------------|
| `npm run dev`   | Start frontend + backend concurrently in development mode  |
| `npm run seed`  | Populate the database with 9 marques and 43 cars           |
| `npm run build` | Build the frontend for production (`client/dist/`)         |
| `npm start`     | Start the Express server in production mode                |

---

## Notes

- **No production deployment is configured.** The project is intended to run locally. There is no CI/CD pipeline or hosting setup.
- **Admin panel** is accessible at `/admin/login`. Use `POST /api/auth/register` (with a valid JWT) to create the initial curator account.
- All car images are sourced from **Wikimedia Commons** (public domain / freely licensed). No third-party image CDN keys are required to run the project.

---

## Additional Folders

The repository includes two folders that are **not part of the core application** and can be safely ignored:

| Folder     | Description                                                                                                                             |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `design/`  | UI design prototype and visual reference files generated with Google Stitch, used as the single source of truth during development. Not required to run the application. |
| `dataset/` | Raw data files (CSV / JSON) used as source material when writing the database seed script. Not required once the database has been seeded. |
