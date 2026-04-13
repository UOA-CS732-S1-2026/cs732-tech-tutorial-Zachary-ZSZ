import mongoose from 'mongoose'

// _id: false on subdocuments avoids generating unnecessary ObjectIds for
// embedded arrays that are never queried by their own ID.
const imageSchema = new mongoose.Schema(
  {
    url:     { type: String, required: true },
    alt:     { type: String, default: '' },
    primary: { type: Boolean, default: false },
  },
  { _id: false }
)

// Specs stored as strings (not numbers) to allow human-readable units,
// e.g. "2.7L Flat-6", "210 bhp", "245 km/h", "960 kg".
const specsSchema = new mongoose.Schema(
  {
    engine:   { type: String, default: '' },
    power:    { type: String, default: '' },
    topSpeed: { type: String, default: '' },
    weight:   { type: String, default: '' },
  },
  { _id: false }
)

const carSchema = new mongoose.Schema(
  {
    // slug is the public-facing URL key (e.g. "911-carrera-rs-27").
    // index: true creates a dedicated B-tree index for fast /api/cars/:slug lookups.
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    marque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marque',
      required: true,
    },
    name:        { type: String, required: true, trim: true },
    year:        { type: Number, required: true },
    // Three eras cover the collection's scope: pre-1970 classics, 1970s muscle,
    // and post-1980 collector cars. Used as a FilterBar chip group.
    era: {
      type: String,
      enum: ['golden-age', 'muscle-era', 'modern-classic'],
      required: true,
    },
    // Body-style categories used for FilterBar filtering and sidebar metadata display.
    category: {
      type: String,
      enum: ['Sports', 'Racing', 'Grand Tourer', 'Roadster'],
      required: true,
    },
    description: { type: String, required: true },
    // Factory function default avoids the Mongoose shared-object bug where
    // a plain `default: {}` is mutated across all documents.
    specs:       { type: specsSchema, default: () => ({}) },
    provenance:  { type: String, default: '' },
    images:      { type: [imageSchema], default: [] },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Virtual: resolves the primary image without changing the stored array order.
// Exposed via toJSON so API consumers can use car.primaryImage directly.
carSchema.virtual('primaryImage').get(function () {
  return this.images.find((img) => img.primary) ?? this.images[0] ?? null
})

carSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Car', carSchema)
