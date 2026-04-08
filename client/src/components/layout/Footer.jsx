import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Terms of Archive',   to: '/' },
  { label: 'Provenance Policy',  to: '/' },
  { label: 'Contact Curator',    to: '/' },
]

/**
 * Footer — minimal, full-width.
 *
 * Design tokens:
 *   border-top:   border-outline-variant/20
 *   background:   bg-surface (#131313)
 *   text:         text-label-sm uppercase text-neutral-600
 *   link hover:   text-primary-container  duration-500
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface z-50 relative">
      <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto gap-8">

        {/* Copyright */}
        <p className="text-label-sm uppercase text-neutral-600 font-label">
          © {new Date().getFullYear()} The Cinematic Archive. Heritage of Automotive Engineering.
        </p>

        {/* Links */}
        <div className="flex gap-12">
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-label-sm uppercase text-neutral-600 font-label hover:text-primary-container transition-colors duration-500"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  )
}
