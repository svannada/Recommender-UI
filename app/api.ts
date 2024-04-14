import axios from 'axios';

// Define the Settings interface
export interface Settings {
  contentValue: number;
  similarUserValue: number;
  selectedUser: string;
  numRecommendations: number; 
}

// Define the type for the response data
export interface Movie {
  movieId: number;
  title: string;
  cover_url: string;
}


// API function to fetch recommended and watched movies
export const fetchRecommendedAndWatchedMovies = async (settings: Settings): Promise<{ recommendedMovies: Movie[], watchedMovies: Movie[] }> => {
  try {

    // Extract the numeric part from the selectedUser
    const userId = settings.selectedUser?.match(/\d+/)?.[0];

    // Construct the API URL with parameters
    const API_URL = `https://data472recommenderapi-dfd873cfc1f2.herokuapp.com/api/recommend?userId=${userId}&contentSlider=${settings.contentValue}&userSimilaritySlider=${settings.similarUserValue}&numRecommendations=${settings.numRecommendations}`;
    
    // Make a GET request to the constructed URL
    const response = await axios.get(API_URL);
    
    // Extract the recommended movies and watched movies from the response data
    const recommendedMovies: Movie[] = response.data.recommended_movies;
    const watchedMovies: Movie[] = response.data.watched_movies;
    
    return { recommendedMovies, watchedMovies };
  } catch (error) {
    // Handle errors
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// API function to fetch popular user list
export const fetchPopularUsers = async (): Promise<{ popularUsers: string[] }> => {
  try {

    // Construct the API URL with parameters
    const API_URL = `https://data472recommenderapi-dfd873cfc1f2.herokuapp.com/api/popularusers`;
    
    // Make a GET request to the constructed URL
    const response = await axios.get(API_URL);
    
    // Extract the popular Users from the response data
    const popularUsers: string[] = response.data.popular_users;
    
    return { popularUsers};
  } catch (error) {
    // Handle errors
    console.error('Error fetching popular users:', error);
    throw error;
  }
};
