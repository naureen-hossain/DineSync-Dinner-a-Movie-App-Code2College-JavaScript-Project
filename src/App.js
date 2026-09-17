import { useState } from "react";
import "./App.css";

function App() {
  const [restaurant, setRestaurant] = useState(null);
  const [movie, setMovie] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function generatePairing() {
    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const restaurantURL =
        `/api/restaurants?cuisine=${encodeURIComponent(
          cuisine || "restaurants"
        )}`;

      const movieURL =
        `/api/movies?genre=${encodeURIComponent(genre)}`;

      const [restaurantResponse, movieResponse] = await Promise.all([
        fetch(restaurantURL),
        fetch(movieURL)
      ]);

      if (!restaurantResponse.ok || !movieResponse.ok) {
        throw new Error("API request failed.");
      }

      const restaurantData = await restaurantResponse.json();
      const movieData = await movieResponse.json();

      if (
        !restaurantData.businesses?.length ||
        !movieData.results?.length
      ) {
        throw new Error("No recommendations were found.");
      }

      const randomRestaurant =
        restaurantData.businesses[
          Math.floor(Math.random() * restaurantData.businesses.length)
        ];

      const randomMovie =
        movieData.results[
          Math.floor(Math.random() * movieData.results.length)
        ];

      setRestaurant(randomRestaurant);
      setMovie(randomMovie);
    } catch (error) {
      console.error(error);
      setError("We couldn't build your pairing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function savePairing() {
    if (!restaurant || !movie) return;

    const pairing = {
      restaurant: restaurant.name,
      movie: movie.title
    };

    localStorage.setItem("dinesync-favorite", JSON.stringify(pairing));
    setSaved(true);
  }

  const moviePoster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="logo">DineSync</div>
          <span>Code2College JavaScript Project</span>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">DINNER MEETS CINEMA</p>

          <h1>
            Your night,
            <br />
            perfectly paired.
          </h1>

          <p className="tagline">
            Stop debating where to eat and what to watch. Choose your
            preferences or leave it to chance, and DineSync will create
            your night.
          </p>

          <div className="filters">
            <select
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
            >
              <option value="">Any Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="American">American</option>
            </select>

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="">Any Genre</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="27">Horror</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="9648">Mystery</option>
              <option value="16">Animation</option>
            </select>

            <button
              className="primary-button"
              onClick={generatePairing}
              disabled={loading}
            >
              {loading ? "Finding Your Night..." : "✦ Find My Night"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="pairing-section">
          <div className="section-heading">
            <p className="eyebrow dark">TONIGHT'S PAIRING</p>
            <h2>Dinner + Movie</h2>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="pairing-grid">
            <article className="recommendation-card">
              <div className="card-top">
                <span className="card-type">DINNER</span>
                <span className="card-icon">🍽️</span>
              </div>

              {restaurant ? (
                <>
                  {restaurant.image_url && (
                    <img
                      className="card-image"
                      src={restaurant.image_url}
                      alt={restaurant.name}
                    />
                  )}

                  <h3>{restaurant.name}</h3>

                  <p className="category">
                    {restaurant.categories
                      ?.map((item) => item.title)
                      .join(" • ")}
                  </p>

                  <div className="details">
                    <span>★ {restaurant.rating}</span>

                    {restaurant.price && (
                      <span>{restaurant.price}</span>
                    )}

                    {restaurant.location?.city && (
                      <span>{restaurant.location.city}</span>
                    )}
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
                  {moviePoster && (
                    <img
                      className="card-image poster"
                      src={moviePoster}
                      alt={`${movie.title} poster`}
                    />
                  )}

                  <h3>{movie.title}</h3>

                  <p className="category">
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "Release year unavailable"}
                  </p>

                  <div className="details">
                    <span>★ {movie.vote_average.toFixed(1)}</span>
                  </div>

                  <p className="movie-overview">{movie.overview}</p>
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
              <button
                className="secondary-button"
                onClick={savePairing}
              >
                {saved ? "♥ Pairing Saved" : "♡ Save Pairing"}
              </button>

              <button
                className="text-button"
                onClick={generatePairing}
              >
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
              <h3>Choose</h3>
              <p>
                Pick a cuisine and movie genre or leave both completely
                random.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Pair</h3>
              <p>
                DineSync retrieves live restaurant and movie data and
                builds your combination.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Enjoy</h3>
              <p>
                Save your pairing or instantly generate another night.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>DineSync</strong>
        <p>Built by Naureen Hossain for Code2College.</p>
        <p className="tmdb-credit">
          This product uses the TMDB API but is not endorsed or certified
          by TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
