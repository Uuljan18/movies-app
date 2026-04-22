import { useState } from "react";

function App() {
  
  const movies = [
    { id: 1, title: "Интерстеллар", year: 2014, category: "Sci-Fi" },
    { id: 2, title: "Начало", year: 2010, category: "Action" },
    { id: 3, title: "Матрица", year: 1999, category: "Sci-Fi" },
    { id: 4, title: "Джокер", year: 2019, category: "Drama" },
    { id: 5, title: "Титаник", year: 1997, category: "Drama" },
    { id: 6, title: "Мстители", year: 2012, category: "Action" }
  ];

  
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const moviesPerPage = 3;

 
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial",
      maxWidth: "700px",
      margin: "0 auto"
    },
    card: {
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "8px"
    },
    button: {
      marginLeft: "10px",
      cursor: "pointer"
    }
  };

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  
  const filteredMovies = movies
    .filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(movie =>
      category === "All" ? true : movie.category === category
    );

  
  const indexOfLast = page * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div style={styles.container}>

      <h1> </h1>

      
      <input
        type="text"
        placeholder="Поиск фильма..."
        style={{ padding: "5px", width: "100%" }}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => { setCategory("All"); setPage(1); }}>Все</button>
        <button onClick={() => { setCategory("Sci-Fi"); setPage(1); }}>Sci-Fi</button>
        <button onClick={() => { setCategory("Action"); setPage(1); }}>Action</button>
        <button onClick={() => { setCategory("Drama"); setPage(1); }}>Drama</button>
      </div>

     
      <h2>Фильмы</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentMovies.map(movie => (
          <li key={movie.id} style={styles.card}>
            <b>{movie.title}</b> ({movie.year}) - {movie.category}
            <button
              style={styles.button}
              onClick={() => addToFavorites(movie)}
            >
              
            </button>
          </li>
        ))}
      </ul>

     
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{ margin: "3px" }}
          >
            {i + 1}
          </button>
        ))}
      </div>

     
      <h2> Избранное</h2>
      <ul>
        {favorites.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;