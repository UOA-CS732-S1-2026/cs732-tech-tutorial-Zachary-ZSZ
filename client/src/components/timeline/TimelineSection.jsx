import TimelineNode from './TimelineNode.jsx'

export default function TimelineSection({ cars = [], selectedSlug, onSelect }) {
  return (
    <section className="flex-1 relative py-24 bg-surface overflow-hidden">
      {/* Vertical center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary-container/30 transform -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 space-y-32">
        {cars.map((car, index) => (
          <TimelineNode
            key={car._id ?? car.slug}
            car={car}
            index={index}
            isSelected={selectedSlug === car.slug}
            onClick={() => onSelect(car.slug)}
          />
        ))}

        {cars.length === 0 && (
          <div className="flex items-center justify-center py-32">
            <p className="text-on-surface-variant font-headline italic text-lg">
              No vehicles match the current filters.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
