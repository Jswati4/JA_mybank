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

## 🐳 Conteneurs Docker et Déploiement

Pour faciliter le déploiement et la gestion de l’application et de sa base de données, nous utilisons Docker et Docker Compose. Cela permet d’isoler l’environnement d’exécution dans des conteneurs légers et reproductibles.

### Conteneurs utilisés

- App (backend) : Conteneur Node.js qui lance le serveur avec `npm start`.  
- DataBase (PostgreSQL) : Conteneur PostgreSQL qui héberge la base de données relationnelle.

### Fichiers importants

- `Dockerfile` : Définit l’image Docker du backend, en installant les dépendances et en exposant le port 3000.  
- `docker-compose.yml` : Orchestration des conteneurs backend et base de données, configuration des volumes et réseaux.

### Commandes principales

- Pour construire et lancer les conteneurs (build + up) :docker compose up --build
* Pour arrêter et supprimer les conteneurs : docker compose down
* Pour voir les logs des conteneurs : docker compose logs -f
 

# Déploiement avec Docker
L’application MyBank est déployée dans un environnement conteneurisé grâce à Docker et Docker Compose.
Cela permet d’avoir une configuration reproductible, facile à lancer sur n’importe quelle machine, et incluant tous les services nécessaires (application + base de données).

# Structure des conteneurs
app : Conteneur qui exécute l’application Node.js (backend et serveur HTTP).
db : Conteneur PostgreSQL qui stocke les données de l’application.


# Fichiers utilisés
Dockerfile : Définit comment construire l’image de l’application Node.js.
docker-compose.yml : Orchestration des services (app + db).
.dockerignore : Fichiers à exclure du build (comme node_modules).

# Étapes du déploiement
Vérifier que Docker et Docker Compose sont installés

docker --version
docker compose version
Construire et démarrer les conteneurs
Depuis le dossier racine du projet : docker compose up --build
--build : Force la reconstruction de l’image à partir du Dockerfile.

Cette commande :
- Télécharge l’image de base Node.js.
- Copie le code source dans l’image.
- Installe les dépendances (npm install).
- Lance l’application et PostgreSQL.
- Accéder à l’application


### Notes

* La base de données est initialisée automatiquement lors du premier lancement grâce aux scripts dans le conteneur PostgreSQL.
* L’application backend écoute sur le port 3000, que tu peux ouvrir dans ton navigateur via [http://localhost:3000](http://localhost:3000). PostgreSQL est accessible sur le port 5432.


Oui, tu peux tout à fait écrire ça dans ton README, mais il faut le **réadapter** pour qu’il soit plus concis et directement lié à ton projet, surtout si tu veux éviter que ça fasse “copié-collé de tutoriel”.

Voici une version **claire et prête à mettre** :

---

# 🔄 CI/CD (Intégration et Déploiement Continus)

Un pipeline CI/CD permet d’automatiser :
- La vérification du code à chaque *push* ou *pull request*.
- Les tests pour éviter les régressions.
- La construction et le déploiement de l’application via Docker.

### Exemple avec GitHub Actions

Dans ce projet, un workflow GitHub Actions pourrait être utilisé pour installer les dépendances, exécuter les tests et builder l’image Docker avant un déploiement automatisé.

Les avantages sont les suivants : chaque modification est testée avant d’être intégrée, le déploiement est reproductible et le risque d’erreurs humaines est réduit.

### Prérequis

* Node.js 18+
* npm ou yarn

### Étapes d'installation

git clone https://github.com/Jswati4/JA_mybank.git
cd JA_mybank
npm install
npm run dev

# Tests

L’application utilise Vitest et Testing Library pour garantir la qualité du code.
Les tests couvrent les composants React et certaines fonctionnalités clés (affichage, interactions, état).

# Lancer les tests

npm run test           # Lance tous les tests en mode console
npm run test:ui        # Lance les tests avec interface graphique
npm run test:coverage  # Génère un rapport de couverture

# Ce qui est testé

Rendu correct des composants React.
Réaction aux interactions utilisateur (clics, saisies).
Vérification de la présence d’éléments importants dans l’UI.
Validation des données affichées.

L'avantage est les tests s’exécutent rapidement, sans serveur, grâce à un environnement simulé via jsdom.
