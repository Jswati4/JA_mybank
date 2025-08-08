import js from '@eslint/js';                      // Import du config ESLint de base pour JS
import globals from 'globals';                    // Import des définitions globales (navigateur, node, etc.)
import reactHooks from 'eslint-plugin-react-hooks';  // Plugin ESLint pour vérifier les Hooks React
import reactRefresh from 'eslint-plugin-react-refresh'; // Plugin ESLint pour React Refresh (Hot Reload)
import tseslint from 'typescript-eslint';        // Plugin ESLint pour TypeScript

// Export de la configuration ESLint spécifique pour TypeScript + React
export default tseslint.config(
  { ignores: ['dist'] },  // On ignore le dossier 'dist' (fichiers compilés)
  {
    // Extension des règles recommandées de ESLint JS et TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // Cette config s'applique uniquement aux fichiers .ts et .tsx
    files: ['**/*.{ts,tsx}'],

    // Options de langage ECMAScript et définition des variables globales (ici, globals du navigateur)
    languageOptions: {
      ecmaVersion: 2020,         // Supporte les fonctionnalités JS jusqu'à ES2020
      globals: globals.browser,  // Variables globales disponibles dans un navigateur
    },

    // Plugins supplémentaires utilisés dans la configuration
    plugins: {
      'react-hooks': reactHooks,          // Vérification des règles des Hooks React
      'react-refresh': reactRefresh,      // Gestion du hot reload React
    },

    // Règles spécifiques à appliquer, en étendant celles des plugins
    rules: {
      ...reactHooks.configs.recommended.rules,  // Intègre les règles recommandées pour React Hooks
      'react-refresh/only-export-components': [ // Règle de React Refresh
        'warn',                                // Niveau d'alerte : warning
        { allowConstantExport: true },        // Permet l'export de constantes même si ce ne sont pas des composants React
      ],
    },
  }
);
