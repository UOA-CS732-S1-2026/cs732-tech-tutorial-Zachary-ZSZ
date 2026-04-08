import { Chip } from '../ui/index.js'
import useFilterStore from '../../store/filterStore.js'
import { useMarques } from '../../hooks/useMarques.js'

const ERAS = [
  { label: 'Golden Age',   value: 'golden-age' },
  { label: 'Silver Age',   value: 'silver-age' },
  { label: 'Modern',       value: 'modern' },
]

const SORT_OPTIONS = [
  { label: 'Year ↑',  value: 'year_asc' },
  { label: 'Year ↓',  value: 'year_desc' },
  { label: 'A → Z',   value: 'name_az' },
  { label: 'Z → A',   value: 'name_za' },
]

export default function FilterBar({ total }) {
  const { activeMarque, activeEra, sort, setMarque, setEra, setSort } = useFilterStore()
  const { data: marques = [] } = useMarques()

  return (
    <section className="sticky top-[80px] z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
      <div className="max-w-screen-2xl mx-auto px-8 py-4 flex flex-wrap items-center justify-between gap-6">

        {/* Left: Marque + Era chips */}
        <div className="flex items-center gap-4 flex-wrap">

          {/* Marque group */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-outline">Marque</span>
            <div className="flex gap-2">
              {marques.map((m) => (
                <Chip
                  key={m.slug}
                  label={m.name}
                  active={activeMarque === m.slug}
                  onClick={() => setMarque(activeMarque === m.slug ? null : m.slug)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-outline-variant/30" />

          {/* Era group */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-outline">Era</span>
            <div className="flex gap-2">
              {ERAS.map((e) => (
                <Chip
                  key={e.value}
                  label={e.label}
                  active={activeEra === e.value}
                  onClick={() => setEra(activeEra === e.value ? null : e.value)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: results count + sort */}
        <div className="flex items-center gap-8">
          <span className="text-[10px] uppercase tracking-widest text-primary-container font-semibold">
            Results: {total ?? '—'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-[10px] uppercase tracking-widest text-on-surface cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-surface-container-high text-on-surface">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </section>
  )
}
