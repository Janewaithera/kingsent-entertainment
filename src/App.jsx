import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Music from './pages/Music'
import Categories from './pages/Categories'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Checkout from './pages/Checkout'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsAuthenticated(true)
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setIsAdmin(parsedUser.role === 'admin')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout}
          isAdmin={isAdmin}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetail isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/music" element={<Music />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} setIsAdmin={setIsAdmin} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/checkout/:movieId" element={isAuthenticated ? <Checkout user={user} /> : <Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard user={user} /> : <Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
