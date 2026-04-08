import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import FilterBar from '../components/filter/FilterBar.jsx'
import TimelineSection from '../components/timeline/TimelineSection.jsx'
import TechnicalSidebar from '../components/sidebar/TechnicalSidebar.jsx'
import { useCars } from '../hooks/useCars.js'
import { useMarque } from '../hooks/useMarques.js'
import useFilterStore from '../store/filterStore.js'

// Hero image — first featured car image from seed
const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1rsR7JLw7Qw8oFatpBU4i48VBQc-pW_hsSzUpRDdofr_jz_UJvgO0kIKw-xvbqPguubVMDpEzj1Nr43RuWvYN_N4leHUtCVtYPGEkmk3L6S0R9M_i_PMTw2nIHXl9f_w6c01WA5JVoCefM98BPoIDiccyKYbkbNVdy0Or9BY9oco8_2b63t0jWGX-yI0jrsLDS1BwB9CQYEbRiqxUgnIGfqKw0l_SvnOiiPcUaj5HwpOTaETAp8SMsy3CRPg2xEARiIYVOIMqUw'

function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Classic car silhouette in dramatic studio lighting"
          className="w-full h-full object-cover opacity-50 grayscale"
          loading="eager"
        />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-headline italic text-primary-container mb-6 tracking-tight leading-none">
          The Legacy of Machines
        </h1>
        <div className="w-32 h-px bg-primary-container mx-auto mb-8" />
        <p className="max-w-xl mx-auto text-on-surface-variant font-headline italic text-lg leading-relaxed">
          A curated technical narrative exploring the intersection of industrial precision
          and emotional heritage.
        </p>
        <div className="mt-12">
          <Link
            to="/archive"
            className="inline-block px-8 py-3 rounded-full bg-gradient-cta text-on-primary font-label text-xs uppercase tracking-widest font-bold transition-opacity duration-500 hover:opacity-90"
          >
            Enter the Archive
          </Link>
        </div>
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
        <div className="flex flex-row overflow-hidden relative">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TimelineSection
              cars={cars}
              selectedSlug={selectedCarSlug}
              onSelect={(slug) => setSelectedCarSlug((prev) => prev === slug ? null : slug)}
            />
          )}

          <TechnicalSidebar slug={selectedCarSlug} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
