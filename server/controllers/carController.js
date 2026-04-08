import Car from '../models/Car.js'
import Marque from '../models/Marque.js'

const SORT_MAP = {
  year_asc:  { year:  1 },
  year_desc: { year: -1 },
  name_az:   { name:  1 },
  name_za:   { name: -1 },
}

// GET /api/cars?marque=porsche&era=golden-age&category=Sports&sort=year_asc&featured=true
export const getCars = async (req, res, next) => {
  try {
    const { marque, era, category, sort, featured } = req.query
    const filter = {}

    if (era)      filter.era = era
    if (category) filter.category = category
    if (featured) filter.featured = featured === 'true'

    // Resolve marque slug → ObjectId
    if (marque) {
      const marqueDoc = await Marque.findOne({ slug: marque.toLowerCase() }).lean()
      if (marqueDoc) filter.marque = marqueDoc._id
      else           filter.marque = null  // returns empty result for unknown marque
    }

    const sortBy = SORT_MAP[sort] ?? SORT_MAP.year_asc

    const cars = await Car.find(filter)
      .sort(sortBy)
      .populate('marque', 'name slug country')
      .lean({ virtuals: true })

    res.json({ data: cars, total: cars.length })
  } catch (err) {
    next(err)
  }
}

// GET /api/cars/:slug
export const getCar = async (req, res, next) => {
  try {
    const car = await Car.findOne({ slug: req.params.slug })
      .populate('marque')
      .lean({ virtuals: true })

    if (!car) return res.status(404).json({ error: 'Car not found' })
    res.json(car)
  } catch (err) {
    next(err)
  }
}

// POST /api/cars  (protected)
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body)
    res.status(201).json(car)
  } catch (err) {
    next(err)
  }
}

// PUT /api/cars/:slug  (protected)
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    ).populate('marque', 'name slug')

    if (!car) return res.status(404).json({ error: 'Car not found' })
    res.json(car)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/cars/:slug  (protected)
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findOneAndDelete({ slug: req.params.slug })
    if (!car) return res.status(404).json({ error: 'Car not found' })
    res.json({ message: 'Car deleted successfully' })
  } catch (err) {
    next(err)
  }
}
