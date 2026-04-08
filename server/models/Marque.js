import mongoose from 'mongoose'

const marqueSchema = new mongoose.Schema(
  {
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    name:        { type: String, required: true, trim: true },
    biography:   { type: String, default: '' },
    foundedYear: { type: Number },
    country:     { type: String, default: '' },
    logoUrl:     { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Marque', marqueSchema)
