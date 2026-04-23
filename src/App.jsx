import { useState } from "react";
import { searchMovies } from "./services/api";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchMovies(query);
      const formatted = data.map(item => ({
        id: item.show.id,
        title: item.show.name,
        year: item.show.premiered ? item.show.premiered.slice(0, 4) : "—",
        image: item.show.image?.medium || "https://via.placeholder.com/210x295"
      }));
      setMovies(formatted);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.find(f => f.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>🎬 Movies App</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movie..."
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Results</h2>
      <div className="grid">
        {movies.map(movie => (
          <div key={movie.id} className="card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <button onClick={() => addToFavorites(movie)}>❤️ Favorite</button>
          </div>
        ))}
      </div>

      <h2>⭐ Favorites</h2>
      <div className="grid">
        {favorites.map(movie => (
          <div key={movie.id} className="card">
            <img src={movie.image} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;