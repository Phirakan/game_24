import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import GamePage from './pages/GamePage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/game" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App