import { useQuery } from '@tanstack/react-query'
import { getCars, getCar } from '../services/api.js'

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
    enabled:   Boolean(slug),
  })
}
