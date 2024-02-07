// Servicio para gestionar las solicitudes a la API de TMDB
import axios from 'axios';
import { Genre, Movie } from '../services/types';
import { TmdbServiceParams } from '../services/types';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a48d09c9ee16ed9b9238019351d7660c';

// Función para obtener películas y géneros
const tmdbService = async ({ searchKey, sortOrder, movieId, additionalParams }: TmdbServiceParams): Promise<{
  movies?: Movie[]; // En Home.tsx esperamos una lista de películas
  movie?: Movie; // En MovieDetail.tsx esperamos una sola película
  genres: Genre[];
  error?: string; // Campo para el mensaje de error
}> => {
  try {
    let URL = `${API_URL}discover/movie`; // URL para descubrir películas
    if (movieId) URL = `${API_URL}/movie/${movieId}`; //"" , 0, undefined, null - falsy

    // console.log('URL de la solicitud:', URL);

    const moviesResponse = await axios.get(URL, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        sort_by: sortOrder ? `popularity.${sortOrder}` : undefined,
        ...(additionalParams || {}),
      },
    });

    console.log('Respuesta de la API de películas:', moviesResponse.data);

    // Llamada para obtener géneros
    const genresResponse = await axios.get(`${API_URL}genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    // Imprimir la respuesta de la API de géneros
    console.log('Respuesta de la API de géneros:', genresResponse.data);

    // Verificar si 'total_pages' está presente en la respuesta
    const total_pages = moviesResponse.data.total_pages;

    // Crear un objeto result y asignar las películas y géneros
    const result = {
      movies: moviesResponse.data.results,
      genres: genresResponse.data.genres,
      total_pages: total_pages // Agregar total_pages al objeto result
    };

    return result;
  } catch (error) {
    console.error('Error al obtener películas y géneros:', error);
    throw error;
  }
};

export default tmdbService;