# JA_mybank

## Présentation  
MyBank est une application web moderne conçue pour gérer facilement vos dépenses personnelles. Développée avec React, TypeScript et Tailwind CSS, elle offre une expérience utilisateur fluide pour suivre, catégoriser et analyser vos finances.

## ✨ Fonctionnalités principales  
- Connexion utilisateur simple et sécurisée.  
- Ajout, modification et suppression des dépenses.  
- Catégories personnalisables pour mieux organiser.  
- Tableau de bord avec statistiques en temps réel.  
- Recherche et filtres avancés par date, montant et catégorie.  
- Graphiques pour analyser les habitudes de dépense.  
- Export et import faciles des données.  
- Interface responsive pour tous les écrans (mobile, tablette, desktop).  


## 🚀 Technologies utilisées  
Le frontend est construit avec React 18, TypeScript, Tailwind CSS, Lucide React pour les icônes, et Vite comme bundler rapide.  
Le backend est prévu avec Node.js, Express.js, MongoDB et JWT pour l’authentification, ou Firebase en alternative serverless. Pour l’instant, les données sont stockées en local via localStorage.  

Qualité du code assurée par ESLint, Prettier, Vitest (tests unitaires), Playwright (tests end-to-end), GitHub Actions (CI) et Lighthouse CI (audit performance).


## 🏗️ Architecture  
Le dossier `src/` contient les composants React réutilisables (Dashboard, ExpenseForm, ExpenseList, etc.) ainsi que leurs tests.  
`App.tsx` est le composant principal, `main.tsx` le point d’entrée, et `index.css` les styles globaux.


### Prérequis  
- Node.js 18+  
- npm ou yarn  

### Étapes d'installation  
git clone https://github.com/Jswati4/JA_mybank.git
cd JA_mybank
npm install
npm run dev
Netlify CLI (optionnel, pour déployer localement) :'npm install -g netlify-cli'

## npm run lint           # Vérification ESLint
npm run type-check     # Vérification TypeScript
npm run format:check   # Vérification Prettier
npm run quality        # Toutes les vérifications combinées


### 🧪 Tests

Lancer les tests unitaires et d’intégration :
bash
Copier
Modifier
npm run test
Lancer les tests end-to-end (E2E) avec Playwright :

bash
Copier
Modifier
npm run test:e2e
Générer un rapport de couverture de tests :

bash
Copier
Modifier
npm run test:coverage
Que faire si un test échoue ?
Vérifie les logs pour comprendre l’erreur.

Corrige le code ou le test concerné.
Relance les tests jusqu’à validation complète.



