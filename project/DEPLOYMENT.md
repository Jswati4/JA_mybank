# MyBank - Documentation de Déploiement

**MyBank** est une application web de gestion des dépenses personnelles développée avec React, TypeScript et Tailwind CSS. L'application permet aux utilisateurs de suivre, catégoriser et analyser leurs dépenses de manière intuitive.

## Comment déployer l’application MyBank
Pour mettre en ligne l’application MyBank, on suit ces étapes simples :

Préparer la version finale
On construit le projet avec la commande :

bash
Copier
Modifier
npm run build
Cela crée un dossier dist/ avec les fichiers prêts à être publiés.

Se connecter au service de déploiement
Ici, on utilise Netlify pour héberger l’application. Il faut avoir un compte et les accès (token et site ID).

Déployer la version finale
Avec la commande Netlify, on envoie les fichiers dist/ sur le serveur :

bash
Copier
Modifier
netlify deploy --prod --dir=dist
Cette commande publie l’application en production.

Automatisation avec GitHub Actions
Quand on pousse du code sur la branche principale (main), le pipeline CI/CD lance automatiquement toutes les vérifications, la construction et le déploiement sur Netlify