import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {loading && <p>Loading reviews...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p>No reviews available.</p>
      )}

      <ul className={styles.list}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.item}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
