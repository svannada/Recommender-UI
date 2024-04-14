'use client'

import React, { useState, useEffect  } from 'react';
import LoginScreen from './components/LoginScreen';
import WatchedMoviesPanel from './components/WatchedMoviesPanel';
import RecommendedMoviesPanel from './components/RecommendedMoviesPanel';
import Header from './components/Header'; 

import '../app/globals.css'; 
import { fetchRecommendedAndWatchedMovies, fetchPopularUsers,  Movie, Settings } from './api'; // Import the API function

// Define default settings
const defaultSettings: Settings = {
  contentValue: 0.5,
  similarUserValue: 0.5,
  selectedUser: '',
  numRecommendations: 10,
};

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const [popularUsers, setPopularUsers] = useState<string[]>([]);

    // Function to fetch recommended and watched movies
    const fetchMovies = async (settings: Settings) => {
      try {
        const { recommendedMovies, watchedMovies } = await fetchRecommendedAndWatchedMovies(settings);
        setRecommendedMovies(recommendedMovies);
        setWatchedMovies(watchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Function to fetch popular users
    const fetchUsers = async () => {
      try {
        const { popularUsers } = await fetchPopularUsers();
        setPopularUsers(popularUsers);
      } catch (error) {
        console.error('Error fetching popular users:', error);
      }
    };

      const handleLogin = (userId : string) =>  {
        setIsLoggedIn(true);
        setUserId(userId);
        document.body.classList.add('no-scroll'); // To add scroll bar
        defaultSettings.selectedUser = userId
        fetchMovies(defaultSettings); // Fetch movies when user logs in
        fetchUsers();
      };

      const handleSaveSettings = (settings : Settings) =>  {
        fetchMovies(settings); // Fetch movies on settings change
      };
    
      const handleLogout = () => {
        setIsLoggedIn(false);
        document.body.classList.remove('no-scroll'); // To remove scroll bar
      };

      useEffect(() => {
        if (!isLoggedIn) {
          document.body.classList.add('overflow-hidden');
        } else {
          document.body.classList.remove('overflow-hidden');
        }
      }, [isLoggedIn]);
    
      return (
        <div className="container mx-auto px-4 py-8">
          <Header userId={userId} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          {isLoggedIn ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="panel">
                  <WatchedMoviesPanel movies={watchedMovies} />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="panel">
                  <RecommendedMoviesPanel userId={userId} onSaveSettingsExt={handleSaveSettings} movies={recommendedMovies}
                  popularUsers={popularUsers}  />
                </div>
              </div>
            </div>
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )}
        </div>
      );
    };

export default Home;