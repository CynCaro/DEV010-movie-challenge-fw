import React, { useEffect, useState } from 'react';
import tmdbService from '../services/tmdbService';
import { Genre } from '../services/types';

interface FiltersProps {
    onFilterChange: (type: string, value: string | number) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [selectedPopularity, setSelectedPopularity] = useState<'desc' | 'asc' | undefined>(undefined);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | number>('');

    useEffect(() => { //Hook que se ejecuta después de que el componente Filters ha sido montado en el DOM
        const fetchGenres = async () => { //Función que realiza la llamada a la API para obtener los géneros utilizando la función getGenres
            try { //Bloque try-catch para manejar posibles errores durante la llamada a la API
                const response = await tmdbService({});
                setGenres(response.genres); //Si la llamada es exitosa, establece los géneros en el estado mediante
            } catch (error) {
                console.error('Error al obtener géneros:', error);
            }
        };

        fetchGenres(); //Llamando a la función después de que el componente se monta
    }, []);

    const handlePopularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as 'asc' | 'desc';
        setSelectedPopularity(selectedValue);
        onFilterChange('popularity', selectedValue);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedGenre(selectedValue);
        onFilterChange('genre', selectedValue);
    };


    return (
        <div className="filters">
            {/* Desplegable para popularidad */}
            <select value={selectedPopularity || ''} onChange={handlePopularityChange} className="filter-dropdown filter-popularity">
                <option value="" disabled>
                    Popularity
                </option>
                <option value="asc">Least Popular</option>
                <option value="desc">Most Popular</option>
            </select>
            <button className="filter-button" onClick={() => onFilterChange('top_rated', 'some_value')}>
                Top Rated
            </button>
            <button className="filter-button" onClick={() => onFilterChange('upcoming', 'some_value')}>
                Upcoming
            </button>
            {/* Desplegable para géneros */}
            <select value={selectedGenre} onChange={handleGenreChange} className="filter-dropdown">
                <option value="" disabled>
                    Select a Genre
                </option>
                {genres && genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;