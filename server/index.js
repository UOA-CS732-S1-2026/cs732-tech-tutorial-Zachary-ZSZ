import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env from project root regardless of working directory
const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import carRoutes      from './routes/cars.js'
import marqueRoutes   from './routes/marques.js'
import inquiryRoutes  from './routes/inquiries.js'
import authRoutes     from './routes/auth.js'
import errorHandler   from './middleware/errorHandler.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false
    : /^http:\/\/localhost:\d+$/,
  credentials: true,
}))
app.use(express.json())

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/cars',       carRoutes)
app.use('/api/marques',    marqueRoutes)
app.use('/api/inquiries',  inquiryRoutes)
app.use('/api/auth',       authRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

// ── Production: serve React build ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (_req, res) =>
    res.sendFile(path.join(clientDist, 'index.html'))
  )
}

// ── Global error handler (must be last) ────────────────────────────────────
app.use(errorHandler)

// ── Connect to MongoDB then start ───────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () =>
      console.log(`Server running → http://localhost:${PORT}`)
    )
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
