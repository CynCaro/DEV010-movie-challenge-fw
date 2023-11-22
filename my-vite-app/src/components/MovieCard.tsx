import { Movie } from '../services/types'; // Importa la interfaz Movie

// interface Movie {
//     title: string;
//     poster_path: string;
// }

interface MovieCardProps {
    movie: Movie;
    baseImageURL: string;
}

export function MovieCard({ movie, baseImageURL }: MovieCardProps) {
    return (
        <div className="movie-card">
            <img
                src={`${baseImageURL}/${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
            />
            <div className="movie-info movie-info-bold">
                <p className="movie-title">{movie.title}</p>
            </div>
        </div>
    );
}