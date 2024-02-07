import { MovieCard } from './MovieCard';
import { Movie } from '../services/types'; // Importa la interfaz Movie
import { useEffect } from 'react';

interface MoviesGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const baseImageURL = 'https://image.tmdb.org/t/p/original'; // Tamaño de imagen que prefieras

export function MoviesGrid({ movies }: MoviesGridProps) {
  useEffect(() => {
    console.log('Movies in MoviesGrid:', movies);

    // Acciones adicionales cuando cambien las películas
  }, [movies]);

  return (
    <div className="movies-grid">
      {movies && movies.length > 0 ? ( //comprobación, antes de intentar realizar el mapeo
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} baseImageURL={baseImageURL} />
        ))
      ) : (
        <p>No hay películas disponibles.</p>
      )}
    </div>
  );
}