import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import '../components/css/recommendmovie.css'; 

interface Movie {
  id: number;
  title: string;
  image: string;
}

interface SettingsModalProps {
  onSave: (settings: Settings) => void;
  onClose: () => void;
}

interface Settings {
  contentValue: number;
  similarUserValue: number;
  excludeWatched: boolean;
  selectedUser: string;
  numRecommendations: number; 
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onSave, onClose }) => {
  const [contentValue, setContentValue] = useState(0.5);
  const [similarUserValue, setSimilarUserValue] = useState(0.5);
  const [excludeWatched, setExcludeWatched] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [numRecommendations, setNumRecommendations] = useState(10); 

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    const remainingValue = 1.0 - newValue; 
    setContentValue(newValue);
    // Ensure that the sum of contentValue and similarUserValue is always 1.0
    setSimilarUserValue(remainingValue > 1.0 ? 1.0 : remainingValue);
  };
  
  const handleSimilarUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    const remainingValue = 1.0 - newValue; 
    setSimilarUserValue(newValue);
    // Ensure that the sum of contentValue and similarUserValue is always 1.0
    setContentValue(remainingValue > 1.0 ? 1.0 : remainingValue);
  };

  const handleExcludeWatchedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeWatched(event.target.checked);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleNumRecommendationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumRecommendations(parseInt(event.target.value));
  };

  const handleSaveSettings = () => {
    const settings: Settings = {
      contentValue,
      similarUserValue,
      excludeWatched,
      selectedUser,
      numRecommendations, 
    };
    onSave(settings);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <strong><h2>Recommender Settings</h2></strong>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="content" className="form-label">Content:</label>
            <input
              type="range"
              id="content"
              className="form-control"
              min="0"
              max="1"
              step="0.1"
              value={contentValue}
              onChange={handleContentChange}
            />
            <div className="value-container">{(contentValue).toFixed(1)}</div>
          </div>
          <div className="form-group">
            <label htmlFor="similar-user" className="form-label">Similar User:</label>
            <input
              type="range"
              id="similar-user"
              className="form-control"
              min="0"
              max="1"
              step="0.1"
              value={similarUserValue}
              onChange={handleSimilarUserChange}
            />
            <div className="value-container">{(similarUserValue).toFixed(1)}</div>
          </div>
          <div className="form-group checkbox-container">
            <input
              type="checkbox"
              id="exclude-watched"
              className="form-checkbox"
              checked={excludeWatched}
              onChange={handleExcludeWatchedChange}
            />
            <label htmlFor="exclude-watched" className="form-label">Exclude watched</label>
          </div>
          <div className="form-group">
            <label htmlFor="popular-user" className="form-label">Popular User:</label>
            <select id="popular-user" className="form-select" onChange={handleUserChange}>
              <option value="">Select User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="num-recommendations" className="form-label"># Recommendations:</label>
            <input
              type="number"
              id="num-recommendations"
              className="form-control"
              min="1"
              value={numRecommendations}
              onChange={handleNumRecommendationsChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleSaveSettings} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
  
};

interface RecommendedMoviesPanelProps {
  movies: Movie[];
}

const RecommendedMoviesPanel: React.FC<RecommendedMoviesPanelProps> = ({ movies }) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleSaveSettings = (settings: Settings) => {
    toggleSettings(); 
  };

  return (
    <div className="panel">
      <div className="panel-header flex justify-between items-center">
        <h2>Recommended Movies</h2>
        <button onClick={toggleSettings} className="settings-button">
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
      <div className="rec-movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <img src={movie.image} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      {showSettings && <SettingsModal onSave={handleSaveSettings} onClose={toggleSettings} />}
    </div>
  );
};

export default RecommendedMoviesPanel;
