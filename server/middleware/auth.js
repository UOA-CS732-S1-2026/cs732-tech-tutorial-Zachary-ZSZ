import jwt from 'jsonwebtoken'

/**
 * JWT authentication middleware.
 * Expects: Authorization: Bearer <token>
 * Attaches decoded payload to req.user on success.
 */
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
