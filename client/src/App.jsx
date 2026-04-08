import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MarquePage from './pages/MarquePage.jsx'
import CarDetail from './pages/CarDetail.jsx'
import Archive from './pages/Archive.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Home />} />
      <Route path="/marque/:slug"  element={<MarquePage />} />
      <Route path="/car/:slug"     element={<CarDetail />} />
      <Route path="/archive"       element={<Archive />} />
      <Route path="/admin/login"   element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
