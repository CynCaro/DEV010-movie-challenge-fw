import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StateProvider } from './states/state'; // Asegúrate de importar el StateProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider> {/* Envuelve tu aplicación con StateProvider */}
      <App />
    </StateProvider>
  </React.StrictMode>,
);