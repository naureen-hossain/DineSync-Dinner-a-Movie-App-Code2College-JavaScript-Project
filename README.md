# DineSync-Dinner-a-Movie-App-Code2College-JavaScript-Project

A React-based web app that pairs restaurants and movies using the Yelp and TMDB APIs, built as part of the Code2College JavaScript project series.

# DineSync

### Dinner & a Movie App | Code2College JavaScript Project

DineSync is an interactive React web application that makes planning a dinner and movie easier. The app uses the **Yelp API** to discover restaurants and **The Movie Database (TMDB) API** to discover movies, then combines them into randomized recommendations that users can regenerate without refreshing the page.

This project was developed as part of the **Code2College Internship Prep Project Series** to demonstrate JavaScript, React, API integration, user interaction, and front-end development.

## Features

* Generates randomized restaurant and movie pairings.
* Retrieves live restaurant data from the Yelp API.
* Retrieves movie information from the TMDB API.
* Displays restaurant names, ratings, categories, and images.
* Displays movie titles, ratings, posters, and descriptions.
* Allows users to generate new pairings without refreshing the page.
* Includes loading and error handling for API requests.
* Uses responsive CSS for a polished interface.
* Supports additional filtering and recommendation features.

## Technologies

| Technology | Purpose                                   |
| ---------- | ----------------------------------------- |
| JavaScript | Application logic and data processing.    |
| React      | Components, state, and dynamic rendering. |
| HTML       | Application structure.                    |
| CSS        | Styling and responsive design.            |
| Fetch API  | Requests data from external APIs.         |
| Yelp API   | Provides restaurant data.                 |
| TMDB API   | Provides movie data.                      |
| GitHub     | Version control and project management.   |

## Project Structure

```text
DineSync-Code2College-JS/
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

1. DineSync requests restaurant and movie data from the Yelp and TMDB APIs.
2. The returned JSON data is processed using JavaScript.
3. A restaurant and movie are selected and stored in React state.
4. React dynamically displays the pairing to the user.
5. The user can generate another combination without reloading the webpage.

## Code2College Milestones

* **Milestone 1:** Create a functional React site.
* **Milestone 2:** Add user interactions and retrieve JSON data from APIs.
* **Milestone 3:** Display restaurant and movie API data to the user.
* **Milestone 4:** Create a polished interface using CSS and formatted data.

## Additional Features

DineSync is designed to go beyond the base project requirements with features such as:

* Cuisine and movie genre filters.
* Favorite dinner and movie combinations.
* Improved recommendation controls.
* Responsive restaurant and movie cards.
* Shareable recommendations.

## Developer

**Naureen Hossain**
Student Developer | Code2College

## Project Status

**In Development**

DineSync is currently being developed through the four Code2College project milestones.

### DineSync

**One click. One dinner. One movie. One less decision.**
