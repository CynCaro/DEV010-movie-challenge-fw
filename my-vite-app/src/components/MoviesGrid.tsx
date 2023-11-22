import { MovieCard } from './MovieCard';
import { Movie } from '../services/types'; // Importa la interfaz Movie

// interface Movie {
//   title: string;
//   poster_path: string;
// }

interface MoviesGridProps {
  movies: Movie[];
}

const baseImageURL = 'https://image.tmdb.org/t/p/original'; // Tamaño de imagen que prefieras

export function MoviesGrid({ movies }: MoviesGridProps) {
    console.log(movies); // Agregar este log
  return (
    <div className="movies-grid">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} baseImageURL={baseImageURL} />
      ))}
    </div>
  );
}