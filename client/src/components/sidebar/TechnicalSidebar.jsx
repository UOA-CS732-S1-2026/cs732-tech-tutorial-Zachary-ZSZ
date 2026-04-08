import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCar } from '../../hooks/useCars.js'

const TABS = ['Overview', 'Specifications', 'History', 'Media']

export default function TechnicalSidebar({ slug }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const { data: car, isLoading } = useCar(slug)

  return (
    <aside className="w-[450px] bg-surface-container-lowest border-l border-outline-variant/10 flex-shrink-0">
      <div className="sticky top-[140px] max-h-[calc(100vh-140px)] overflow-y-auto p-8 lg:p-12 space-y-10">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-headline text-primary-container mb-1">
            Technical Narrative
          </h2>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em]">
            {car ? car.name : slug ? '...' : 'Select a vehicle'}
          </p>
        </div>

        {/* Tab nav */}
        <nav className="flex flex-col gap-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'text-left font-label text-[10px] uppercase tracking-widest pl-4 transition-all duration-500',
                activeTab === tab
                  ? 'text-primary border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!slug && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center"
            >
              <p className="text-on-surface-variant font-headline italic text-sm leading-relaxed">
                Click a timeline node to reveal its technical narrative.
              </p>
            </motion.div>
          )}

          {slug && isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-6 bg-surface-container-high rounded animate-pulse" />
              ))}
            </motion.div>
          )}

          {car && (
            <motion.div
              key={`${car.slug}-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="space-y-10"
            >
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <p className="text-on-surface-variant font-headline italic leading-relaxed text-lg">
                    {car.description}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="px-3 py-1 border border-primary-container/20 text-[10px] uppercase tracking-widest text-primary-container">
                      {car.category}
                    </span>
                    <span className="px-3 py-1 border border-primary-container/20 text-[10px] uppercase tracking-widest text-primary-container">
                      {car.year}
                    </span>
                    {car.featured && (
                      <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] uppercase tracking-widest text-primary">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Specifications' && car.specs && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-outline mb-6 pb-2 border-b border-outline-variant/20">
                    Core Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    {[
                      ['Engine',    car.specs.engine],
                      ['Power',     car.specs.power],
                      ['Top Speed', car.specs.topSpeed],
                      ['Weight',    car.specs.weight],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                          {label}
                        </span>
                        <span className="text-on-surface text-xl font-headline italic">
                          {value ?? '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'History' && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-outline mb-6 pb-2 border-b border-outline-variant/20">
                    Provenance Note
                  </h3>
                  <p className="text-on-surface-variant font-headline italic leading-relaxed text-lg">
                    {car.provenance ?? 'Provenance information not available.'}
                  </p>
                </div>
              )}

              {activeTab === 'Media' && (
                <div className="space-y-4">
                  {car.images?.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded overflow-hidden bg-surface-container-high">
                      <img
                        src={img.url}
                        alt={img.alt ?? car.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {(!car.images || car.images.length === 0) && (
                    <p className="text-on-surface-variant text-sm font-headline italic">
                      No media available.
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="pt-4">
                <Link
                  to={`/car/${car.slug}`}
                  className="text-[10px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity duration-500"
                >
                  View Full Detail →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  )
}
