# Next JS App - Movie Recommender System

## Introduction
This Next JS application implements a movie recommender system for a logged in user. When the user logins to the system, already watched movies are displayed on the left side of the screen and the recommended movies are displayed on the right side of the screen based on collaborative filtering and content-based filtering techniques. These recommendations can be controlled by the recommendation settings represented by the settings icon present in the recommendation panel. This allows more agency to the user in fine tuning the recommendations. 

## Login Screen
- This requires the User ID which is nothing but the users present in the MovieLens small dataset.
- Example of the User ID is - User 1. Where 1 is the the User ID in the MovieLens dataset.
- Required Password needs to be given for the corresponding User.

## Watched Movies
- This UI panel contains the code to show the watched movies based on the logged in user.
- This data is again fetched against the MovieLens small dataset.

## Recommended Movies
- This UI panel contains the code to show the recommended movies based on the recommendation settings.
- The recommendation settings can be configured further. The settings include  - Content Slider, Similar User, Popular User and # of Recommendations.

## Home Screen
- This would be the launch point of the application. 
- The home screen would contain Header, Login Screen , Watched and Recommended Movie panels. 

## api.ts
- Function to trigger the api to get the watched, recommended movies based on the recommendation settings.   
- Function to trigger the api to get the popular users from the MovieLens small dataset.

## Styles
- Component level styling is maintained at ./components/css level. As of now the component level styling is done for only recommended movie settings panel. 
- Global styles are present at globals.css 

## CORS
- CORS Settings are configured in the next.config.js

## Usage
1. The application can be run using `npm run dev`

## Deployed URL
This API is deployed at Vercel with the URL - https://recommender-ui.vercel.app/

## Author
Sridhar

## Date
04/25/2024
