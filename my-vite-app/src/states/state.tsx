// El contexto global y el proveedor ya están definidos en ese archivo.
import React, { createContext, Dispatch, SetStateAction, useState, ReactNode } from 'react';
import { Movie, Genre } from '../services/types';

export type StateContextType = { // // Definiendo un tipo para el contexto que especifica las propiedades del estado global.
  selectedMovie: Movie | null;
  setSelectedMovie: Dispatch<SetStateAction<Movie | null>>;
  genres: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[]>>;
};

// Define un tipo para las propiedades del proveedor, que incluye el contenido que puede ser de tipo ReactNode.
type ProviderProps = {
  children: ReactNode;
};
// Creando un contexto con un valor inicial indefinido utilizando createContext.
export const StateContext = createContext<StateContextType | undefined>(undefined);
// Define un componente de proveedor (StateProvider) que utiliza el contexto creado anteriormente.
export const StateProvider: React.FC<ProviderProps> = ({ children }) => {
  // Utilizamos el hook useState para crear dos estados locales: selectedMovie y genres.
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
// Creamos un objeto contextValue que contiene las propiedades del estado global.
  const contextValue: StateContextType = {
    selectedMovie,
    setSelectedMovie,
    genres,
    setGenres,
  };
// Utilizamos el componente <StateContext.Provider> para envolver el contenido de la aplicación con el contexto.
  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};