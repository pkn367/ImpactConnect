import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import ExploreNGOs from './pages/ExploreNGOs'
import NGODetail from './pages/NGODetail'
import ManageNGO from './pages/ManageNGO'
import ManageEvent from './pages/ManageEvent'
import Events from './pages/Events'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ngos" element={<ExploreNGOs />} />
              <Route path="/ngos/new" element={<ProtectedRoute><ManageNGO /></ProtectedRoute>} />
              <Route path="/ngos/:id/edit" element={<ProtectedRoute><ManageNGO /></ProtectedRoute>} />
              <Route path="/ngos/:id" element={<NGODetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/new" element={<ProtectedRoute><ManageEvent /></ProtectedRoute>} />
              <Route path="/events/:id/edit" element={<ProtectedRoute><ManageEvent /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
