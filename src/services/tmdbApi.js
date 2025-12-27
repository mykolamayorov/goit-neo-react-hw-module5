import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMovies = () => tmdbApi.get("/trending/movie/day");

export const searchMovies = (query) =>
  tmdbApi.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

export const fetchMovieDetails = (movieId) => tmdbApi.get(`/movie/${movieId}`);

export const fetchMovieCredits = (movieId) =>
  tmdbApi.get(`/movie/${movieId}/credits`);

export const fetchMovieReviews = (movieId) =>
  tmdbApi.get(`/movie/${movieId}/reviews`);
