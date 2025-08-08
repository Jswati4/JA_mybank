# MyBank - Documentation DevOps & Intégration Continue

## Vue d'ensemble DevOps

Bien sûr, je peux t’aider à simplifier ce texte technique en mots plus faciles, tout en gardant l’essentiel. Voici une version plus accessible de ta documentation DevOps & Intégration Continue pour MyBank :

# MyBank - Documentation DevOps & Intégration Continue (version simple)

## Vue d’ensemble DevOps

Cette documentation explique comment on organise le travail pour que le code soit toujours bon, testé et automatiquement mis en ligne. Ça s’appelle DevOps.

## Outils pour garder un code propre

### 1. ESLint - Vérifie le code pour éviter les erreurs

* On utilise ESLint avec des règles pour que le code respecte des bonnes pratiques.
* Il vérifie les fichiers `.ts` et `.tsx` (TypeScript et React).

### 2. Prettier - Met le code en forme automatiquement

* On formate le code pour qu’il soit toujours lisible (espaces, points-virgules, guillemets…).

### 3. TypeScript - Vérifie que les types sont bons

* On force des règles strictes pour éviter des erreurs dans les types.

### 4. Husky - Lance des vérifications avant chaque envoi de code (commit)

* Avant d’envoyer du code, on lance ESLint et Prettier automatiquement pour corriger ou bloquer les erreurs.

## Outils pour automatiser les tests

### 1. Vitest - Pour tester les petites parties du code (tests unitaires)

* Il vérifie que chaque fonction ou composant marche bien.

### 2. Testing Library - Pour tester que l’interface marche bien (tests d’intégration)

* Ça vérifie que les composants React fonctionnent ensemble.

### 3. Playwright - Pour tester toute l’application comme un utilisateur (tests end-to-end)

* On simule un vrai utilisateur qui clique, écrit, et vérifie que tout marche.

## Pipeline d’intégration continue (GitHub Actions)

* À chaque modification du code, on lance :

  * Les vérifications de qualité (ESLint, TypeScript, Prettier)
  * Les tests (unitaires et end-to-end)
  * La construction (build) du projet
  * Un audit de performance (Lighthouse)
  * Et enfin le déploiement automatique sur Netlify si on est sur la branche principale (main).

## Scripts pratiques dans le projet

* `npm run build` → crée la version finale du site
* `npm run lint` → vérifie le code
* `npm run test:coverage` → lance les tests et génère un rapport
* `npm run test:e2e` → lance les tests comme un utilisateur
* `npm run format` → formate le code automatiquement

## Sécurité et conformité

* On vérifie que les dépendances (bibliothèques externes) ne contiennent pas de failles avec `npm audit` et Snyk.
* On met en place des règles de sécurité dans le serveur pour protéger l’application.


