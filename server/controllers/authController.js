import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

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
    const { email, password, role = 'curator' } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ email, passwordHash, role })

    res.status(201).json({ token: signToken(user), role: user.role, email: user.email })
  } catch (err) {
    next(err)
  }
}
