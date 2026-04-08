import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import { useCar } from '../hooks/useCars.js'
import { postInquiry } from '../services/api.js'

function SpecGrid({ specs }) {
  if (!specs) return null
  const items = [
    ['Engine',    specs.engine],
    ['Power',     specs.power],
    ['Top Speed', specs.topSpeed],
    ['Weight',    specs.weight],
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10">
      {items.map(([label, value]) => (
        <div key={label} className="bg-surface-container-low p-8">
          <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">
            {label}
          </span>
          <span className="text-on-surface text-2xl font-headline italic">{value ?? '—'}</span>
        </div>
      ))}
    </div>
  )
}

function InquiryForm({ carId }) {
  const [form, setForm] = useState({ visitorName: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await postInquiry({ car: carId, ...form })
      setStatus('sent')
      setForm({ visitorName: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-12 text-center">
        <p className="text-primary font-headline italic text-lg">
          Your inquiry has been received. The curator will be in touch.
        </p>
      </div>
    )
  }

  const inputClass = [
    'w-full bg-transparent border-b border-outline-variant text-on-surface',
    'py-3 text-sm font-body placeholder-on-surface-variant/50',
    'focus:outline-none focus:border-primary transition-colors duration-500',
  ].join(' ')

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
            Name
          </label>
          <input
            name="visitorName"
            value={form.visitorName}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Your inquiry regarding provenance, condition, or acquisition..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-8 py-3 rounded-full bg-gradient-cta text-on-primary font-label text-xs uppercase tracking-widest font-bold transition-opacity duration-500 hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Request Provenance'}
      </button>
    </form>
  )
}

export default function CarDetail() {
  const { slug } = useParams()
  const { data: car, isLoading, isError } = useCar(slug)

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
              Vehicle not found.
            </p>
            <Link to="/" className="text-[10px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
              ← Return to Exhibition
            </Link>
          </div>
        )}

        {car && (
          <>
            {/* Hero image */}
            {car.images?.[0] && (
              <section className="relative h-[70vh] overflow-hidden bg-surface-container-lowest">
                <img
                  src={car.images[0].url}
                  alt={car.images[0].alt ?? car.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 vignette-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-12 max-w-screen-2xl mx-auto">
                  <span className="block text-[10px] uppercase tracking-[0.3rem] text-primary-container mb-3">
                    {car.marque?.name} · {car.year}
                  </span>
                  <h1 className="text-5xl md:text-7xl font-headline italic text-on-surface leading-none">
                    {car.name}
                  </h1>
                </div>
              </section>
            )}

            {/* Specs band */}
            <SpecGrid specs={car.specs} />

            {/* Description + Provenance */}
            <section className="max-w-screen-2xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-24">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-6">
                  Overview
                </span>
                <p className="text-on-surface-variant font-headline italic leading-loose text-lg">
                  {car.description}
                </p>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-6">
                  Provenance
                </span>
                <p className="text-on-surface-variant font-body font-light leading-relaxed text-base">
                  {car.provenance}
                </p>
              </div>
            </section>

            {/* Additional images */}
            {car.images?.length > 1 && (
              <section className="bg-surface-container-low py-16">
                <div className="max-w-screen-2xl mx-auto px-8">
                  <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-8">
                    Gallery
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {car.images.map((img, i) => (
                      <div key={i} className="aspect-[4/3] rounded overflow-hidden bg-surface-container-lowest">
                        <img
                          src={img.url}
                          alt={img.alt ?? car.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Inquiry form */}
            <section className="bg-surface-container-lowest py-24">
              <div className="max-w-2xl mx-auto px-8">
                <span className="block text-[10px] uppercase tracking-[0.3rem] text-outline mb-4">
                  Acquisition Inquiry
                </span>
                <h2 className="text-4xl font-headline italic text-on-surface mb-12">
                  Request Provenance
                </h2>
                <InquiryForm carId={car._id} />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
