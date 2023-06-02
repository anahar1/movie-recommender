import React from 'react';
import './Movie.css';

const MovieRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations available. Enter values again.</p>;
  }

  const openIMDbLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2 className="recommendations-title">Movie Recommendations</h2>
      <div className="card-container">
        {recommendations.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => openIMDbLink(`https://www.themoviedb.org/movie/${movie.id}`)}
          >
            <h3>{movie.title}</h3>
            <h4>IMDB Rating: {movie.rating}</h4>
            <img src={movie.posterPath} alt={movie.title} width="200px" />
          </div>
        ))}
      </div>
      <div className="button-container">
      <button
          className="btn btn-primary text-lg font-bold text-white py-2 px-4 rounded home-button"
          style={{ backgroundColor: '#333', color: '#fff' }}
          onClick={() => window.location.reload()}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default MovieRecommendations;
