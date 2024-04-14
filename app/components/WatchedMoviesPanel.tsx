import React from 'react';
import { Movie } from '../api' // Import the API function

interface WatchedMoviesPanelProps {
  movies: Movie[];
}

const WatchedMoviesPanel: React.FC<WatchedMoviesPanelProps> = ({ movies }) => {
  return (
    <div className="panel">
      <div className="panel-header">Watched Movies</div>
      <div className="wat-movie-grid">
        {/* Render watched movies */}
        {movies.map(movie => (
          <div key={movie.movieId} className="movie-item">
            <img src={movie.cover_url} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedMoviesPanel;
