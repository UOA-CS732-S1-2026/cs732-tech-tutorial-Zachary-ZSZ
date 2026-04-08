import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Cars ─────────────────────────────────────────────────────────────────────
export const getCars = (filters = {}) => {
  const params = {}
  if (filters.marque)   params.marque   = filters.marque
  if (filters.era)      params.era      = filters.era
  if (filters.category) params.category = filters.category
  if (filters.sort)     params.sort     = filters.sort
  if (filters.featured !== undefined) params.featured = filters.featured
  return api.get('/cars', { params }).then((r) => r.data)
}

export const getCar = (slug) =>
  api.get(`/cars/${slug}`).then((r) => r.data)

// ── Marques ──────────────────────────────────────────────────────────────────
export const getMarques = () =>
  api.get('/marques').then((r) => r.data)

export const getMarque = (slug) =>
  api.get(`/marques/${slug}`).then((r) => r.data)

// ── Inquiries ─────────────────────────────────────────────────────────────────
export const postInquiry = (data) =>
  api.post('/inquiries', data).then((r) => r.data)

export const getInquiries = () =>
  api.get('/inquiries').then((r) => r.data)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (credentials) =>
  api.post('/auth/login', credentials).then((r) => r.data)

export default api
