import mongoose from 'mongoose'

const marqueSchema = new mongoose.Schema(
  {
    // slug is used as the URL key for /marque/:slug and as the filter value
    // in GET /api/cars?marque=<slug>. unique index is created automatically
    // by Mongoose when unique: true is set.
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    name:        { type: String, required: true, trim: true },
    biography:   { type: String, default: '' },
    // foundedYear is intentionally optional — some heritage brands have disputed
    // founding dates or are presented without a specific year in the exhibition.
    foundedYear: { type: Number },
    country:     { type: String, default: '' },
    logoUrl:     { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Marque', marqueSchema)
