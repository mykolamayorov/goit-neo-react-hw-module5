import { useState, useEffect, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        &larr; Go back
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {movie && (
        <>
          <div className={styles.details}>
            <img
              src={
                movie.poster_path
                  ? IMAGE_BASE_URL + movie.poster_path
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              className={styles.poster}
            />
            <div className={styles.info}>
              <h2>{movie.title}</h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map((g) => g.name).join(", ")}</p>
            </div>
          </div>

          <div className={styles.additional}>
            <h3>Additional information</h3>
            <ul className={styles.castReviewsMenu}>
              <li className={styles.menuItem}>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.menuLink} ${styles.active}`
                      : styles.menuLink
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.menuLink} ${styles.active}`
                      : styles.menuLink
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
