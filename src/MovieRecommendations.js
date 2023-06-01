import React from 'react'

const MovieRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations available.</p>
  }

  return (
    <div>
      <h2>Movie Recommendations</h2>
      {recommendations.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  )
}

export default MovieRecommendations
