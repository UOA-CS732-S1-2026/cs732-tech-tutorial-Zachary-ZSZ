import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url:     { type: String, required: true },
    alt:     { type: String, default: '' },
    primary: { type: Boolean, default: false },
  },
  { _id: false }
)

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
    era: {
      type: String,
      enum: ['golden-age', 'muscle-era', 'modern-classic'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Sports', 'Racing', 'Grand Tourer', 'Roadster'],
      required: true,
    },
    description: { type: String, required: true },
    specs:       { type: specsSchema, default: () => ({}) },
    provenance:  { type: String, default: '' },
    images:      { type: [imageSchema], default: [] },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Virtual: primary image
carSchema.virtual('primaryImage').get(function () {
  return this.images.find((img) => img.primary) ?? this.images[0] ?? null
})

carSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Car', carSchema)
