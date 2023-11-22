import LogoImage from '../assets/logo-cinematrix.png'; 
import MovieSearch from '../components/MovieSearch';

interface HeaderProps {
    onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
    const handleSearch = (query: string) => {
        onSearch(query);
    }
    return (
        <header className="app-header">
            <img src={LogoImage} alt="Logo" className="logo-image" />
            <MovieSearch onSearch={handleSearch} />
        </header>
    );
}
