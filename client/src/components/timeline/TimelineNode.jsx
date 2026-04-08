import { Link } from 'react-router-dom'
import { VignetteImage } from '../ui/index.js'

export default function TimelineNode({ car, index, isSelected, onClick }) {
  const isEven = index % 2 === 0
  const primaryImage = car.images?.find((img) => img.primary) ?? car.images?.[0]

  return (
    <div
      className={[
        'relative flex items-start group cursor-pointer',
        isEven ? 'flex-row' : 'flex-row-reverse',
        isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100',
        'transition-opacity duration-500',
      ].join(' ')}
      onClick={onClick}
    >
      {/* Text block */}
      <div
        className={[
          'w-1/2 space-y-4',
          isEven ? 'pr-20 text-right' : 'pl-20 text-left',
        ].join(' ')}
      >
        <span className="block text-[10px] uppercase tracking-[0.2rem] text-primary-container font-bold">
          {car.marque?.name ?? ''}
        </span>

        <h3
          className={[
            'font-headline text-on-surface leading-tight',
            'text-4xl lg:text-5xl',
            isSelected ? 'text-primary' : '',
            'transition-colors duration-500',
          ].join(' ')}
        >
          {car.name}
        </h3>

        <div className="text-2xl font-light text-outline font-headline italic">
          {car.year}
        </div>

        <p
          className={[
            'text-on-surface-variant font-body font-light leading-relaxed text-sm',
            isEven ? 'ml-auto' : '',
            'max-w-sm',
          ].join(' ')}
        >
          {car.description}
        </p>

        <div className="inline-flex items-center gap-3">
          <span className="px-3 py-1 border border-primary-container/20 text-[10px] uppercase tracking-widest text-primary-container">
            {car.category}
          </span>

          <Link
            to={`/car/${car.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] uppercase tracking-widest text-outline hover:text-primary transition-colors duration-500"
          >
            View Detail →
          </Link>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 top-2 w-4 h-4 bg-primary-container rounded-full transform -translate-x-1/2 border-4 border-surface z-10 transition-all duration-500 group-hover:scale-125" />

      {/* Image block */}
      <div className={['w-1/2', isEven ? 'pl-20' : 'pr-20'].join(' ')}>
          {primaryImage ? (
            <VignetteImage
              src={primaryImage.url}
              alt={primaryImage.alt ?? car.name}
            />
          ) : (
            <div className="aspect-[4/3] rounded bg-surface-container-high flex items-center justify-center">
              <span className="text-outline text-xs uppercase tracking-widest">No Image</span>
            </div>
          )}
      </div>
    </div>
  )
}
