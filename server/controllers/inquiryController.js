import Inquiry from '../models/Inquiry.js'

// POST /api/inquiries
export const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body)
    res.status(201).json({ message: 'Inquiry submitted successfully', id: inquiry._id })
  } catch (err) {
    next(err)
  }
}

// GET /api/inquiries  (protected — curator only)
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .populate('car', 'name slug year')
      .lean()

    res.json({ data: inquiries, total: inquiries.length })
  } catch (err) {
    next(err)
  }
}
