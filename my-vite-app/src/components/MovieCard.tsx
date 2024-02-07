import { Movie } from '../services/types'; // Importa la interfaz Movie
import { Link } from 'react-router-dom';

// interface Movie {
//     title: string;
//     poster_path: string;
// }

interface MovieCardProps {
    movie: Movie;
    baseImageURL: string;
}

export function MovieCard({ movie, baseImageURL }: MovieCardProps) {
    const movieDetailLink = `/movie/${movie.id}`;
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
    return (
        <Link to={movieDetailLink}>
            <div className="movie-card">
                {releaseYear && (
                    <span className="release-year">{releaseYear}</span>
                )}
                <img
                    src={`${baseImageURL}/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-image"
                />
                <div className="movie-info movie-info-bold">
                    <p className="movie-title">{movie.title}</p>
                </div>
            </div>
        </Link>
    );
}