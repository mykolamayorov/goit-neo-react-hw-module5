import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdbApi.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.data.results.slice(0, 20));
      } catch (err) {
        setError(`Failed to fetch trending movies: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading trending movies...</p>;
  if (error) return <p>{error}</p>;
  if (!movies || movies.length === 0) return <p>No movies available.</p>;

  return <MovieList movies={movies} showOnlyTitles={true} />;
};

export default HomePage;
