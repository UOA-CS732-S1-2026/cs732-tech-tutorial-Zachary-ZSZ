import { create } from 'zustand'

// Global UI filter state shared between FilterBar, Home, and Archive.
// Kept in Zustand (not React state) so that navigating between pages
// preserves the user's active filters without prop-drilling.
const useFilterStore = create((set) => ({
  activeMarque: null,   // slug string or null
  activeEra:    null,   // era string or null
  sort:         'year_asc', // default: oldest-first matches the timeline's visual direction

  setMarque: (marque) => set({ activeMarque: marque }),
  setEra:    (era)    => set({ activeEra: era }),
  setSort:   (sort)   => set({ sort }),
  // reset() is called when leaving a filtered view (e.g. navigating away from Archive)
  reset:     ()       => set({ activeMarque: null, activeEra: null, sort: 'year_asc' }),
}))

export default useFilterStore
