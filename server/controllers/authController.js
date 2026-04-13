import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

// JWT payload is minimal: only id, email, and role.
// Sensitive fields (passwordHash) are never included in the token.
// 7-day default keeps a curator logged in for a working week without
// requiring a re-login on every session — acceptable for a single-admin tool.
const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid credentials' })

    res.json({ token: signToken(user), role: user.role, email: user.email })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/register  (protected — only an existing curator can create new users)
export const register = async (req, res, next) => {
  try {
    // Default role is 'curator' — this app has a single admin role; the field
    // exists for forward-compatibility if a read-only 'viewer' role is added.
    const { email, password, role = 'curator' } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    // Salt rounds = 12: strong enough for production (OWASP recommends ≥10)
    // without causing noticeable latency on curator-only admin endpoints.
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ email, passwordHash, role })

    res.status(201).json({ token: signToken(user), role: user.role, email: user.email })
  } catch (err) {
    next(err)
  }
}
