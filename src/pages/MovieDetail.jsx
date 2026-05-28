import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './MovieDetail.css'

function MovieDetail({ isAuthenticated, user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trailerUrl, setTrailerUrl] = useState('')
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    fetchMovieDetail()
  }, [id])

  useEffect(() => {
    checkIfOwned()
  }, [movie, user])

  const fetchMovieDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`)
      if (response.ok) {
        const data = await response.json()
        setMovie(data)
        setTrailerUrl(data.trailerUrl)
      }
    } catch (err) {
      console.error('Error fetching movie:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkIfOwned = async () => {
    if (!isAuthenticated || !user || !movie) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/user/owned-movies`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const ownedMovies = await response.json()
        const isOwned = ownedMovies.some(m => m._id === movie._id)
        setIsLocked(!isOwned)
      }
    } catch (err) {
      console.error('Error checking ownership:', err)
    }
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/auth')
    } else {
      navigate(`/checkout/${id}`)
    }
  }

  if (loading) {
    return <div className="loading-container"><p>Loading movie details...</p></div>
  }

  if (!movie) {
    return <div className="loading-container"><p>Movie not found</p></div>
  }

  return (
    <div className="movie-detail">
      {/* Banner */}
      <div className="movie-banner">
        <img src={movie.bannerUrl || movie.posterUrl} alt={movie.title} />
        <div className="banner-overlay"></div>
      </div>

      <div className="movie-detail-container">
        <div className="movie-detail-grid">
          {/* Poster */}
          <div className="poster-section">
            <div className="poster-wrapper">
              <img src={movie.posterUrl} alt={movie.title} />
              {isLocked && <div className="locked-overlay">
                <span className="lock-icon">🔒</span>
                <p>Unlock after purchase</p>
              </div>}
            </div>
          </div>

          {/* Info */}
          <div className="info-section">
            <div className="movie-title-section">
              <h1>{movie.title}</h1>
              <div className="movie-badges">
                {movie.isNew && <span className="badge new">NEW</span>}
                {movie.isHot && <span className="badge hot">🔥 TRENDING</span>}
              </div>
            </div>

            <div className="movie-meta-info">
              <div className="meta-item">
                <span className="label">Release Year:</span>
                <span className="value">{movie.releaseYear}</span>
              </div>
              <div className="meta-item">
                <span className="label">Genre:</span>
                <span className="value">{movie.genre.join(', ')}</span>
              </div>
              <div className="meta-item">
                <span className="label">Rating:</span>
                <span className="value">⭐ {movie.rating}/10</span>
              </div>
              <div className="meta-item">
                <span className="label">Director:</span>
                <span className="value">{movie.director}</span>
              </div>
              <div className="meta-item">
                <span className="label">Duration:</span>
                <span className="value">{movie.duration} minutes</span>
              </div>
            </div>

            <div className="movie-description">
              <h3>Description</h3>
              <p>{movie.description}</p>
            </div>

            <div className="movie-cast">
              <h3>Cast</h3>
              <div className="cast-list">
                {movie.cast?.map((actor, idx) => (
                  <span key={idx} className="cast-member">{actor}</span>
                ))}
              </div>
            </div>

            {/* Purchase Section */}
            <div className="purchase-section">
              <div className="price-display">
                <span className="price-label">Price</span>
                <span className="price-value">₹{movie.price}</span>
                {movie.discount && <span className="discount">-{movie.discount}%</span>}
              </div>

              {isLocked ? (
                <button className="btn btn-primary btn-large" onClick={handleBuyNow}>
                  🛒 Buy Now
                </button>
              ) : (
                <div className="owned-badge">
                  <span>✅ You own this movie</span>
                  <button className="btn btn-secondary btn-large">Watch Now</button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="movie-stats">
              <div className="stat">
                <span className="stat-label">Views</span>
                <span className="stat-value">{movie.views?.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">{movie.ratingCount || 0} votes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        <section className="trailer-section">
          <h2>Trailer</h2>
          <div className="trailer-container">
            {trailerUrl ? (
              <video controls className="trailer-video">
                <source src={trailerUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="no-trailer">
                <p>Trailer not available</p>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Movies */}
        <section className="recommended-section">
          <h2>Similar Movies</h2>
          <div className="recommended-grid">
            {movie.similar?.map(sim => (
              <div key={sim._id} className="recommended-card">
                <img src={sim.posterUrl} alt={sim.title} />
                <p>{sim.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default MovieDetail
