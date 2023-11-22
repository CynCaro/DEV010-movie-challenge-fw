import { useState, useEffect } from 'react'
import { Movie } from './services/types'; // Importa la interfaz Movie
import { Header } from './components/Header'
import { MoviesGrid } from './components/MoviesGrid'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import tmdbService from './services/tmdbService';
import Pagination from './components/Pagination';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]); //Especifica que es un array de Movie
  const [currentPage, setCurrentPage] = useState(1); //Inicializa en 1 o en la página que desees

  //Parte de la lógica para manejar la búsqueda de películas en respuesta a alguna interacción del usuario, como al enviar un formulario de búsqueda
  const handleSearch = async (query: string) => {
    try {
      const response = await tmdbService(query);
      setMovies(response);
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  };

    const handlePageChange = (page: number) => {
    // Actualiza la página actual cuando el usuario hace clic en un botón de paginación
    setCurrentPage(page);
    // Aquí podrías realizar otra lógica, como cargar datos específicos de la nueva página, si es necesario
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbService('');
        setMovies(response);
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <h1>Mis Películas</h1>
      <MoviesGrid movies={movies} />
      <Pagination pageCount={10} currentPage={currentPage} onPageChange={handlePageChange} />
      <p className="read-the-docs">
        Aquí puedes comenzar a construir tu página de películas.
      </p>
    </>
  );
}

export default App
