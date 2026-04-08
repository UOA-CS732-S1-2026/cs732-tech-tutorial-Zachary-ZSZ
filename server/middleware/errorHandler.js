/**
 * Global Express error handler.
 * Must be registered LAST with app.use().
 * Handles Mongoose ValidationError and CastError gracefully.
 */
export default function errorHandler(err, _req, res, _next) {
  console.error(`[${new Date().toISOString()}]`, err.message)

  // Mongoose validation error → 400
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ error: messages.join('; ') })
  }

  // Mongoose duplicate key → 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field'
    return res.status(409).json({ error: `${field} already exists` })
  }

  // Mongoose bad ObjectId → 400
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` })
  }

  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal Server Error' })
}
