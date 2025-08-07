# MyBank - Documentation de Déploiement

## Vue d'ensemble du projet

**MyBank** est une application web de gestion des dépenses personnelles développée avec React, TypeScript et Tailwind CSS. L'application permet aux utilisateurs de suivre, catégoriser et analyser leurs dépenses de manière intuitive.

## Architecture de l'application

### Stack technique
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Local Storage (simulation base de données)
- **Build**: Vite
- **Linting**: ESLint + TypeScript ESLint

### Structure du projet
```
mybank/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Tableau de bord principal
│   │   ├── ExpenseForm.tsx        # Formulaire d'ajout/modification
│   │   ├── ExpenseList.tsx        # Liste des dépenses
│   │   ├── LoginForm.tsx          # Authentification utilisateur
│   │   ├── Profile.tsx            # Profil utilisateur
│   │   └── Statistics.tsx         # Statistiques et analyses
│   ├── App.tsx                    # Composant principal
│   ├── main.tsx                   # Point d'entrée
│   └── index.css                  # Styles globaux
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Procédures de déploiement

### 1. Prérequis

- Node.js (version 18+ recommandée)
- npm ou yarn
- Git
- Serveur web (Nginx, Apache) ou plateforme cloud (Netlify, Vercel)

### 2. Installation des dépendances

```bash
# Cloner le repository
git clone <repository-url>
cd mybank

# Installation des dépendances
npm install

# Vérification de l'installation
npm run lint
```

### 3. Configuration des environnements

#### Environnement de développement
```bash
# Lancement du serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

#### Environnement de test
```bash
# Build de test
npm run build

# Preview du build
npm run preview

# Tests (à implémenter)
npm run test
```

#### Environnement de production
```bash
# Build optimisé pour la production
npm run build

# Les fichiers sont générés dans le dossier dist/
```

### 4. Scripts de déploiement

#### Script de déploiement automatisé (deploy.sh)
```bash
#!/bin/bash
set -e

echo "🚀 Démarrage du déploiement MyBank"

# Vérification des prérequis
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci

# Linting du code
echo "🔍 Vérification du code..."
npm run lint

# Build de production
echo "🏗️ Build de l'application..."
npm run build

# Tests de base
echo "✅ Tests de base..."
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist n'a pas été créé"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Le fichier index.html n'existe pas"
    exit 1
fi

echo "🎉 Déploiement réussi !"
echo "📁 Fichiers de production disponibles dans ./dist/"
```

#### Configuration Docker (Dockerfile)
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Configuration Nginx (nginx.conf)
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        
        root /usr/share/nginx/html;
        index index.html;

        # Support pour les routes SPA
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache pour les assets statiques
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Headers de sécurité
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

### 5. Déploiement cloud

#### Netlify
1. Connecter le repository GitHub à Netlify
2. Configuration build :
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Variables d'environnement (si nécessaires)
4. Déploiement automatique sur push

#### Vercel
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Environnements de test

### 1. Tests unitaires
```bash
# Installation des dépendances de test
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Configuration vitest (vite.config.ts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  }
})
```

### 2. Tests d'intégration
- Tests des flux utilisateur principaux
- Tests de navigation entre composants
- Tests de persistance des données

### 3. Tests système
- Tests de performance (Lighthouse)
- Tests de compatibilité navigateur
- Tests de responsive design
- Tests d'accessibilité (a11y)

### 4. Tests d'acceptation client
- Tests des User Stories
- Tests de validation des exigences fonctionnelles
- Tests d'ergonomie et UX

## Procédures d'exécution des tests

### 1. Tests automatisés
```bash
# Tests unitaires
npm run test

# Tests avec coverage
npm run test:coverage

# Tests end-to-end (avec Playwright)
npm run test:e2e
```

### 2. Tests manuels
1. **Test de connexion**
   - Saisir une adresse email valide
   - Vérifier l'accès au tableau de bord

2. **Test d'ajout de dépense**
   - Cliquer sur "Ajouter une dépense"
   - Remplir tous les champs requis
   - Vérifier l'enregistrement

3. **Test de navigation**
   - Naviguer entre tous les onglets
   - Vérifier l'affichage correct des données

4. **Test de responsive**
   - Tester sur mobile, tablette, desktop
   - Vérifier l'adaptation des composants

### 3. Tests de performance
```bash
# Audit Lighthouse automatisé
npm install -g @lhci/cli
lhci autorun

# Métriques à surveiller :
# - Performance Score > 90
# - Accessibility Score > 95
# - Best Practices Score > 90
# - SEO Score > 90
```

## Monitoring et maintenance

### 1. Logs d'application
- Utilisation de console.error pour les erreurs
- Tracking des erreurs JavaScript
- Monitoring des performances client

### 2. Métriques importantes
- Temps de chargement initial
- Taille du bundle
- Taux d'erreur
- Utilisation mémoire

### 3. Maintenance préventive
- Mise à jour des dépendances (mensuel)
- Vérification des failles de sécurité
- Optimisation des performances
- Sauvegarde des données utilisateur

## Rollback et récupération

### 1. Stratégie de rollback
- Versionning des releases
- Conservation des builds précédents
- Procédure de rollback rapide

### 2. Sauvegarde des données
- Export/Import des données utilisateur
- Stockage local avec possibilité d'export
- Procédure de récupération des données

## Documentation technique

### API Documentation
- Structure des données (Expense, User)
- Interfaces TypeScript
- Composants et leurs props

### Guide de contribution
- Standards de code
- Processus de review
- Guidelines de commit

Cette documentation couvre tous les aspects du déploiement et de la maintenance de l'application MyBank, répondant aux exigences des compétences 3.10 et 3.11.