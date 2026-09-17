import { useState } from "react";
import "./App.css";

const demoRestaurants = [
  {
    name: "Saffron Table",
    category: "Indian",
    rating: 4.7,
    price: "$$",
    location: "Downtown"
  },
  {
    name: "Casa Verde",
    category: "Mexican",
    rating: 4.6,
    price: "$$",
    location: "City Center"
  },
  {
    name: "Basil & Stone",
    category: "Italian",
    rating: 4.8,
    price: "$$$",
    location: "North District"
  }
];

const demoMovies = [
  {
    title: "Interstellar",
    genre: "Science Fiction",
    rating: 8.5,
    year: "2014"
  },
  {
    title: "Knives Out",
    genre: "Mystery",
    rating: 7.8,
    year: "2019"
  },
  {
    title: "The Truman Show",
    genre: "Comedy / Drama",
    rating: 8.2,
    year: "1998"
  }
];

function App() {
  const [restaurant, setRestaurant] = useState(null);
  const [movie, setMovie] = useState(null);
  const [saved, setSaved] = useState(false);

  function generatePairing() {
    const randomRestaurant =
      demoRestaurants[Math.floor(Math.random() * demoRestaurants.length)];

    const randomMovie =
      demoMovies[Math.floor(Math.random() * demoMovies.length)];

    setRestaurant(randomRestaurant);
    setMovie(randomMovie);
    setSaved(false);
  }

  function savePairing() {
    setSaved(true);
  }

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="logo">DineSync</div>
          <span>Code2College JS Project</span>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">DINNER MEETS CINEMA</p>
          <h1>Your night,<br />perfectly paired.</h1>

          <p className="tagline">
            Stop debating where to eat and what to watch.
            DineSync creates the combination for you.
          </p>

          <button className="primary-button" onClick={generatePairing}>
            ✦ Find My Night
          </button>
        </div>
      </header>

      <main>
        <section className="pairing-section">
          <div className="section-heading">
            <p className="eyebrow dark">TONIGHT'S PAIRING</p>
            <h2>Dinner + Movie</h2>
          </div>

          <div className="pairing-grid">
            <article className="recommendation-card">
              <div className="card-top">
                <span className="card-type">DINNER</span>
                <span className="card-icon">🍽️</span>
              </div>

              {restaurant ? (
                <>
                  <h3>{restaurant.name}</h3>
                  <p className="category">{restaurant.category}</p>

                  <div className="details">
                    <span>★ {restaurant.rating}</span>
                    <span>{restaurant.price}</span>
                    <span>{restaurant.location}</span>
                  </div>
                </>
              ) : (
                <>
                  <h3>Waiting for your pick.</h3>
                  <p className="placeholder">
                    Your restaurant recommendation will appear here.
                  </p>
                </>
              )}
            </article>

            <div className="pair-symbol">+</div>

            <article className="recommendation-card">
              <div className="card-top">
                <span className="card-type">MOVIE</span>
                <span className="card-icon">🎬</span>
              </div>

              {movie ? (
                <>
                  <h3>{movie.title}</h3>
                  <p className="category">{movie.genre}</p>

                  <div className="details">
                    <span>★ {movie.rating}</span>
                    <span>{movie.year}</span>
                  </div>
                </>
              ) : (
                <>
                  <h3>Waiting for your pick.</h3>
                  <p className="placeholder">
                    Your movie recommendation will appear here.
                  </p>
                </>
              )}
            </article>
          </div>

          {restaurant && movie && (
            <div className="pairing-actions">
              <button className="secondary-button" onClick={savePairing}>
                {saved ? "♥ Pairing Saved" : "♡ Save Pairing"}
              </button>

              <button className="text-button" onClick={generatePairing}>
                Try Another ↻
              </button>
            </div>
          )}
        </section>

        <section className="how-section">
          <p className="eyebrow dark">HOW IT WORKS</p>
          <h2>Two decisions become one.</h2>

          <div className="steps">
            <div>
              <span>01</span>
              <h3>Discover</h3>
              <p>Restaurant and movie data are gathered for your night.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Pair</h3>
              <p>DineSync randomly creates a dinner and movie combination.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Enjoy</h3>
              <p>Save your favorite pairing or instantly generate another.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>DineSync</strong>
        <p>Built by Naureen Hossain for Code2College.</p>
        <p className="tmdb-credit">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
