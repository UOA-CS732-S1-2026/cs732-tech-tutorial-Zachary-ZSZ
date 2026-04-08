/**
 * PillButton — fully rounded button, three design-system variants.
 *
 * variant="primary"  → solid bg-primary fill
 * variant="ghost"    → no fill, outline-variant border, primary text
 * variant="gradient" → 45° from-primary to-primary-container (high-value CTA)
 */
const variants = {
  primary:
    'bg-primary text-on-primary hover:opacity-90',
  ghost:
    'border border-outline-variant/40 text-primary hover:bg-primary/10',
  gradient:
    'bg-gradient-cta text-on-primary hover:opacity-90',
}

export default function PillButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center',
        'rounded-full px-6 py-3',
        'text-label-sm font-bold uppercase tracking-label',
        'transition-all duration-500',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
