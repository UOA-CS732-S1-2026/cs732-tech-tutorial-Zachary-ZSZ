import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

const Home       = lazy(() => import('./pages/Home.jsx'))
const MarquePage = lazy(() => import('./pages/MarquePage.jsx'))
const CarDetail  = lazy(() => import('./pages/CarDetail.jsx'))
const Archive    = lazy(() => import('./pages/Archive.jsx'))
const Login      = lazy(() => import('./pages/admin/Login.jsx'))
const Dashboard  = lazy(() => import('./pages/admin/Dashboard.jsx'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/marque/:slug" element={<MarquePage />} />
        <Route path="/car/:slug"    element={<CarDetail />} />
        <Route path="/archive"      element={<Archive />} />
        <Route path="/admin/login"  element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}
