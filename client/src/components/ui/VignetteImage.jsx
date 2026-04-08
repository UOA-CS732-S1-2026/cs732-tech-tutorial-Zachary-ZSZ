/**
 * VignetteImage — car photography wrapper.
 *
 * - Maintains 4:3 aspect ratio
 * - Radial vignette overlay blends photo edges into surface (#131313)
 * - Hover scale at 500ms (within the 400–600ms luxury ceiling)
 * - Requires parent to have `group` class for the hover to trigger
 */
export default function VignetteImage({ src, alt, className = '' }) {
  return (
    <div
      className={[
        'relative aspect-[4/3] rounded-lg overflow-hidden',
        'bg-surface-container-lowest shadow-ambient',
        className,
      ].join(' ')}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        loading="lazy"
      />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />
    </div>
  )
}
