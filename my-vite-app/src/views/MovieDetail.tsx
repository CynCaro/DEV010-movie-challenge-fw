/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Genre, Movie } from '../services/types';
import tmdbService from '../services/tmdbService';
import './MoviesDetail.css';
import { useNavigate, useParams } from 'react-router-dom'; // Hook para regresar a la ruta deseada
import popcornImage from '../assets/popcorn.png'

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [, setLocalGenres] = useState<Genre[]>([]);
  const releaseYearRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdbService({
          movieId: id,
          additionalParams: { language: 'en-US' },
        });
        console.log('API Response:', response);
        // Verifica si la respuesta tiene la propiedad "movies" y si hay al menos una película
        if (response && response.movie) {
          const selectedMovie = response.movie; // Selecciona la primera película de la lista
          setMovie(selectedMovie);
          setLocalGenres(response.genres as Genre[]);

          releaseYearRef.current = selectedMovie.release_date
            ? new Date(selectedMovie.release_date).getFullYear()
            : null;
        } else {
          console.error('La respuesta de la API no tiene la propiedad "movies" o está vacía.');
        }
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        navigate('/'); // Redirigir a la página principal u otra página de error si hay un problema
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, navigate]);

  const handleBackToHome = () => {
    navigate('/'); // Navega a la página principal
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  console.log('Detalles de la película en renderizado:', movie);

  console.log([movie])
  return (
    <>
      {/* Agrega un botón para regresar a Home */}
      <button className="back-home-button" onClick={handleBackToHome}>Back to the catalogue</button>
      <div className="movie-detail-container">
        <div className="movie-detail-content">
          <img
            className="movie-detail-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-detail-info">
            <h2>{movie.title}</h2>
            {releaseYearRef.current && (
              <span className="release-year-detail">{releaseYearRef.current}</span>
            )}
            <div className="separator-line" />
            <div className="review-section">
              <h3>Audience Score:</h3>
              <div className="audience-score-container">
                <img
                  className="audience-score-image"
                  src={popcornImage}
                  alt="Popcorn"
                />
                <p className="audience-score">{movie.vote_average}</p>
              </div>
              <div className="separator-line" />
              <h3>Duration:</h3>
              <p>{movie.runtime} minutes</p>
              <div className="separator-line" />
              <h3>Release Year:</h3>
              <p>{movie.release_date}</p>
              <div className="separator-line" />
              <h3>Genre:</h3>
              <p>
                {movie.genres.map((genre) => (
                  <span className="genre-detail" key={genre.id}>{genre.name}</span>
                ))}
              </p>
              <div className="separator-line" />
              <h3 className='review'>Review:</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;