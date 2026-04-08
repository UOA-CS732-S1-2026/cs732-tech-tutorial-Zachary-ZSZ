import { Router } from 'express'
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/',        getCars)
router.get('/:slug',   getCar)
router.post('/',       auth, createCar)
router.put('/:slug',   auth, updateCar)
router.delete('/:slug',auth, deleteCar)

export default router
