import { Link } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import FilterBar from '../components/filter/FilterBar.jsx'
import { useCars } from '../hooks/useCars.js'
import useFilterStore from '../store/filterStore.js'

function CarCard({ car }) {
  const primaryImage = car.images?.find((img) => img.primary) ?? car.images?.[0]

  return (
    <Link
      to={`/car/${car.slug}`}
      className="group block bg-surface-container-lowest rounded overflow-hidden hover:bg-surface-container-high transition-colors duration-500"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-surface-container-high">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt ?? car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-outline text-xs uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2rem] text-primary-container font-bold">
            {car.marque?.name}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-outline">
            {car.year}
          </span>
        </div>

        <h3 className="font-headline text-on-surface text-xl leading-tight group-hover:text-primary transition-colors duration-500">
          {car.name}
        </h3>

        <p className="text-on-surface-variant text-sm font-body font-light leading-relaxed line-clamp-2">
          {car.description}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <span className="px-2 py-0.5 border border-primary-container/20 text-[10px] uppercase tracking-widest text-primary-container">
            {car.category}
          </span>
          {car.featured && (
            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-[10px] uppercase tracking-widest text-primary">
              Featured
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function Archive() {
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
        {/* Page header */}
        <section className="max-w-screen-2xl mx-auto px-8 pt-16 pb-8">
          <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-4">
            Complete Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-headline italic text-on-surface">
            The Archive
          </h1>
        </section>

        <FilterBar total={total} />

        <section className="max-w-screen-2xl mx-auto px-8 py-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {cars.length === 0 ? (
                <div className="flex items-center justify-center py-32">
                  <p className="text-on-surface-variant font-headline italic text-lg">
                    No vehicles match the current filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cars.map((car) => (
                    <CarCard key={car._id ?? car.slug} car={car} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
