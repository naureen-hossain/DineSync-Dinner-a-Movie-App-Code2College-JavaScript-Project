import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [restaurant, setRestaurant] = useState(null);
  const [movie, setMovie] = useState(null);

  const [location, setLocation] = useState("Austin, TX");
  const [cuisine, setCuisine] = useState("");
  const [genre, setGenre] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("dinesync-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "dinesync-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  async function generatePairing() {
    if (!location.trim()) {
      setError("Please enter a city or location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const restaurantURL =
        `/api/restaurants?location=${encodeURIComponent(location)}` +
        `&cuisine=${encodeURIComponent(cuisine || "restaurants")}`;

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

      if (!restaurantData.businesses?.length) {
        throw new Error("No restaurants were found for that location.");
      }

      if (!movieData.results?.length) {
        throw new Error("No movies were found for that genre.");
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
      setError(
        error.message ||
          "We couldn't build your pairing. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function savePairing() {
    if (!restaurant || !movie) return;

    const newFavorite = {
      id: `${restaurant.id}-${movie.id}-${Date.now()}`,
      restaurantName: restaurant.name,
      restaurantRating: restaurant.rating,
      restaurantURL: restaurant.url,
      restaurantImage: restaurant.image_url,
      restaurantLocation:
        restaurant.location?.city || location,
      movieTitle: movie.title,
      movieRating: movie.vote_average,
      moviePoster: movie.poster_path,
      movieId: movie.id
    };

    setFavorites((current) => [newFavorite, ...current]);
  }

  function removeFavorite(id) {
    setFavorites((current) =>
      current.filter((favorite) => favorite.id !== id)
    );
  }

  function clearFavorites() {
    setFavorites([]);
  }

  function handleLocationKeyDown(event) {
    if (event.key === "Enter") {
      generatePairing();
    }
  }

  const moviePoster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="brand">
            <div className="logo">DineSync</div>
            <span>DINNER MEETS CINEMA</span>
          </div>

          <p className="nav-message">
            ✦ A PERFECT PAIRING, EVERY TIME.
          </p>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">GOOD FOOD. GREAT STORIES.</p>

          <h1>Your night, perfectly paired.</h1>

          <p className="tagline">
            Discover restaurants and movies based on your location and
            taste. DineSync creates the combination for you.
          </p>

          <div className="controls">
            <div className="control-group location-control">
              <label htmlFor="location">
                WHERE ARE YOU DINING?
              </label>

              <input
                id="location"
                type="text"
                value={location}
                placeholder="Austin, TX"
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                onKeyDown={handleLocationKeyDown}
              />
            </div>

            <div className="control-group">
              <label htmlFor="cuisine">CUISINE</label>

              <select
                id="cuisine"
                value={cuisine}
                onChange={(event) =>
                  setCuisine(event.target.value)
                }
              >
                <option value="">Any Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
                <option value="Mediterranean">
                  Mediterranean
                </option>
                <option value="Thai">Thai</option>
                <option value="Korean">Korean</option>
                <option value="American">American</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="genre">MOVIE GENRE</label>

              <select
                id="genre"
                value={genre}
                onChange={(event) =>
                  setGenre(event.target.value)
                }
              >
                <option value="">Any Genre</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="18">Drama</option>
                <option value="14">Fantasy</option>
                <option value="27">Horror</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="53">Thriller</option>
              </select>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={generatePairing}
            disabled={loading}
          >
            {loading ? "Finding Your Night..." : "✦ Find My Night"}
          </button>
        </div>
      </header>

      <main className="main-content">
        {error && <p className="error-message">{error}</p>}

        <section className="results-section">
          <div className="result-grid">
            <article className="result-card">
              {restaurant ? (
                <>
                  {restaurant.image_url && (
                    <img
                      className="restaurant-image"
                      src={restaurant.image_url}
                      alt={restaurant.name}
                    />
                  )}

                  <div className="result-info">
                    <p className="result-label">RESTAURANT</p>

                    <h2>{restaurant.name}</h2>

                    <div className="rating-row">
                      <strong>★ {restaurant.rating}</strong>

                      {restaurant.price && (
                        <span>{restaurant.price}</span>
                      )}
                    </div>

                    <p className="result-meta">
                      {restaurant.categories
                        ?.map((category) => category.title)
                        .join(" · ")}
                    </p>

                    {restaurant.location && (
                      <p className="result-meta">
                        {restaurant.location.display_address?.join(
                          ", "
                        )}
                      </p>
                    )}

                    {restaurant.url && (
                      <a
                        className="outline-button"
                        href={restaurant.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View on Yelp ↗
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <div className="empty-result">
                  <p className="result-label">RESTAURANT</p>
                  <h2>Your dinner will appear here.</h2>
                  <p>
                    Choose your preferences and discover somewhere
                    new.
                  </p>
                </div>
              )}
            </article>

            <div className="plus">+</div>

            <article className="result-card">
              {movie ? (
                <>
                  {moviePoster && (
                    <img
                      className="movie-image"
                      src={moviePoster}
                      alt={`${movie.title} poster`}
                    />
                  )}

                  <div className="result-info">
                    <p className="result-label">MOVIE</p>

                    <h2>{movie.title}</h2>

                    <div className="rating-row">
                      <strong>
                        ★{" "}
                        {typeof movie.vote_average === "number"
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </strong>

                      {movie.release_date && (
                        <span>
                          {movie.release_date.substring(0, 4)}
                        </span>
                      )}
                    </div>

                    <p className="movie-overview">
                      {movie.overview}
                    </p>

                    <a
                      className="outline-button"
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on TMDB ↗
                    </a>
                  </div>
                </>
              ) : (
                <div className="empty-result">
                  <p className="result-label">MOVIE</p>
                  <h2>Your movie will appear here.</h2>
                  <p>
                    Pick a genre or leave it open for a surprise.
                  </p>
                </div>
              )}
            </article>
          </div>

          {restaurant && movie && (
            <div className="result-actions">
              <button
                className="try-button"
                onClick={generatePairing}
                disabled={loading}
              >
                Try Another ↻
              </button>

              <button
                className="save-button"
                onClick={savePairing}
              >
                ♡ Save This Pairing
              </button>
            </div>
          )}
        </section>

        <section className="favorites-section">
          <div className="favorites-heading">
            <div>
              <p className="result-label">YOUR COLLECTION</p>
              <h2>Saved Nights</h2>
              <p>
                Your favorite dinner and movie pairings, all in one
                place.
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                className="clear-button"
                onClick={clearFavorites}
              >
                Clear All
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="favorites-empty">
              <span>♡</span>
              <h3>No saved nights yet.</h3>
              <p>
                Save a pairing you love and it will appear here.
              </p>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((favorite) => {
                const favoritePoster = favorite.moviePoster
                  ? `https://image.tmdb.org/t/p/w200${favorite.moviePoster}`
                  : null;

                return (
                  <article
                    className="favorite-card"
                    key={favorite.id}
                  >
                    <div className="favorite-images">
                      {favorite.restaurantImage && (
                        <img
                          src={favorite.restaurantImage}
                          alt=""
                        />
                      )}

                      {favoritePoster && (
                        <img
                          src={favoritePoster}
                          alt=""
                        />
                      )}
                    </div>

                    <div className="favorite-info">
                      <span>DINNER + MOVIE</span>
                      <h3>{favorite.restaurantName}</h3>
                      <p>{favorite.movieTitle}</p>
                      <small>
                        {favorite.restaurantLocation}
                      </small>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFavorite(favorite.id)
                      }
                      aria-label="Remove saved pairing"
                    >
                      ×
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>DineSync</strong>
          <span>DINNER MEETS CINEMA</span>
        </div>

        <p>Good food. Great stories. A better night. ✦</p>

        <div className="footer-right">
          <span>Built by Naureen Hossain.</span>
          <small>
            This product uses the TMDB API but is not endorsed or
            certified by TMDB.
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
