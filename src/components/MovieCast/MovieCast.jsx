import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/tmdbApi.js";
import styles from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMovieCredits(movieId);
        setCast(response.data.cast);
      } catch (err) {
        setError(`Failed to fetch cast: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (!cast || cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.castItem}>
          {actor.profile_path ? (
            <img
              src={`${IMAGE_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImg}
            />
          ) : (
            <div className={styles.noImg}>No Image</div>
          )}
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
