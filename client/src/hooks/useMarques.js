import { useQuery } from '@tanstack/react-query'
import { getMarques, getMarque } from '../services/api.js'

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
    enabled:   Boolean(slug),
  })
}
