## Déploiement de l’application MyBank
MyBank est une application web de gestion des dépenses personnelles développée avec React, TypeScript et Tailwind CSS. Voici comment déployer facilement l’application.

# Préparer la version finale
Construire le projet avec la commande :
'npm run build'
Cette commande génère un dossier dist/ contenant les fichiers prêts à être publiés.

# Se connecter au service de déploiement
Nous utilisons Netlify pour héberger l’application. Assurez-vous d’avoir un compte Netlify avec un token d’accès et l’ID du site configurés.

# Déployer la version finale
Déployer les fichiers du dossier dist/ sur Netlify avec la commande :
netlify deploy --prod --dir=dist
Cette commande publie votre application en production.

# Automatisation via GitHub Actions
```markdown
Le déploiement est automatisé grâce à un pipeline CI/CD configuré dans GitHub Actions.  
À chaque push sur la branche principale (`main`), ce pipeline :
- Exécute les vérifications de qualité du code (lint, tests, build)
- Déploie automatiquement la nouvelle version sur Netlify si toutes les vérifications passent

<!--
Explications :
- Cette section décrit le fonctionnement de l’automatisation du déploiement via GitHub Actions.
- Elle précise que le pipeline s’exécute à chaque push sur la branche principale.
- Les étapes du pipeline sont listées pour plus de clarté.
-->
```
Déploie automatiquement la nouvelle version sur Netlify :
https://app.netlify.com/teams/jswati4/projects

