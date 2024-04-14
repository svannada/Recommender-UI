'use client'

import React, { useState, useEffect  } from 'react';
import LoginScreen from './components/LoginScreen';
import WatchedMoviesPanel from './components/WatchedMoviesPanel';
import RecommendedMoviesPanel from './components/RecommendedMoviesPanel';
import Header from './components/Header'; 

import '../app/globals.css'; 
import { fetchRecommendedAndWatchedMovies, Movie, Settings } from './api'; // Import the API function

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

  // const watchedMovies = [
  //   { id: 1, title: "This is the biggest description of the Movie 1", image: "https://picsum.photos/seed/picsum/200/300" },
  //   { id: 2, title: "This is the biggest description of the Movie 2", image: "https://picsum.photos/id/237/200/300" },
  //   { id: 3, title: "This is the biggest description of the Movie 3", image: "https://picsum.photos/200/300?grayscale" },
  //   { id: 4, title: "This is the biggest description of the Movie 1", image: "https://picsum.photos/seed/picsum/200/300" },
  //   { id: 5, title: "This is the biggest description of the Movie 2", image: "https://picsum.photos/id/237/200/300" },
  //   { id: 6, title: "This is the biggest description of the Movie 3", image: "https://picsum.photos/200/300?grayscale" },
  //   { id: 7, title: "This is the biggest description of the Movie 1", image: "https://picsum.photos/seed/picsum/200/300" },
  //   { id: 8, title: "This is the biggest description of the Movie 2", image: "https://picsum.photos/id/237/200/300" },
  //   { id: 9, title: "This is the biggest description of the Movie 3", image: "https://picsum.photos/200/300?grayscale" },
  //   { id: 10, title: "This is the biggest description of the Movie 1", image: "https://picsum.photos/seed/picsum/200/300" },
  //   { id: 11, title: "This is the biggest description of the Movie 2", image: "https://picsum.photos/id/237/200/300" },
  //   { id: 12, title: "This is the biggest description of the Movie 3", image: "https://picsum.photos/200/300?grayscale" },
  //   ];
  
  // const recommendedMovies = [
  //   { id: 1, title: "This is the biggest description of the Movie 4", image: "https://picsum.photos/200/300/?blur" },
  //   { id: 2, title: "This is the biggest description of the Movie 5", image: "https://picsum.photos/id/870/200/300?grayscale&blur=2" },
  //   { id: 3, title: "This is the biggest description of the Movie 6", image: "https://picsum.photos/200/300.jpg" },
  //   { id: 4, title: "This is the biggest description of the Movie 4", image: "https://picsum.photos/200/300/?blur" },
  //   { id: 5, title: "This is the biggest description of the Movie 5", image: "https://picsum.photos/id/870/200/300?grayscale&blur=2" },
  //   { id: 6, title: "This is the biggest description of the Movie 6", image: "https://picsum.photos/200/300.jpg" },
  //   { id: 7, title: "This is the biggest description of the Movie 4", image: "https://picsum.photos/200/300/?blur" },
  //   { id: 8, title: "This is the biggest description of the Movie 5", image: "https://picsum.photos/id/870/200/300?grayscale&blur=2" },
  //   { id: 9, title: "This is the biggest description of the Movie 6", image: "https://picsum.photos/200/300.jpg" },
  //   ];
  
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

      const handleLogin = (userId : string) =>  {
        setIsLoggedIn(true);
        setUserId(userId);
        document.body.classList.add('no-scroll'); // To add scroll bar
        defaultSettings.selectedUser = userId
        fetchMovies(defaultSettings); // Fetch movies when user logs in
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
                  <RecommendedMoviesPanel onSaveSettingsExt={handleSaveSettings} movies={recommendedMovies} />
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