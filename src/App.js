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
  const [pairingCount, setPairingCount] = useState(0);

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("dinesync-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
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
      setPairingCount((count) => count + 1);
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
    if (!restaurant || !movie) {
      return;
    }

    const newFavorite = {
      id: `${restaurant.id}-${movie.id}-${Date.now()}`,
      restaurantName: restaurant.name,
      restaurantRating: restaurant.rating,
      restaurantURL: restaurant.url,
      restaurantImage: restaurant.image_url,
      movieTitle: movie.title,
      movieRating: movie.vote_average,
      moviePoster: movie.poster_path,
      movieId: movie.id
    };

    setFavorites((currentFavorites) => [
      newFavorite,
      ...currentFavorites
    ]);
  }

  function removeFavorite(id) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== id)
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
            Stop debating where to eat and what to watch. Tell
            DineSync where you are, choose your preferences, and
            discover your next dinner and movie combination.
          </p>

          <div className="location-field">
            <label htmlFor="location">WHERE ARE YOU DINING?</label>

            <input
              id="location"
              type="text"
              value={location}
              placeholder="Austin, TX"
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={handleLocationKeyDown}
            />
          </div>

          <div className="filters">
            <select
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              aria-label="Choose cuisine"
            >
              <option value="">Any Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Thai">Thai</option>
              <option value="Korean">Korean</option>
              <option value="American">American</option>
            </select>

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              aria-label="Choose movie genre"
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
            <div>
              <p className="eyebrow dark">TONIGHT'S PAIRING</p>
              <h2>Dinner + Movie</h2>
            </div>

            {pairingCount > 0 && (
              <span className="pairing-count">
                {pairingCount}{" "}
                {pairingCount === 1 ? "pairing" : "pairings"} explored
              </span>
            )}
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
                      <span>
                        {restaurant.location.city}
                        {restaurant.location.state
                          ? `, ${restaurant.location.state}`
                          : ""}
                      </span>
                    )}
                  </div>

                  {restaurant.url && (
                    <a
                      className="card-link"
                      href={restaurant.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Yelp ↗
                    </a>
                  )}
                </>
              ) : (
                <div className="empty-card">
                  <span>01</span>
                  <h3>Waiting for your pick.</h3>
                  <p>
                    Enter your location and let DineSync find your
                    dinner.
                  </p>
                </div>
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
                    <span>
                      ★{" "}
                      {typeof movie.vote_average === "number"
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>

                  <p className="movie-overview">{movie.overview}</p>

                  <a
                    className="card-link"
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on TMDB ↗
                  </a>
                </>
              ) : (
                <div className="empty-card">
                  <span>02</span>
                  <h3>Waiting for your pick.</h3>
                  <p>
                    Choose a genre or let DineSync surprise you.
                  </p>
                </div>
              )}
            </article>
          </div>

          {restaurant && movie && (
            <div className="pairing-actions">
              <button
                className="secondary-button"
                onClick={savePairing}
              >
                ♡ Save This Pairing
              </button>

              <button
                className="text-button"
                onClick={generatePairing}
                disabled={loading}
              >
                Try Another ↻
              </button>
            </div>
          )}
        </section>

        <section className="favorites-section">
          <div className="favorites-heading">
            <div>
              <p className="eyebrow dark">YOUR COLLECTION</p>
              <h2>Saved Nights</h2>
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
                When you find a pairing you love, save it here for
                later.
              </p>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <article
                  className="favorite-card"
                  key={favorite.id}
                >
                  <div className="favorite-number">
                    SAVED PAIRING
                  </div>

                  <div className="favorite-pair">
                    <div>
                      <span>DINNER</span>
                      <h3>{favorite.restaurantName}</h3>
                      <p>★ {favorite.restaurantRating}</p>
                    </div>

                    <strong>+</strong>

                    <div>
                      <span>MOVIE</span>
                      <h3>{favorite.movieTitle}</h3>
                      <p>
                        ★{" "}
                        {typeof favorite.movieRating === "number"
                          ? favorite.movieRating.toFixed(1)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="favorite-actions">
                    {favorite.restaurantURL && (
                      <a
                        href={favorite.restaurantURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Restaurant ↗
                      </a>
                    )}

                    <a
                      href={`https://www.themoviedb.org/movie/${favorite.movieId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Movie ↗
                    </a>

                    <button
                      onClick={() =>
                        removeFavorite(favorite.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
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
                Enter your location and select a cuisine and movie
                genre, or leave the filters open for a surprise.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Pair</h3>
              <p>
                DineSync retrieves live restaurant and movie data and
                randomly creates your combination.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Save</h3>
              <p>
                Keep your favorite combinations in your personal
                Saved Nights collection.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>DineSync</strong>
        <p>Built by Naureen Hossain for Code2College.</p>

        <p className="tmdb-credit">
          This product uses the TMDB API but is not endorsed or
          certified by TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
