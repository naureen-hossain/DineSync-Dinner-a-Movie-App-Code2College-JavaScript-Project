export default async function handler(req, res) {
  try {
    const location = req.query.location || "Austin, TX";
    const cuisine = req.query.cuisine || "restaurants";

    const url =
      "https://api.yelp.com/v3/businesses/search" +
      `?location=${encodeURIComponent(location)}` +
      `&term=${encodeURIComponent(cuisine)}` +
      "&limit=20" +
      "&sort_by=rating";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Yelp API returned ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to retrieve restaurant recommendations."
    });
  }
}
