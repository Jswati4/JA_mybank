## Présentation
MyBank est une application web moderne conçue pour gérer facilement vos dépenses personnelles. Développée avec React, TypeScript et Tailwind CSS, elle offre une expérience utilisateur fluide pour suivre, catégoriser et analyser vos finances.

## ✨ Fonctionnalités principales
Connexion utilisateur simple et sécurisée.
Ajout, modification et suppression des dépenses.
Catégories personnalisables pour mieux organiser.
Tableau de bord avec statistiques en temps réel.
Recherche et filtres avancés par date, montant et catégorie.
Graphiques pour analyser les habitudes de dépense.
Export et import faciles des données.
Interface responsive pour tous les écrans (mobile, tablette, desktop).

## 🚀 Technologies utilisées
Le frontend est construit avec React 18, TypeScript, Tailwind CSS, Lucide React pour les icônes, et Vite comme bundler rapide.

Le backend est prévu avec Node.js, Express.js, MongoDB et JWT pour l’authentification, ou Firebase en alternative serverless. Pour l’instant, les données sont stockées en local via localStorage.

La qualité du code est assurée par ESLint, Prettier, Vitest (tests unitaires), Playwright (tests end-to-end), GitHub Actions (CI) et Lighthouse CI (audit performance).

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

Le dossier src/ contient les composants React réutilisables (Dashboard, ExpenseForm, ExpenseList, etc.) ainsi que leurs tests.
App.tsx est le composant principal, main.tsx le point d’entrée, et index.css les styles globaux


## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/Jswati4/JA_mybank.git
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

```

## Qualité du code
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

- [Documentation de déploiement](./DEPLOYMENT.md) : 'https://app.netlify.com/teams/jswati4/projects'
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