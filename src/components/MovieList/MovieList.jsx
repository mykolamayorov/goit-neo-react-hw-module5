import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, showOnlyTitles = false }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            {showOnlyTitles ? movie.title : movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
