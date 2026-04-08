# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClassicRide ("The Cinematic Archive") is a luxury automotive exhibition web app built with the MERN stack. The design prototype lives in `design/stitch_classic_car_legacy/` and is the single source of truth for all visual decisions.

- **Design prototype**: `design/stitch_classic_car_legacy/code.html` — reference for every component's appearance
- **Design spec**: `design/stitch_classic_car_legacy/DESIGN.md` — authoritative design system rules
- **Visual mockup**: `design/stitch_classic_car_legacy/screen.png`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 (`client/tailwind.config.js`) |
| Routing | React Router v6 |
| Server state | TanStack Query (React Query) |
| UI state | Zustand (`filterStore` — active marque/era/sort) |
| Animation | Framer Motion (page transitions, sidebar slide) |
| Backend | Node.js + Express |
| ODM | Mongoose |
| Database | MongoDB (Atlas) |
| Auth | JWT + bcrypt (curator admin only) |
| Image uploads | Multer + Cloudinary |

## Repository Structure

```
ClassicRide/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Header, Footer
│   │   │   ├── ui/            # Chip, PillButton, GhostButton, VignetteImage
│   │   │   ├── timeline/      # TimelineSection, TimelineNode
│   │   │   ├── sidebar/       # TechnicalSidebar
│   │   │   └── filter/        # FilterBar
│   │   ├── pages/             # Home, MarquePage, CarDetail, Archive, admin/
│   │   ├── hooks/             # useCars, useMarques, useSidebar
│   │   ├── services/api.js    # Axios instance + all API calls
│   │   └── store/filterStore.js
│   └── tailwind.config.js     # All design tokens (migrated from prototype)
├── server/
│   ├── models/                # Car, Marque, Inquiry, User
│   ├── routes/                # cars, marques, inquiries, auth
│   ├── controllers/
│   ├── middleware/            # auth.js (JWT), upload.js, errorHandler.js
│   └── seed/seed.js           # Seed DB with initial cars/marques
├── design/stitch_classic_car_legacy/   # Prototype (read-only reference)
└── .env                       # MONGO_URI, JWT_SECRET, CLOUDINARY_*
```

## Development Commands

```bash
# Install all dependencies
npm install && npm install --prefix client && npm install --prefix server

# Start dev (client on :5173 + server on :5000, concurrently)
npm run dev

# Seed the database (run once after first setup)
node server/seed/seed.js

# Build frontend for production
npm run build

# Start production server (serves client/dist + /api)
npm start
```

Vite proxies `/api` → `http://localhost:5000` in dev. In production, Express serves `client/dist/` as static files.

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/cars` | — | List; `?marque=porsche&era=golden-age&sort=year_asc` |
| GET | `/api/cars/:slug` | — | Single car (populated marque) |
| POST | `/api/cars` | ✓ | Create |
| PUT | `/api/cars/:slug` | ✓ | Update |
| DELETE | `/api/cars/:slug` | ✓ | Delete |
| GET | `/api/marques` | — | All marques |
| GET | `/api/marques/:slug` | — | Marque + its cars |
| POST | `/api/inquiries` | — | Submit provenance inquiry |
| GET | `/api/inquiries` | ✓ | List inquiries (curator) |
| POST | `/api/auth/login` | — | Returns JWT |

Protected routes require `Authorization: Bearer <token>` header.

## Route Structure

```
/                    → Home (hero + filter bar + timeline + sidebar)
/marque/:slug        → Marque profile + filtered timeline
/car/:slug           → Full car detail (specs, provenance, image gallery, inquiry form)
/archive             → Searchable grid of all cars
/admin/login         → Curator login
/admin               → Curator dashboard (CRUD for cars)
```

## Data Model (Car Schema)

```js
{
  slug, name, year, era, category, description,
  marque: ObjectId → Marque,
  specs: { engine, power, topSpeed, weight },
  provenance,          // long-form narrative
  images: [{ url, alt, primary }],
  featured: Boolean,
}
```

## Design System — Key Rules

All rules are authoritative from `DESIGN.md`. The most important:

**Colors** (all defined as Tailwind tokens in `client/tailwind.config.js`):
- `surface` (#131313) — base background; never pure black or white
- `primary` (#e6c364) — Champagne Gold; use sparingly for highlights only
- `on-surface` (#e5e2e1) — body text; never `#FFFFFF`
- `primary-container` (#c9a84c) — darker gold; timeline connector line, sidebar headings
- Surface depth stack: `surface-container-lowest` → `low` → `high` → `highest`

**No-Line Rule**: Separate sections via background-color shifts, never `border` or `divide-*` between content sections.

**Typography** (semantic Tailwind utilities, defined in `tailwind.config.js`):
- `text-display-lg` — monumental car names, `font-headline` (Noto Serif) italic
- `text-headline` — heritage titles, serif italic
- `text-title` / `text-body` — Inter (sans)
- `text-label-sm` — metadata, ALL CAPS, `tracking-[0.1rem]`

**Animation**: Always `duration-[400ms]`–`duration-[500ms]` `ease-in-out`. Never `duration-700` or faster than 400ms.

**Buttons**:
- Primary pill: `rounded-full bg-primary text-on-primary`
- Ghost: `rounded-full border border-outline-variant/40 text-primary`
- Gradient CTA (high-value): `bg-gradient-to-br from-primary to-primary-container rounded-full` — use for "Request Provenance" and primary actions

**Cards**: `bg-surface-container-lowest` on `surface` background. No opaque borders.

**Timeline**: Single `w-px bg-primary-container/30` vertical line connecting nodes. No horizontal dividers. Nodes alternate `flex-row` / `flex-row-reverse` by index.

**Glassmorphism** (header/overlays): `bg-surface-bright/60 backdrop-blur-xl`

**TechnicalSidebar**: `w-[450px] bg-surface-container-lowest border-l border-outline-variant/10`. Slides in via Framer Motion on mobile. Syncs to the clicked timeline node — reads `useCar(selectedSlug)` internally.
