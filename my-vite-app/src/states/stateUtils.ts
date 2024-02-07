// useStateValue es un hook personalizado que facilita el acceso al contexto global de la aplicación
import { useContext } from 'react'; // Permite acceder al contexto real
import { StateContextType, StateContext } from './state';

export const useStateValue = (): StateContextType => { // Exporta la función useStateValue que es un hook personalizado
  const context = useContext(StateContext); // Utiliza useContext para obtener el valor actual del contexto StateContext. Este es el estado global de la aplicación se ha definido en el archivo state.ts.
  if (context === undefined) { // Verifica si el contexto está definido. Si no lo está, significa que useStateValue se está utilizando fuera del StateProvider, y lanza un error indicando que debería usarse dentro de un StateProvider.
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context; // Devuelve el valor del contexto, que es el estado global de la aplicación. Esto permite acceder a las propiedades como selectedMovie, setSelectedMovie, genres, y setGenres en cualquier componente donde utilices este hook
};