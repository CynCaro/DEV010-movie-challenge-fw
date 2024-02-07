import ReactPaginate from 'react-paginate';

interface PaginationProps {
    pageCount: number; // Número total de páginas que se mostrarán en la paginación
    currentPage: number; // página acutal que se está mostrando
    onPageChange: (selectedItem: { selected: number }) => void; // Función que se llama cuando el usuario cambie de página
}

// Componente que renderiza la paginación en la interfaz del usuario
const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
    console.log('Número total de páginas:', pageCount);
    console.log('Página actual:', currentPage);
    return (
        <ReactPaginate
            previousLabel={currentPage > 1 ? '<' : '>'}
            nextLabel={currentPage < pageCount ? '>' : '<'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount} // Aquí pasamos directamente el número total de páginas
            marginPagesDisplayed={4} // Cuántas páginas mostrar antes y después de la página actual
            pageRangeDisplayed={4} // Cuántas páginas mostrar en total en la barra de paginación
            onPageChange={onPageChange} // La función que se llama cuando el usuario hace clic en una página. Recibe un objeto con la propiedad selected que indica la página seleccionada
            forcePage={currentPage - 1} // La página que se muestra inicialmente. Se resta 1 porque las páginas comienzan desde 0
            renderOnZeroPageCount={null} // Un valor que determina si se debe renderizar el componente incluso si pageCount es 0. En este caso, null significa que no se renderizará si no hay páginas
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
    );
};

export default Pagination;