# MyBank - Application de Gestion des Dépenses

[![CI/CD Pipeline](https://github.com/username/mybank/workflows/MyBank%20CI/CD%20Pipeline/badge.svg)](https://github.com/username/mybank/actions)
[![codecov](https://codecov.io/gh/username/mybank/branch/main/graph/badge.svg)](https://codecov.io/gh/username/mybank)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mybank&metric=alert_status)](https://sonarcloud.io/dashboard?id=mybank)

## 📱 Description

MyBank est une application web moderne de gestion des dépenses personnelles développée avec React, TypeScript et Tailwind CSS. Elle permet aux utilisateurs de suivre, catégoriser et analyser leurs dépenses de manière intuitive et efficace.

## ✨ Fonctionnalités

- **Authentification utilisateur** - Système de connexion sécurisé
- **Gestion des dépenses** - Ajout, modification et suppression de dépenses
- **Catégorisation** - Classification automatique par catégories
- **Tableau de bord** - Vue d'ensemble avec statistiques en temps réel
- **Recherche et filtres** - Recherche avancée par date, montant et catégorie
- **Statistiques** - Graphiques et analyses des habitudes de dépenses
- **Export/Import** - Sauvegarde et restauration des données
- **Design responsive** - Interface adaptée mobile, tablette et desktop

## 🚀 Technologies utilisées

### Frontend
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes et cohérentes
- **Vite** - Bundler et serveur de développement rapide

### DevOps & Qualité
- **ESLint + Prettier** - Linting et formatage du code
- **Vitest** - Framework de tests unitaires
- **Playwright** - Tests end-to-end
- **GitHub Actions** - Intégration continue
- **Lighthouse CI** - Audit de performance automatisé

## 🏗️ Architecture

```
src/
├── components/          # Composants React réutilisables
│   ├── Dashboard.tsx   # Tableau de bord principal
│   ├── ExpenseForm.tsx # Formulaire de dépense
│   ├── ExpenseList.tsx # Liste des dépenses
│   ├── LoginForm.tsx   # Formulaire de connexion
│   ├── Profile.tsx     # Profil utilisateur
│   ├── Statistics.tsx  # Statistiques et graphiques
│   └── __tests__/      # Tests unitaires
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/username/mybank.git
cd mybank
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🧪 Tests

### Tests unitaires
```bash
npm run test           # Tests en mode watch
npm run test:run       # Tests en une fois
npm run test:coverage  # Tests avec couverture de code
```

### Tests end-to-end
```bash
npm run test:e2e       # Tests E2E
npm run test:e2e:ui    # Tests E2E avec interface
```

### Qualité du code
```bash
npm run lint           # Vérification ESLint
npm run type-check     # Vérification TypeScript
npm run format:check   # Vérification Prettier
npm run quality        # Toutes les vérifications
```

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Preview du build
```bash
npm run preview
```

### Déploiement automatique
Le déploiement se fait automatiquement via GitHub Actions sur chaque push sur la branche `main`.

## 📊 Pipeline CI/CD

Notre pipeline d'intégration continue comprend :

1. **Quality Checks** - ESLint, TypeScript, Prettier
2. **Tests** - Tests unitaires avec couverture, tests E2E
3. **Security** - Audit des dépendances, scan Snyk
4. **Build** - Build optimisé, audit Lighthouse
5. **Deploy** - Déploiement automatique sur Netlify

## 📈 Métriques de qualité

- **Code Coverage** : > 80%
- **Performance Lighthouse** : > 90
- **Accessibilité** : > 95
- **Best Practices** : > 90
- **SEO** : > 90

## 🔒 Sécurité

- Headers de sécurité configurés
- Audit automatique des vulnérabilités
- Scan de sécurité avec Snyk
- Validation et sanitisation des données

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de code
- Utiliser TypeScript pour tous les nouveaux fichiers
- Suivre les règles ESLint configurées
- Écrire des tests pour les nouvelles fonctionnalités
- Maintenir une couverture de code > 80%

## 📝 Documentation

- [Documentation de déploiement](./DEPLOYMENT.md)
- [Documentation DevOps](./DEVOPS.md)
- [Guide de contribution](./CONTRIBUTING.md)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Développeur Frontend** - React, TypeScript, Tailwind CSS
- **Développeur Backend** - API REST, Base de données
- **DevOps Engineer** - CI/CD, Déploiement, Monitoring

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une [issue](https://github.com/username/mybank/issues)
- Consulter la [documentation](./docs/)
- Contacter l'équipe de développement

---

**MyBank** - Gérez vos dépenses personnelles en toute simplicité 💰