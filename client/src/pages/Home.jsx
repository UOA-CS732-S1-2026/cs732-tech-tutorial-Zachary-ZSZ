import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import FilterBar from '../components/filter/FilterBar.jsx'
import TimelineSection from '../components/timeline/TimelineSection.jsx'
import TechnicalSidebar from '../components/sidebar/TechnicalSidebar.jsx'
import { useCars } from '../hooks/useCars.js'
import { useMarque } from '../hooks/useMarques.js'
import useFilterStore from '../store/filterStore.js'

const BANNER_IMAGES = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/1963_Ferrari_250_GTO_%28chassis_4153GT%29_2.95.jpg/1280px-1963_Ferrari_250_GTO_%28chassis_4153GT%29_2.95.jpg', alt: 'Ferrari 250 GTO' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/1971_Lamborghini_Miura_P400_SV.jpg/1280px-1971_Lamborghini_Miura_P400_SV.jpg', alt: 'Lamborghini Miura P400 SV' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/1955_Mercedes-Benz_300SL_Gullwing_Coupe_34.jpg', alt: 'Mercedes-Benz 300 SL Gullwing' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg', alt: 'Porsche 911' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/1989_Ferrari_F40_SCD_24.jpg/1280px-1989_Ferrari_F40_SCD_24.jpg', alt: 'Ferrari F40' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lamborghini_Countach_-_Flickr_-_exfordy_%282%29_%28cropped-2%29.jpg/1280px-Lamborghini_Countach_-_Flickr_-_exfordy_%282%29_%28cropped-2%29.jpg', alt: 'Lamborghini Countach' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Porsche_959_%E2%80%93_Frontansicht_%282%29%2C_21._M%C3%A4rz_2013%2C_D%C3%BCsseldorf.jpg/1280px-Porsche_959_%E2%80%93_Frontansicht_%282%29%2C_21._M%C3%A4rz_2013%2C_D%C3%BCsseldorf.jpg', alt: 'Porsche 959' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg', alt: 'Bugatti Chiron' },
]

function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNER_IMAGES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

      {/* Crossfade image carousel — each image covers full hero */}
      <AnimatePresence>
        <motion.img
          key={current}
          src={BANNER_IMAGES[current].url}
          alt={BANNER_IMAGES[current].alt}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay z-10" />

      {/* Text */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-headline italic text-primary-container mb-6 tracking-tight leading-none">
          The Legacy of Machines
        </h1>
        <div className="w-32 h-px bg-primary-container mx-auto mb-8" />
        <p className="max-w-xl mx-auto text-on-surface-variant font-headline italic text-lg leading-relaxed">
          A curated technical narrative exploring the intersection of industrial precision
          and emotional heritage.
        </p>
      </div>

    </section>
  )
}

function MarqueBiography({ slug }) {
  const { data: marque } = useMarque(slug)
  if (!marque) return null

  return (
    <section className="bg-surface-container-low">
      <div className="max-w-4xl mx-auto py-16 px-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.3rem] text-outline mb-4 block">
          Marque Profile
        </span>
        <h2 className="text-4xl font-headline italic text-on-surface mb-6">
          {marque.name} Heritage
        </h2>
        <p className="text-on-surface-variant font-headline italic leading-loose text-lg">
          {marque.biography}
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  const [selectedCarSlug, setSelectedCarSlug] = useState(null)
  const { activeMarque, activeEra, sort } = useFilterStore()

  const filters = {}
  if (activeMarque) filters.marque = activeMarque
  if (activeEra)    filters.era    = activeEra
  if (sort)         filters.sort   = sort

  const { data, isLoading } = useCars(filters)
  const cars = data?.data ?? []
  const total = data?.total ?? 0

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />

      <main className="pt-[80px]">
        <HeroSection />

        <FilterBar total={total} />

        {/* Marque biography — shows when a marque filter is active */}
        {activeMarque && <MarqueBiography slug={activeMarque} />}

        {/* Timeline + Sidebar */}
        <div className="flex flex-row relative">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TimelineSection
              cars={cars}
              selectedSlug={selectedCarSlug}
              onSelect={(slug, element) => {
                const isDeselect = selectedCarSlug === slug
                setSelectedCarSlug(isDeselect ? null : slug)
                if (!isDeselect && element) {
                  const OFFSET = 140 // header (80) + filterbar (~60)
                  const y = element.getBoundingClientRect().top + window.scrollY - OFFSET
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
            />
          )}

          <TechnicalSidebar slug={selectedCarSlug} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
