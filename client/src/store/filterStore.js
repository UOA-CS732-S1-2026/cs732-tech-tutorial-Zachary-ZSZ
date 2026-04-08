import { create } from 'zustand'

const useFilterStore = create((set) => ({
  activeMarque: null,
  activeEra:    null,
  sort:         'year_asc',

  setMarque: (marque) => set({ activeMarque: marque }),
  setEra:    (era)    => set({ activeEra: era }),
  setSort:   (sort)   => set({ sort }),
  reset:     ()       => set({ activeMarque: null, activeEra: null, sort: 'year_asc' }),
}))

export default useFilterStore
