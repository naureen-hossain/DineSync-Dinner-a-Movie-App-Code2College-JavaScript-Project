export default async function handler(req, res) {
  try {
    const genre = req.query.genre || "";

    let url =
      "https://api.themoviedb.org/3/discover/movie" +
      `?api_key=${process.env.TMDB_API_KEY}` +
      "&language=en-US" +
      "&sort_by=popularity.desc" +
      "&include_adult=false" +
      "&include_video=false" +
      "&vote_count.gte=100";

    if (genre) {
      url += `&with_genres=${encodeURIComponent(genre)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB API returned ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to retrieve movie recommendations."
    });
  }
}
