import { useQuery } from '@tanstack/react-query'
import { getCars, getCar } from '../services/api.js'

// 5-minute staleTime: car catalogue changes infrequently during a browsing
// session, so we avoid redundant refetches when the user switches filters.
export function useCars(filters = {}) {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn:  () => getCars(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCar(slug) {
  return useQuery({
    queryKey: ['car', slug],
    queryFn:  () => getCar(slug),
    staleTime: 5 * 60 * 1000,
    // Only fire when a slug is actually selected; prevents a spurious request
    // when TechnicalSidebar renders with slug=null on initial load.
    enabled:   Boolean(slug),
  })
}
