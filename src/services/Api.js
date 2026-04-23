const API = "https://api.tvmaze.com";

export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(`${API}/search/shows?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};