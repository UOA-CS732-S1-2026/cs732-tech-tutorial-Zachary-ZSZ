import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Exhibition', to: '/' },
  { label: 'Archive',    to: '/archive' },
  { label: 'Timeline',   to: '/' },       // Phase 3: dedicated route
  { label: 'Provenance', to: '/' },       // Phase 3: dedicated route
]

/**
 * Header — fixed, full-width, glassmorphic navigation bar.
 *
 * Design tokens:
 *   background:  bg-neutral-950/60  backdrop-blur-xl
 *   brand text:  text-primary-container  font-headline italic
 *   nav links:   label-sm uppercase tracking-label
 *   active link: text-primary-container border-b border-primary-container
 *   hover:       text-primary  duration-500
 */
export default function Header({ onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen((v) => !v)
    onMenuClick?.()
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">

        {/* Brand */}
        <NavLink
          to="/"
          className="text-2xl font-headline italic text-primary-container select-none"
        >
          The Cinematic Archive
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-12">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) => [
                'text-label-sm uppercase font-label transition-colors duration-500',
                isActive
                  ? 'text-primary-container border-b border-primary-container pb-1'
                  : 'text-on-surface-variant hover:text-primary',
              ].join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Menu icon (mobile sidebar trigger) */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={handleMenuClick}
          className="flex items-center text-on-surface-variant hover:text-primary transition-colors duration-500"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

      </nav>
    </header>
  )
}
