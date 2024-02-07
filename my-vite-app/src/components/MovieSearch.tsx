import React, { useState, ChangeEvent, FormEvent } from 'react';
import SearchIcon from '../assets/search-solid.svg';

interface MovieSearchProps {
    onSearch: (query: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        console.log('Input Changed:', event.target.value);
        // Realizar la búsqueda al escribir
        onSearch(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Submitted:', query);
        // Llama a la función de búsqueda pasando la consulta como argumento
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="movie-search">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <img src={SearchIcon} alt="Search Icon" />
                </button>
            </div>
        </form>
    );
}

export default MovieSearch;