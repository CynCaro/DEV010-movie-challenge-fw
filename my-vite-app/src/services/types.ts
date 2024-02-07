import { ReactNode, Dispatch, SetStateAction } from "react";

//Interfaz para Movie, describe las propiedades de una película individual
export interface Movie {
  total_results(total_results: unknown): unknown;
  length: number;
  results: Movie;
  genres: Genre[];
  runtime: ReactNode;
  id: number;
  title: string;
  poster_path: string;
  release_date?: string; // Una cadena que representa la fecha de lanzamiento de la película
  overview: string;
  vote_average: ReactNode;
  genre_ids: number[];
}

// Nueva interfaz para la respuesta, describe la estructura de la respuesta de la API, incluye el total de resultados y la matriz de películas
export interface MovieListResponse {
  length: number;
  release_date: string | number | Date;
  genres(genres: unknown): unknown;
  total_results: number;
  results: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}

// Define el tipo para el valor del contexto
export interface StateContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: Dispatch<SetStateAction<Movie | null>>;
  genres: Genre[]; // Añade el array de géneros al contexto
  setGenres: Dispatch<SetStateAction<Genre[]>>; // Añade la función setGenres al contexto
}

// Define una interfaz para los parámetros de tmdbService
export interface TmdbServiceParams {
  searchKey?: string;
  sortOrder?: string;
  movieId?: string; // Nuevo parámetro
  additionalParams?: {
    setGenres?: React.Dispatch<React.SetStateAction<Genre[]>>;
    page?: number;
    sort_by?: string;
    with_genres?: string | number;
    language?: string;
  };
}
