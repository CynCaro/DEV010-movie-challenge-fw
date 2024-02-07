import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import MovieDetail from './views/MovieDetail';
import { useStateValue } from './states/stateUtils';


function App() {
  // Estado y la lógica de selección de películas dentro del componente funcional
  useStateValue();

  return (
    // Contenedor principal
      <Router>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<Home />} />
          {/* Ruta para mostrar detalles de una película */}
          <Route
            path="/movie/:id"
            element={<MovieDetail />}
          />
        </Routes>
      </Router>
  );
}

export default App;