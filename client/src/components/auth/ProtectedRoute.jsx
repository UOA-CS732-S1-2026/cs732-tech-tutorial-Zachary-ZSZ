import { Navigate } from 'react-router-dom'

// Reads the JWT from localStorage (set by authController on login).
// localStorage is used instead of sessionStorage so the curator stays
// authenticated across browser tabs without re-logging in.
// If no token is present, replace the history entry so the login page
// is not added to the back-stack (the user can't "back" into /admin).
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/admin/login" replace />
}
