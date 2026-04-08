/**
 * Chip — filter & selection chip from the design system.
 *
 * Active state:   bg-primary  text-on-primary
 * Inactive state: bg-surface-container-high  text-on-surface
 */
export default function Chip({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-4 py-1.5 rounded-full text-label-sm font-medium',
        'transition-colors duration-500',
        active
          ? 'bg-primary text-on-primary'
          : 'bg-surface-container-high text-on-surface hover:bg-surface-variant',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
