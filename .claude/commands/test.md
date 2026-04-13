# ClassicRide — Full Project Test Suite

You are an automated test runner for the ClassicRide MERN project. Execute the complete test suite in the following four phases in order, and output a structured test report.

## Execution Rules

- ✅ **PASS** — check passed
- ❌ **FAIL** — check failed; must display the actual error value
- ⚠️ **WARN** — file/feature not yet implemented (expected when the corresponding phase is incomplete; does not count as a failure)
- API tests assume the server is running at `http://localhost:5000` and the frontend at `http://localhost:5173`
- If services are not started, mark API tests as ⚠️ WARN with the reason
- Output a summary table at the end

---

## Phase 1 — Design System Migration & React Scaffold

### P1-1: Monorepo Root Structure
Check that the following files exist:
`package.json`, `.gitignore`, `.gitattributes`, `.env.example`, `CLAUDE.md`

Verify that the root `package.json` scripts include: `dev` (concurrently), `build`, `start`, `seed`

### P1-2: Client Project Structure
Check that the following files exist:
`client/package.json`, `client/vite.config.js`, `client/index.html`, `client/postcss.config.js`, `client/tailwind.config.js`

Verify that `client/vite.config.js` configures a `/api` proxy pointing to `localhost:5000`

### P1-3: Tailwind Color Token Completeness
Read `client/tailwind.config.js` and verify that `theme.extend.colors` contains the following key tokens:
`primary`, `primary-container`, `on-primary`, `surface`, `surface-container-lowest`, `surface-container-low`, `surface-container-high`, `surface-container-highest`, `surface-bright`, `surface-variant`, `on-surface`, `on-surface-variant`, `outline`, `outline-variant`, `background`

### P1-4: Tailwind Semantic Font Sizes
Verify that `theme.extend.fontSize` contains: `display-lg`, `display`, `headline`, `title`, `label-sm`
Verify that `display-lg` has a lineHeight <= 1.1 (monumental sizes require compact line height)

### P1-5: Tailwind Font Families & Border Radius
Verify that `fontFamily` contains: `headline` (Noto Serif), `body` (Inter), `label` (Inter)
Verify that `borderRadius` contains: `DEFAULT` (1rem), `lg`, `xl`, `full` (9999px)

### P1-6: index.css Custom Utility Classes
Read `client/src/styles/index.css` and verify it contains:
- `@tailwind base/components/utilities` — all three directives
- `.vignette-overlay` (radial-gradient)
- `.sidebar-transition` (cubic-bezier luxury transition)
- `.shadow-ambient` (high-blur low-spread shadow)
- `.bg-gradient-cta` (45° gold gradient)

### P1-7: main.jsx Provider Assembly Order
Read `client/src/main.jsx` and verify:
- `QueryClientProvider` wraps `BrowserRouter`, or `BrowserRouter` wraps `QueryClientProvider`, and both wrap `<App />`
- `QueryClient` is configured with `staleTime` (not using the default 0)

### P1-8: App.jsx Route Table Completeness
Read `client/src/App.jsx` and verify it contains the following 6 routes:
`/`, `/marque/:slug`, `/car/:slug`, `/archive`, `/admin/login`, `/admin` (`/admin` protected by ProtectedRoute)

### P1-9: ProtectedRoute Security Logic
Read `client/src/components/auth/ProtectedRoute.jsx` and verify:
- Reads `token` from localStorage
- When no token, redirects to `/admin/login` using `<Navigate>` without rendering child components

### P1-10: UI Atomic Component Exports
Read `client/src/components/ui/index.js` and verify it exports: `Chip`, `PillButton`, `GhostButton`, `VignetteImage`, `SectionLabel`

### P1-11: Chip Component Design Compliance
Read `client/src/components/ui/Chip.jsx` and verify:
- Active state class includes `bg-primary` and `text-on-primary`
- Inactive state class includes `bg-surface-container-high`
- Transition duration is in the 300ms–600ms range (must not be less than 300ms or greater than 600ms)

### P1-12: VignetteImage Animation Compliance
Read `client/src/components/ui/VignetteImage.jsx` and verify:
- Uses `duration-500` (must not use `duration-700`, which exceeds the 600ms luxury limit)
- Includes `ease-in-out`
- Includes `vignette-overlay` class
- Has `loading="lazy"` for lazy image loading

### P1-13: PillButton Three-State Variants
Read `client/src/components/ui/PillButton.jsx` and verify:
- Supports `variant="primary"` / `"ghost"` / `"gradient"` three variants
- Gradient variant uses `bg-gradient-cta`

### P1-14: Header Glassmorphism Compliance
Read `client/src/components/layout/Header.jsx` and verify:
- `fixed` + `z-50` positioning
- Includes `backdrop-blur-xl`
- Navigation links use `NavLink` (React Router), not native `<a>` tags

> Note: Header has no mobile menu button — this is an intentional design decision and is not a check item.

### P1-15: Footer Design Compliance
Read `client/src/components/layout/Footer.jsx` and verify:
- Uses `border-outline-variant/20` top border (follows No-Line Rule)
- Copyright year is dynamically generated (`new Date().getFullYear()`)
- Links use `Link` (React Router)

---

## Phase 2 — MongoDB Schema & Express API

### P2-1: Server File Structure
Check that all of the following files exist:
`server/index.js`, `server/models/Car.js`, `server/models/Marque.js`, `server/models/Inquiry.js`, `server/models/User.js`, `server/controllers/carController.js`, `server/controllers/marqueController.js`, `server/controllers/inquiryController.js`, `server/controllers/authController.js`, `server/routes/cars.js`, `server/routes/marques.js`, `server/routes/inquiries.js`, `server/routes/auth.js`, `server/middleware/auth.js`, `server/middleware/errorHandler.js`, `server/seed/seed.js`

### P2-2: Car Schema Completeness
Read `server/models/Car.js` and verify:
- `slug` has `unique: true` and `index: true`
- `marque` is an ObjectId ref `'Marque'`
- `era` has an enum constraint
- `category` has an enum constraint
- `specs` is a nested Schema (containing engine/power/topSpeed/weight)
- `images` is an array Schema (containing url/alt/primary)
- Has a `primaryImage` virtual field
- Has `timestamps: true`

### P2-3: User Schema Security
Read `server/models/User.js` and verify:
- Field is named `passwordHash` (not `password`)
- `toJSON` transform removes `passwordHash`
- Has a `comparePassword` instance method (using bcrypt.compare)

### P2-4: Auth Middleware Completeness
Read `server/middleware/auth.js` and verify:
- Checks for `Bearer ` prefix
- Returns 401 when no token
- Uses `jwt.verify` passing `process.env.JWT_SECRET`
- Returns 401 on verification failure

### P2-5: errorHandler Coverage
Read `server/middleware/errorHandler.js` and verify it handles:
- `ValidationError` → 400
- Code `11000` (duplicate key) → 409
- `CastError` → 400
- Default → err.status or 500

### P2-6: server/index.js Assembly Correctness
Read `server/index.js` and verify:
- `dotenv` loads using an absolute path (`resolve(__dirname, '../.env')`), not `import 'dotenv/config'`
- All 4 routes are registered via `app.use()`
- `errorHandler` is registered after all routes
- CORS origin uses a regex `/^http:\/\/localhost:\d+$/` (does not hardcode a single port)

### P2-7: carController Filter/Sort Logic
Read `server/controllers/carController.js` and verify:
- Supports `marque` query parameter (resolves Marque slug → ObjectId first)
- Supports `era`, `category`, `featured` filters
- Has a SORT_MAP defining `year_asc`, `year_desc`, `name_az`, `name_za`
- getCar uses `.populate('marque')`
- All methods have try/catch and call `next(err)`

### P2-8: Seed Script Structure
Read `server/seed/seed.js` and verify:
- Runs `deleteMany()` to clear before `insertMany()` (idempotent)
- Maps marque slug → ObjectId (does not hardcode ObjectId strings)
- `mongoose.disconnect()` is called in a finally block
- Contains >= 3 marques and >= 4 cars

### P2-9: API Health Check
```
GET http://localhost:5000/api/health
```
Verify: HTTP 200, `status: "ok"`, `db: "connected"`

### P2-10: GET /api/cars Basic List
```
GET http://localhost:5000/api/cars
```
Verify: response contains `data` (array) and `total` (number), `total >= 2`, each record contains `slug`, `name`, `year`, `marque.name`

### P2-11: GET /api/cars Marque Filter
```
GET http://localhost:5000/api/cars?marque=porsche
```
Verify: all returned records have `marque.name` equal to `Porsche`

### P2-12: GET /api/cars Year Sorting
```
GET http://localhost:5000/api/cars?sort=year_asc
GET http://localhost:5000/api/cars?sort=year_desc
```
Verify: year_asc first record year <= last record; year_desc is the reverse

### P2-13: GET /api/cars/:slug Single Car Detail
```
GET http://localhost:5000/api/cars/911-carrera-rs-27
```
Verify: `name: "911 Carrera RS 2.7"`, all four `specs` fields are non-empty, `provenance` is non-empty, `marque` is fully populated

### P2-14: GET /api/cars/:slug 404
```
GET http://localhost:5000/api/cars/does-not-exist
```
Verify: HTTP 404, response contains `error` field

### P2-15: GET /api/marques List
```
GET http://localhost:5000/api/marques
```
Verify: array length >= 2, each record contains `slug`, `name`, `biography`

### P2-16: GET /api/marques/:slug With Cars
```
GET http://localhost:5000/api/marques/porsche
```
Verify: contains `biography` (non-empty), contains `cars` array (length >= 1), cars sorted by year ascending

### P2-17: POST /api/inquiries Public Submission
First fetch a real `_id` from GET /api/cars, then:
```
POST http://localhost:5000/api/inquiries
Body: { car: "<real_id>", visitorName: "Test User", email: "test@classicride.test", message: "Interested in provenance." }
```
Verify: HTTP 201, response contains `message` and `id`

### P2-18: POST /api/inquiries Field Validation
```
POST http://localhost:5000/api/inquiries
Body: { visitorName: "No Email" }
```
Verify: HTTP 400, response contains `error`

### P2-19: GET /api/inquiries Unauthorized Block
```
GET http://localhost:5000/api/inquiries
```
Verify: HTTP 401, `error: "No token provided"`

### P2-20: POST /api/auth/login Wrong Credentials
```
POST http://localhost:5000/api/auth/login
Body: { email: "nobody@test.com", password: "wrong" }
```
Verify: HTTP 401, `error: "Invalid credentials"`

### P2-21: POST /api/auth/login Missing Fields
```
POST http://localhost:5000/api/auth/login
Body: { email: "test@test.com" }
```
Verify: HTTP 400, response contains `error`

### P2-22: POST /api/auth/register Unauthorized Block
```
POST http://localhost:5000/api/auth/register
Body: { email: "new@test.com", password: "test123" }
```
Verify: HTTP 401 (register is protected by auth middleware)

---

## Phase 3 — React Frontend Implementation

> If Phase 3 has not started, all tests below are marked ⚠️ WARN (expected)

### P3-1: Service Layer File
Check that `client/src/services/api.js` exists and verify:
- Creates an axios instance (`axios.create`)
- `baseURL` is `/api` (relative path, routed via Vite proxy)
- Has a request interceptor that attaches a JWT Bearer token
- Exports `getCars`, `getCar`, `getMarques`, `postInquiry`, and other functions

### P3-2: Zustand Filter Store
Check that `client/src/store/filterStore.js` exists and verify:
- Uses `create` (Zustand)
- State contains: `activeMarque`, `activeEra`, `sort`
- Contains setter methods: `setMarque`, `setEra`, `setSort`

### P3-3: TanStack Query Hooks
Check that `client/src/hooks/useCars.js` exists and verify:
- Uses `useQuery(['cars', filters], ...)`
- `enabled` or `staleTime` is configured

### P3-4: FilterBar Component
Check that `client/src/components/filter/FilterBar.jsx` exists and verify:
- Uses `Chip` component to render marque and era filters
- Connected to Zustand `filterStore`
- Displays a dynamic results count

### P3-5: TimelineSection & TimelineNode
Check that `client/src/components/timeline/TimelineSection.jsx` exists
Check that `client/src/components/timeline/TimelineNode.jsx` exists and verify:
- `TimelineNode` accepts `car`, `index`, `isSelected`, `onClick` props
- Even index uses `flex-row`, odd index uses `flex-row-reverse` (alternating layout)
- Uses `VignetteImage` component to render images

### P3-6: TechnicalSidebar
Check that `client/src/components/sidebar/TechnicalSidebar.jsx` exists and verify:
- Accepts a `slug` prop
- Internally calls `useCar(slug)` (on-demand loading, not prefetched in parent)
- Has Tab switching state (Overview/Specifications/History/Media)
- Uses `GhostButton` or `PillButton` to render "Request Provenance"

### P3-7: Home Page Full Implementation
Read `client/src/pages/Home.jsx` and verify:
- No longer a placeholder (does not contain "Coming soon" or "Phase 3" text)
- Renders HeroSection (or equivalent hero area)
- Renders FilterBar
- Renders TimelineSection
- Renders TechnicalSidebar
- Has `selectedCarSlug` state that updates Sidebar on TimelineNode click

### P3-8: CarDetail Page
Read `client/src/pages/CarDetail.jsx` and verify:
- Uses `useParams()` to get slug
- Calls `useCar(slug)` to fetch data
- Displays specs grid
- Displays full provenance text
- Has an inquiry form (calls `postInquiry`)

### P3-9: Archive Page
Read `client/src/pages/Archive.jsx` and verify:
- No longer a placeholder
- Uses grid layout (not timeline layout)
- Reuses FilterBar for filtering

### P3-10: MarquePage
Read `client/src/pages/MarquePage.jsx` and verify:
- Uses `useParams()` to get slug
- Calls `getMarques/:slug` to fetch marque + its cars
- Displays marque biography

---

## Phase 4 — Code Quality & Version Control

> Production deployment, build artifacts, and Express production mode are out of scope.

### P4-1: Environment Variable Security
Check that `.env` is not committed to Git:
```bash
git ls-files .env
```
Verify: output is empty (.env is in .gitignore)

Check that `.env.example` is committed and contains all required keys:
`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `NODE_ENV`

### P4-2: No Hardcoded Sensitive Information
Search the following directories for hardcoded credentials:
- `server/` and `client/src/` must not contain real `mongodb+srv://` connection strings (placeholder strings in comments are exempt)
- Must not contain hardcoded JWT secret strings
- `client/src/` must not contain `localhost:5000` (API calls must use the `/api` relative path)

### P4-3: Dependency Security Audit
Run:
```bash
npm audit --prefix client 2>&1
npm audit --prefix server 2>&1
```
Verify: no **critical** or **high** vulnerabilities (moderate and below marked ⚠️ WARN)

### P4-4: Git Commit History
Run:
```bash
git log --oneline
```
Verify: at least 1 commit exists, commit messages are semantic (include feat/fix/chore prefixes, etc.)

### P4-5: GitHub Remote Repository
Run:
```bash
git remote -v
```
Verify: has an `origin` remote address (github.com)

---

## Test Report Format

After all tests are executed, output:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ClassicRide — Full Project Test Report
  Run time: [current datetime]
  Service status: Backend [Running/Not running] | Frontend [Running/Not running]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: Design System & React Scaffold       (15 items)
  P1-1   Monorepo root structure              ✅/❌
  P1-2   Client project structure             ✅/❌
  ...（one line per item）

PHASE 2: Express API & MongoDB               (22 items)
  P2-1   Server file structure                ✅/❌
  ...

PHASE 3: React Frontend Implementation       (10 items)
  P3-1   Service layer file                   ✅/❌/⚠️
  ...

PHASE 4: Code Quality & Version Control      (5 items)
  P4-1   Environment variable security        ✅/❌/⚠️
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total: 52 items
  ✅ Pass: XX    ❌ Fail: XX    ⚠️ Warn/Pending: XX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Issues to Fix]
  ❌ Pxx  Reason: ...  Fix suggestion: ...

[Items Pending Verification (services not running)]
  ⚠️ P2-x  Requires `npm run dev` to be running before verification
```
