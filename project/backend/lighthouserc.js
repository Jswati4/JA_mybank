module.exports = {
  ci: {
    collect: {
      // Commande pour démarrer le serveur local avant de lancer les tests de performance
      startServerCommand: 'npm run preview',
      // URL(s) à tester pendant la collecte des données
      url: ['http://localhost:4173'],
      // Nombre de fois où chaque test doit être répété pour fiabiliser les résultats
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Seuil d'alerte pour la catégorie "performance" : warning si < 0.9
        'categories:performance': ['warn', { minScore: 0.9 }],
        // Seuil critique pour l'accessibilité : erreur si < 0.95
        'categories:accessibility': ['error', { minScore: 0.95 }],
        // Seuil d'alerte pour les meilleures pratiques : warning si < 0.9
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        // Seuil d'alerte pour le SEO : warning si < 0.9
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      // Indique que les rapports doivent être envoyés vers un stockage public temporaire
      target: 'temporary-public-storage',
    },
  },
};
