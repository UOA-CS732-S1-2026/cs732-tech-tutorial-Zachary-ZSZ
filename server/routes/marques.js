import { Router } from 'express'
import { getMarques, getMarque } from '../controllers/marqueController.js'

const router = Router()

router.get('/',        getMarques)
router.get('/:slug',   getMarque)

export default router
