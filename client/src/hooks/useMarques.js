import { useQuery } from '@tanstack/react-query'
import { getMarques, getMarque } from '../services/api.js'

// 10-minute staleTime (longer than useCars) because the marque list is a
// near-static reference dataset — brand names and biographies rarely change.
export function useMarques() {
  return useQuery({
    queryKey: ['marques'],
    queryFn:  getMarques,
    staleTime: 10 * 60 * 1000,
  })
}

export function useMarque(slug) {
  return useQuery({
    queryKey: ['marque', slug],
    queryFn:  () => getMarque(slug),
    staleTime: 10 * 60 * 1000,
    // Guard against firing when no marque filter is active (slug is null).
    enabled:   Boolean(slug),
  })
}
