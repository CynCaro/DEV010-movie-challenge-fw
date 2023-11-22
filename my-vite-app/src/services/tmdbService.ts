// Servicio para gestionar las solicitudes a la API de TMDB
import axios from 'axios';
import { Movie } from '../services/types'; // Importa la interfaz Movie

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '4e88ef98afd8eeb07600b3e91464bebd';

// interface Movie {
//   // Define la estructura de tu objeto Movie según la respuesta de la API
//   title: string;
//   // Otros campos según la respuesta de la API
// }

const tmdbService = async (searchKey: string): Promise<Movie[]> => {
  try {
    const type = searchKey ? 'search' : 'discover';
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    return results;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    throw error;
  }
};

export default tmdbService;