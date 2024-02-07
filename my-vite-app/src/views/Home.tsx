import { useStateValue } from '../states/stateUtils';
import { useState, useEffect, useCallback } from 'react'
import { Movie, Genre } from '../services/types'; // Importa la interfaz Movie
import { Header } from '../components/Header'
import { MoviesGrid } from '../components/MoviesGrid'
import '../App.css'
import tmdbService from '../services/tmdbService';
import { TmdbServiceParams } from '../services/types';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate(); //Hook useNavigate de React Router para obtener una función de navegación que se puede utilizar para navegar a diferentes rutas en la aplicación
    const { setSelectedMovie } = useStateValue() || {}; // Hook useStateValue para obtener el valor actual del estado global de la aplicación
    const [movies, setMovies] = useState<Movie[]>([]); // Se utiliza el hook useState para definir un estado local llamado movies, que almacenará la lista de películas que se mostrarán en la página. setMovies es la función que se utilizará para actualizar este estado
    const [totalMovies, setTotalMovies] = useState<number>(0); // Este estado local totalMovies se utiliza para almacenar el número total de películas disponibles en la base de datos. Inicialmente, se establece en 0. setTotalMovies es la función que se utilizará para actualizar este estado
    const [currentPage, setCurrentPage] = useState(1); //  Este estado local currentPage se utiliza para realizar un seguimiento de la página actual de resultados de películas que se están mostrando. Inicialmente, se establece en 1, lo que significa que la primera página se mostrará inicialmente. setCurrentPage es la función que se utilizará para actualizar este estado
    const [currentFilter, setCurrentFilter] = useState<string | number>(''); // Este estado local currentFilter se utiliza para almacenar el filtro actual aplicado a las películas, como un género específico. Inicialmente, se establece en una cadena vacía. setCurrentFilter es la función que se utilizará para actualizar este estado
    const [pageCount, setPageCount] = useState<number>(0); // Almacenar pageCount en el estado del componente

    // Esta función se utiliza para manejar la selección de una película
    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie); // Cuando se selecciona una película, se actualiza el estado global para almacenar la película seleccionada y se navega a la ruta de detalle de esa película
        navigate(`/movie/${movie.id}`);
    };

    const fetchMovies = async (params: TmdbServiceParams) => {
        try {
            const response: {
                movies?: Movie[];
                genres: Genre[];
                total_results?: number;
                total_pages?: number;
            } = await tmdbService(params);
            return response;
        } catch (error) {
            console.error('Error al obtener películas:', error);
            throw error;
        }
    };

    // Esta función toma un parámetro params de tipo TmdbServiceParams
    const fetchData = useCallback(async (params?: TmdbServiceParams) => {
        try { // Ejecuta la lógica principal de la función
            const serviceParams: TmdbServiceParams = params || {
                sortOrder: undefined,
                additionalParams: {
                    page: currentPage,
                    sort_by: 'popularity.desc',
                    ...(currentFilter && { with_genres: currentFilter })
                },
            };

            // Esta línea llama a la función fetchMovies con los parámetros serviceParams
            const response = await fetchMovies(serviceParams); // Se utiliza await para esperar la respuesta de la función fetchMovies

            if (response.movies) {
                setMovies(response.movies);
                console.log('Películas actualizadas:', response.movies);
            } else {
                console.error('La respuesta de la API no contiene películas:', response);
            }

            if ('total_pages' in response && response.total_pages) {
                setTotalMovies(response.total_pages * 20);
                setPageCount(calculatePageCount(response.total_pages)); // Actualizar pageCount en el estado del componente
            } else {
                console.error('API response does not contain total pages:', response);
            }

        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error;
        }
    }, [currentPage, currentFilter]);

    // La función llama a fetchData pasando un objeto de parámetros con la clave searchKey establecida como query. Esto activa una nueva solicitud a la API con la palabra clave de búsqueda proporcionada
    const handleSearch = async (query: string) => { // Recibe una cadena query que representa la palabra clave de búsqueda
        await fetchData({ searchKey: query }); // La función fetchData se encarga de realizar la solicitud y actualizar el estado del componente con los resultados obtenidos
    };

    // Función para manejar cambios en los filtros
    const handleFilterChange = async (_type: string, value: string | number) => {
        setCurrentFilter(String(value));
        await fetchData();
    };

    // Función para manejar el cambio de página en la paginación
    const handlePageChange = (selectedItem: { selected: number }) => { // Objeto con la propiedad 'selected' que que representa el número de página seleccionado (empezando desde 0)
        console.log('Se ha cambiado a la página:', selectedItem.selected + 1);
        setCurrentPage(selectedItem.selected + 1);
    };

    const calculatePageCount = (totalPages: number) => {
        const totalPagesFromApi = Math.ceil(totalPages / 20);
        const maxPagesToShow = Math.min(totalPagesFromApi, 500);
        console.log('Número total de páginas calculado:', maxPagesToShow);
        return maxPagesToShow;
    };

    useEffect(() => {
        fetchData(); // Actualiza los datos de las películas

        // Actualiza pageCount después de recibir los datos de la API
        if (totalMovies > 0) {
            console.log('Valor de totalMovies:', totalMovies); // Agrega este console.log para verificar el valor de totalMovies
            setPageCount(calculatePageCount(totalMovies));
        }
    }, [totalMovies, fetchData, currentPage, currentFilter, setPageCount]);

    return (
        <>
            <Header onSearch={handleSearch} />
            <Filters onFilterChange={handleFilterChange} />
            <MoviesGrid movies={movies} onMovieSelect={handleMovieSelect} />
            <Pagination pageCount={pageCount} currentPage={currentPage} onPageChange={handlePageChange} />
            <p className="read-the-docs">
                Aquí puedes comenzar a construir tu página de películas.
            </p>
        </>
    );
}

export default Home;