import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch {
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.query.value.trim();
    if (!input) return;
    setSearchParams({ query: input });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <h2>Search Movies</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="query" placeholder="Enter movie name" />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
