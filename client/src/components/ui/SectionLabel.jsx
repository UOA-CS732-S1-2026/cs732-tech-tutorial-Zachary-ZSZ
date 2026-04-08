/**
 * SectionLabel — small all-caps catalog label used above section headings.
 * e.g. "MARQUE PROFILE", "CORE SPECIFICATIONS", "PROVENANCE NOTE"
 *
 * Maps to design-system label-sm: 0.625rem, tracking 0.1rem, uppercase.
 */
export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={[
        'block text-label-sm uppercase text-outline',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
