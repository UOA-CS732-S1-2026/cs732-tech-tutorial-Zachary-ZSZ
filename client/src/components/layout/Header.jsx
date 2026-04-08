import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Exhibition', to: '/' },
  { label: 'Archive',    to: '/archive' },
]

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">

        {/* Brand */}
        <NavLink
          to="/"
          className="text-2xl font-headline italic text-primary-container select-none"
        >
          ClassicRide
        </NavLink>

        {/* Nav links */}
        <div className="flex gap-12">
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

      </nav>
    </header>
  )
}
