import { Router } from 'express'
import { login, register } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/login',    login)
router.post('/register', auth, register)  // Protected: only an existing curator can add users

export default router
