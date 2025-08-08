// Importe StrictMode depuis React pour activer des vérifications supplémentaires en développement
import { StrictMode } from 'react';
// Importe createRoot depuis react-dom/client pour créer la racine de l'application React
import { createRoot } from 'react-dom/client';
// Importe le composant principal App
import App from './App.tsx';
// Importe le fichier de styles CSS global
import './index.css';

// Crée la racine React à partir de l'élément avec l'id 'root' et rend l'application
createRoot(document.getElementById('root')!).render(
  // Utilise StrictMode pour détecter les problèmes potentiels dans l'application
  <StrictMode>
    <App />
  </StrictMode>
);
