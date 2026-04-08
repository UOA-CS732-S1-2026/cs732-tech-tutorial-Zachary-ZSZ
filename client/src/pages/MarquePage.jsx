import { useParams, Link } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import { useMarque } from '../hooks/useMarques.js'

function CarRow({ car }) {
  const primaryImage = car.images?.find((img) => img.primary) ?? car.images?.[0]

  return (
    <Link
      to={`/car/${car.slug}`}
      className="group flex gap-8 items-start py-10 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors duration-500 px-4 rounded"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-40 aspect-[4/3] rounded overflow-hidden bg-surface-container-high">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt ?? car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-outline text-[10px] uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 space-y-3 pt-1">
        <div className="flex items-center gap-4">
          <span className="text-2xl text-outline font-headline italic">{car.year}</span>
          <span className="px-2 py-0.5 border border-primary-container/20 text-[10px] uppercase tracking-widest text-primary-container">
            {car.category}
          </span>
        </div>

        <h3 className="font-headline text-on-surface text-3xl leading-tight group-hover:text-primary transition-colors duration-500">
          {car.name}
        </h3>

        <p className="text-on-surface-variant text-sm font-body font-light leading-relaxed max-w-xl">
          {car.description}
        </p>
      </div>
    </Link>
  )
}

export default function MarquePage() {
  const { slug } = useParams()
  const { data: marque, isLoading, isError } = useMarque(slug)

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />

      <main className="pt-[80px]">
        {isLoading && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <p className="text-on-surface-variant font-headline italic text-lg">
              Marque not found.
            </p>
            <Link to="/" className="text-[10px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
              ← Return to Exhibition
            </Link>
          </div>
        )}

        {marque && (
          <>
            {/* Biography */}
            <section className="bg-surface-container-low">
              <div className="max-w-4xl mx-auto py-24 px-8 text-center">
                <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-4">
                  {marque.country} · Est. {marque.foundedYear}
                </span>
                <h1 className="text-6xl md:text-8xl font-headline italic text-on-surface mb-8">
                  {marque.name}
                </h1>
                <div className="w-32 h-px bg-primary-container mx-auto mb-10" />
                <p className="text-on-surface-variant font-headline italic leading-loose text-lg">
                  {marque.biography}
                </p>
              </div>
            </section>

            {/* Cars */}
            <section className="max-w-screen-xl mx-auto px-8 py-16">
              <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] uppercase tracking-[0.3rem] text-outline">
                  {marque.cars?.length ?? 0} vehicles in collection
                </span>
              </div>

              <div className="space-y-2">
                {marque.cars?.map((car) => (
                  <CarRow key={car._id ?? car.slug} car={car} />
                ))}
              </div>

              {(!marque.cars || marque.cars.length === 0) && (
                <p className="text-center text-on-surface-variant font-headline italic text-lg py-16">
                  No vehicles currently in this collection.
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
