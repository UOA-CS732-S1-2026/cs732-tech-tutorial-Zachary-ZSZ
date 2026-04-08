/**
 * Seed script — populates MongoDB with initial marques and cars.
 *
 * Usage:
 *   node server/seed/seed.js
 *
 * Requires MONGO_URI in .env (or set inline):
 *   MONGO_URI=mongodb+srv://... node server/seed/seed.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Marque from '../models/Marque.js'
import Car from '../models/Car.js'

// ── Marque data ─────────────────────────────────────────────────────────────
const MARQUES = [
  {
    slug: 'porsche',
    name: 'Porsche',
    foundedYear: 1931,
    country: 'Germany',
    biography:
      'Born from the pursuit of pure functionalism, the Porsche narrative is one of evolutionary perfection. From the workshops of Gmünd to the Mulsanne Straight, each machine represents a relentless refinement of the rear-engine archetype.',
  },
  {
    slug: 'ferrari',
    name: 'Ferrari',
    foundedYear: 1939,
    country: 'Italy',
    biography:
      'Founded by Enzo Ferrari from the ashes of Alfa Romeo\'s racing division, Ferrari became the singular embodiment of Italian automotive passion. Every car a manifesto, every race a sermon.',
  },
  {
    slug: 'jaguar',
    name: 'Jaguar',
    foundedYear: 1922,
    country: 'United Kingdom',
    biography:
      'Sir William Lyons built Jaguar on the conviction that beauty and speed need not be exclusive. The E-Type\'s arrival at Geneva in 1961 proved him correct, reducing Enzo Ferrari himself to admiration.',
  },
]

// ── Car data (image URLs from prototype; placeholders for additional cars) ──
const CARS_DATA = [
  // ── Porsche ──────────────────────────────────────────────────────────────
  {
    slug: '911-carrera-rs-27',
    marqueName: 'porsche',
    name: '911 Carrera RS 2.7',
    year: 1973,
    era: 'golden-age',
    category: 'Sports',
    description:
      'The definitive performance icon. Developed for homologation, it remains the purest expression of the air-cooled era.',
    specs: {
      engine:   '2.7L Flat-6',
      power:    '210 hp',
      topSpeed: '152 mph',
      weight:   '960 kg',
    },
    provenance:
      'This specific chassis represents the pinnacle of the 1973 production run. Featuring the lightweight body panels and the iconic Ducktail spoiler, it remains an unmolested example of Rennsport history.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD36lfqvlfn2P8iJhXm7Y0wtnAdD3_KqMzPW74-LAuEJXE3YFPRpq0nZBB6VIYXxQtgHES7-kNXRWR8LfhCW0t6DonjSU72r8b5FwhQtaj9O-t2P0tXul2nzr2_BZu6yc5epq10LzdK15cO4DdINdOs56LjNq4Ags2gYWhUoIlI4qlo6a0Oy_QLjObCUqRWCdak0A5XncS1W-Ise17689waizJ21bhim_Xo4v5pl42TLuyj3xgYBeOSlHMYi9ugJ_E0GapSo-Glu4',
        alt: 'Vintage white Porsche 911 Carrera RS 2.7 with iconic blue lettering parked in a minimalist concrete architectural space with soft shadows',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: '550-spyder',
    marqueName: 'porsche',
    name: '550 Spyder',
    year: 1954,
    era: 'golden-age',
    category: 'Racing',
    description:
      'The giant killer. A lightweight masterpiece that redefined competition efficiency through aerospace-inspired engineering.',
    specs: {
      engine:   '1.5L Flat-4',
      power:    '110 hp',
      topSpeed: '140 mph',
      weight:   '550 kg',
    },
    provenance:
      'One of only 90 examples produced, this Spyder competed in the 1955 Mille Miglia. Its continuous ownership history is documented through Porsche factory records dating to delivery.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Xbc0jm_XugRLYrl1jwyXuUfu1ZJkaPDSY7BykDJ9FuMHxyIrJCch3s0TCU3ipQcOIpk7gp99qykfvvrGg0cU6zaCG02TKwkeRtE_EMUdqGerdKUwcEZ_onXYQb_lnvHDEXcnIo66uw93a4-ZnKQ9Ks1JmeO91QezZfqTJJ10-CZvebPw-gfbGEB98o8ikd4fY_SvkgRYlllwPaQbYi7uS7MmXEJFURIwTEtTytdYvMY1VhJogd-tRs9WUkH_fBekT3GZglhntg',
        alt: 'Silver classic Porsche 550 Spyder highlighting its curves and open cockpit, soft museum lighting with long shadows',
        primary: true,
      },
    ],
    featured: true,
  },

  // ── Ferrari ───────────────────────────────────────────────────────────────
  {
    slug: 'ferrari-250-gto',
    marqueName: 'ferrari',
    name: '250 GTO',
    year: 1962,
    era: 'golden-age',
    category: 'Racing',
    description:
      'The most coveted automobile ever created. Thirty-six were built; each one a weapon hewn from aluminium and passion, engineered to dominate the GT class at Le Mans.',
    specs: {
      engine:   '3.0L V12',
      power:    '300 hp',
      topSpeed: '174 mph',
      weight:   '880 kg',
    },
    provenance:
      'Chassis 3413GT, delivered new to Luigi Chinetti Motors in New York. Raced throughout the 1963 season before passing to a private Swiss collection, where it remained undisturbed for four decades.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1rsR7JLw7Qw8oFatpBU4i48VBQc-pW_hsSzUpRDdofr_jz_UJvgO0kIKw-xvbqPguubVMDpEzj1Nr43RuWvYN_N4leHUtCVtYPGEkmk3L6S0R9M_i_PMTw2nIHXl9f_w6c01WA5JVoCefM98BPoIDiccyKYbkbNVdy0Or9BY9oco8_2b63t0jWGX-yI0jrsLDS1BwB9CQYEbRiqxUgnIGfqKw0l_SvnOiiPcUaj5HwpOTaETAp8SMsy3CRPg2xEARiIYVOIMqUw',
        alt: 'Ferrari 250 GTO in Rosso Corsa under dramatic studio lighting, low angle revealing the curvature of the fender',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ferrari-275-gtb',
    marqueName: 'ferrari',
    name: '275 GTB/4',
    year: 1966,
    era: 'golden-age',
    category: 'Grand Tourer',
    description:
      'Pininfarina\'s most balanced sculpture. The NART Spyder variant was born of Louis Chiron\'s desire for open-air motoring without compromise — a wish Enzo Ferrari reluctantly granted.',
    specs: {
      engine:   '3.3L V12 DOHC',
      power:    '300 hp',
      topSpeed: '166 mph',
      weight:   '1,100 kg',
    },
    provenance:
      'One of ten NART Spyders commissioned by Luigi Chinetti. Exhibited at the 1967 Geneva Motor Show before passing through three generations of a single European family.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1rsR7JLw7Qw8oFatpBU4i48VBQc-pW_hsSzUpRDdofr_jz_UJvgO0kIKw-xvbqPguubVMDpEzj1Nr43RuWvYN_N4leHUtCVtYPGEkmk3L6S0R9M_i_PMTw2nIHXl9f_w6c01WA5JVoCefM98BPoIDiccyKYbkbNVdy0Or9BY9oco8_2b63t0jWGX-yI0jrsLDS1BwB9CQYEbRiqxUgnIGfqKw0l_SvnOiiPcUaj5HwpOTaETAp8SMsy3CRPg2xEARiIYVOIMqUw',
        alt: 'Ferrari 275 GTB/4 in silver, parked on a cobblestone courtyard at dusk, long shadows across bodywork',
        primary: true,
      },
    ],
    featured: false,
  },

  // ── Jaguar ────────────────────────────────────────────────────────────────
  {
    slug: 'jaguar-e-type-series-1',
    marqueName: 'jaguar',
    name: 'E-Type Series 1',
    year: 1961,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'Enzo Ferrari called it the most beautiful car ever made. Malcolm Sayer\'s aerodynamic calculations produced a form that rendered all previous notions of sports car design obsolete overnight.',
    specs: {
      engine:   '3.8L Inline-6',
      power:    '265 hp',
      topSpeed: '150 mph',
      weight:   '1,118 kg',
    },
    provenance:
      'Delivered new to a London dealer in March 1961 — one of the first right-hand-drive examples to leave Browns Lane. The original build sheet and Jaguar Heritage Certificate accompany this car.',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD36lfqvlfn2P8iJhXm7Y0wtnAdD3_KqMzPW74-LAuEJXE3YFPRpq0nZBB6VIYXxQtgHES7-kNXRWR8LfhCW0t6DonjSU72r8b5FwhQtaj9O-t2P0tXul2nzr2_BZu6yc5epq10LzdK15cO4DdINdOs56LjNq4Ags2gYWhUoIlI4qlo6a0Oy_QLjObCUqRWCdak0A5XncS1W-Ise17689waizJ21bhim_Xo4v5pl42TLuyj3xgYBeOSlHMYi9ugJ_E0GapSo-Glu4',
        alt: 'Jaguar E-Type Series 1 in British Racing Green, long bonnet stretching toward camera in a grey-walled gallery',
        primary: true,
      },
    ],
    featured: true,
  },
]

// ── Seed logic ───────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    // Clear existing data
    await Promise.all([Marque.deleteMany(), Car.deleteMany()])
    console.log('Cleared existing data')

    // Insert marques
    const insertedMarques = await Marque.insertMany(MARQUES)
    const marqueMap = Object.fromEntries(
      insertedMarques.map((m) => [m.slug, m._id])
    )
    console.log(`Inserted ${insertedMarques.length} marques`)

    // Insert cars — resolve marqueName → ObjectId
    const carsToInsert = CARS_DATA.map(({ marqueName, ...car }) => ({
      ...car,
      marque: marqueMap[marqueName],
    }))

    const insertedCars = await Car.insertMany(carsToInsert)
    console.log(`Inserted ${insertedCars.length} cars`)

    console.log('\nSeed complete!')
    console.log('  Marques:', MARQUES.map((m) => m.name).join(', '))
    console.log('  Cars:   ', CARS_DATA.map((c) => c.name).join(', '))
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
