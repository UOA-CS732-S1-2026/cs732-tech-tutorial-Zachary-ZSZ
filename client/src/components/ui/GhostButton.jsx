/**
 * GhostButton — full-width ghost pill, used for sidebar CTAs like
 * "REQUEST PROVENANCE". Accepts an optional icon slot.
 */
export default function GhostButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={[
        'w-full py-4 rounded-full',
        'border border-outline-variant/40 text-primary-container',
        'text-label-sm font-bold uppercase tracking-label',
        'hover:bg-primary/10 transition-all duration-500',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
