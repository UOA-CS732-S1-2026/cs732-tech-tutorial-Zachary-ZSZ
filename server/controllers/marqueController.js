import Marque from '../models/Marque.js'
import Car from '../models/Car.js'

// GET /api/marques
export const getMarques = async (req, res, next) => {
  try {
    const marques = await Marque.find().sort({ name: 1 }).lean()
    res.json(marques)
  } catch (err) {
    next(err)
  }
}

// GET /api/marques/:slug  — returns marque + its cars sorted by year
export const getMarque = async (req, res, next) => {
  try {
    const marque = await Marque.findOne({ slug: req.params.slug.toLowerCase() }).lean()
    if (!marque) return res.status(404).json({ error: 'Marque not found' })

    const cars = await Car.find({ marque: marque._id })
      .sort({ year: 1 })
      .lean({ virtuals: true })

    res.json({ ...marque, cars })
  } catch (err) {
    next(err)
  }
}
