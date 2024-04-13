import React from 'react';

interface Movie {
  id: number;
  title: string;
  image: string;
}

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
          <div key={movie.id} className="movie-item">
            <img src={movie.image} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedMoviesPanel;
