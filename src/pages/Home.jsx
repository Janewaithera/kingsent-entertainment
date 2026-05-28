import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [djContent, setDjContent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedContent()
  }, [])

  const fetchFeaturedContent = async () => {
    try {
      const [moviesRes, djRes] = await Promise.all([
        fetch('http://localhost:5000/api/movies?featured=true&limit=6'),
        fetch('http://localhost:5000/api/dj-content?featured=true&limit=6')
      ])

      if (moviesRes.ok) {
        const moviesData = await moviesRes.json()
        setMovies(moviesData)
      }

      if (djRes.ok) {
        const djData = await djRes.json()
        setDjContent(djData)
      }
    } catch (err) {
      console.error('Error fetching content:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video-bg">
          <video autoPlay muted loop className="hero-video">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">WELCOME TO <span className="text-gold">KINGSENT</span></h1>
            <p className="hero-subtitle">Premium Entertainment. Movies. Music. Unforgettable Experience.</p>
            <div className="hero-buttons">
              <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
              <Link to="/music" className="btn btn-secondary">Explore DJ Mixes</Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>↓ Scroll to explore ↓</span>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Movies</h2>
            <Link to="/movies" className="view-all">View All →</Link>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="movies-grid">
              {movies.map(movie => (
                <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-card">
                  <div className="movie-poster">
                    <img src={movie.posterUrl} alt={movie.title} />
                    <div className="movie-overlay">
                      <button className="play-btn">▶ Watch Trailer</button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-year">{movie.releaseYear}</p>
                    <p className="movie-price">₹{movie.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="container">
          <div className="section-header">
            <h2>🔥 Trending Now</h2>
          </div>
          <div className="trending-carousel">
            {movies.slice(0, 3).map(movie => (
              <div key={movie._id} className="trending-card">
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="trending-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre.join(', ')}</p>
                  <Link to={`/movie/${movie._id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DJ Entertainment Section */}
      <section className="dj-section">
        <div className="container">
          <div className="section-header">
            <h2>DJ Entertainment</h2>
            <Link to="/music" className="view-all">View All →</Link>
          </div>

          <div className="dj-grid">
            {djContent.map(item => (
              <div key={item._id} className="dj-card">
                <div className="dj-thumbnail">
                  <img src={item.thumbnailUrl} alt={item.title} />
                  <span className="dj-badge">🎵</span>
                </div>
                <div className="dj-info">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <div className="container">
          <h2>Why Choose Kingsent?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h3>Largest Collection</h3>
              <p>Thousands of movies and DJ mixes in one place</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe M-Pesa transactions with instant confirmation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Stream Anywhere</h3>
              <p>Watch on any device, anytime, anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Download</h3>
              <p>High-speed downloads for offline viewing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Premium Entertainment?</h2>
          <p>Join thousands of users enjoying movies and music on Kingsent</p>
          <Link to="/auth" className="btn btn-primary">Get Started Now</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
