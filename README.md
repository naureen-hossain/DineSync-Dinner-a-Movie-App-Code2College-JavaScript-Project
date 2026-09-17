# DineSync: Dinner & a Movie App | Code2College JavaScript Project

A React-based web app that pairs restaurants and movies using the Yelp and TMDB APIs, built as part of the Code2College JavaScript Project Series.

DineSync is an interactive React web application that makes planning a dinner and movie easier. The app uses the **Yelp API** to discover restaurants and **The Movie Database (TMDB) API** to discover movies, then combines them into randomized recommendations that users can regenerate without refreshing the page.

Users can enter their location, filter restaurants by cuisine, select a movie genre, generate new pairings, and save their favorite combinations for later.

This project was developed as part of the **Code2College Internship Prep Project Series** to demonstrate JavaScript, React, API integration, JSON data processing, user interaction, persistent browser storage, responsive front-end development, and web deployment.

**One click. One dinner. One movie. One less decision.**

## Features

* Generates randomized restaurant and movie pairings.
* Retrieves live restaurant data from the Yelp API.
* Retrieves live movie data from the TMDB API.
* Searches for restaurants based on the user's location.
* Filters restaurant recommendations by cuisine.
* Filters movie recommendations by genre.
* Displays restaurant names, ratings, categories, locations, and images.
* Displays movie titles, ratings, release years, posters, and descriptions.
* Allows users to generate new pairings without refreshing the page.
* Allows users to save multiple dinner and movie combinations.
* Preserves Saved Nights across page refreshes using local storage.
* Allows users to remove individual favorites or clear their collection.
* Links users to additional restaurant and movie information.
* Includes loading and error handling for API requests.
* Uses responsive CSS for a polished cinematic interface.
* Uses serverless API endpoints to keep API credentials out of client-side code.

## Technologies

| Technology | Purpose |
| --- | --- |
| JavaScript | Application logic and data processing. |
| React | Components, state management, and dynamic rendering. |
| HTML | Application structure. |
| CSS | Styling and responsive design. |
| Fetch API | Asynchronous requests for external data. |
| JSON | Processing API response data. |
| Yelp API | Restaurant information and recommendations. |
| TMDB API | Movie information and recommendations. |
| Local Storage | Persistent Saved Nights data. |
| Vercel | Deployment and serverless API functions. |
| GitHub | Version control and project management. |

## Project Structure

```text
DineSync/
├── api/
│   ├── movies.js
│   └── restaurants.js
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

## How It Works

1. The user enters a location and optionally selects a cuisine and movie genre.
2. DineSync sends requests to its restaurant and movie API endpoints using the Fetch API.
3. The serverless endpoints securely request live data from Yelp and TMDB.
4. The returned JSON data is processed using JavaScript.
5. A restaurant and movie are randomly selected from the available results and stored in React state.
6. React dynamically displays the pairing without reloading the webpage.
7. The user can generate another combination or save the pairing to Saved Nights.
8. Saved pairings are stored using local storage so they remain available after the page is refreshed.

## Code2College Milestones

* **Milestone 1:** Created a functional React site and initial interface.
* **Milestone 2:** Added user interactions, API requests, and JSON data processing.
* **Milestone 3:** Integrated and displayed live restaurant and movie API data.
* **Milestone 4:** Created a polished, responsive interface using CSS and formatted API data.

## Additional Features

DineSync goes beyond the base project requirements with:

* Location-based restaurant discovery.
* Cuisine and movie genre filters.
* Persistent favorite dinner and movie combinations.
* Saved Nights management.
* Randomized recommendation controls.
* Responsive restaurant and movie cards.
* Restaurant and movie information links.
* Loading and error states.
* Secure serverless API handling.
* Live Vercel deployment.
* A responsive cinematic dark interface.

## Live Application

**DineSync:** https://dinesync-five.vercel.app/

## Developer

**Naureen Hossain**  
Student Developer | Code2College

## Project Status

**Completed**

DineSync was completed through the four Code2College project milestones and extended with additional functionality, API security, persistent storage, responsive design, and live deployment.

### DineSync

**One click. One dinner. One movie. One less decision.**

This product uses the TMDB API but is not endorsed or certified by TMDB.
