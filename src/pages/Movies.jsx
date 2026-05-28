import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Movies.css'

function Movies() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('trending')

  const categories = ['All', 'Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Thriller']

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    filterAndSortMovies()
  }, [movies, searchTerm, selectedCategory, sortBy])

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies')
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
        setFilteredMovies(data)
      }
    } catch (err) {
      console.error('Error fetching movies:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortMovies = () => {
    let result = movies

    // Filter by search term
    if (searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(movie =>
        movie.genre.includes(selectedCategory)
      )
    }

    // Sort
    if (sortBy === 'trending') {
      result.sort((a, b) => b.views - a.views)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredMovies(result)
  }

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Browse Movies</h1>
        <p>Discover thousands of movies in one place</p>
      </div>

      <div className="movies-container">
        {/* Sidebar */}
        <aside className="movies-sidebar">
          {/* Search */}
          <div className="sidebar-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="categories-list">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="sidebar-section">
            <h3>Sort By</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="movies-main">
          <div className="results-header">
            <p className="results-count">Showing {filteredMovies.length} movies</p>
          </div>

          {loading ? (
            <div className="loading">Loading movies...</div>
          ) : filteredMovies.length === 0 ? (
            <div className="no-results">
              <p>No movies found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="movies-grid">
              {filteredMovies.map(movie => (
                <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-card-large">
                  <div className="movie-poster-large">
                    <img src={movie.posterUrl} alt={movie.title} />
                    {movie.isNew && <span className="new-badge">NEW</span>}
                    {movie.discount && <span className="discount-badge">-{movie.discount}%</span>}
                    <div className="movie-overlay-large">
                      <button className="view-details-btn">View Details</button>
                    </div>
                  </div>
                  <div className="movie-info-large">
                    <h3>{movie.title}</h3>
                    <div className="movie-meta">
                      <span className="year">{movie.releaseYear}</span>
                      <span className="rating">⭐ {movie.rating}</span>
                    </div>
                    <p className="description">{movie.description.substring(0, 80)}...</p>
                    <div className="movie-footer">
                      <span className="price">₹{movie.price}</span>
                      <button className="add-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Movies
