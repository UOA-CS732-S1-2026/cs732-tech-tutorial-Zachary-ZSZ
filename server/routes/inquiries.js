import { Router } from 'express'
import { createInquiry, getInquiries } from '../controllers/inquiryController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/', createInquiry)           // Public: submit provenance inquiry
router.get('/',  auth, getInquiries)      // Protected: curator list view

export default router
