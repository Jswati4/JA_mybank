import { test, expect } from '@playwright/test';

test.describe('Gestion des dépenses MyBank', () => {
  test('connexion utilisateur et navigation', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier la page de connexion
    await expect(page.locator('text=MyBank')).toBeVisible();
    await expect(page.locator('text=Gérez vos dépenses personnelles')).toBeVisible();
    
    // Se connecter
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Vérifier l'accès au tableau de bord
    await expect(page.locator('text=Tableau de bord')).toBeVisible();
    await expect(page.locator('text=Bonjour, test')).toBeVisible();
  });

  test('ajout d\'une nouvelle dépense', async ({ page }) => {
    // Connexion préalable
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Ouvrir le formulaire d'ajout de dépense
    await page.click('text=Ajouter une dépense');
    
    // Remplir le formulaire
    await page.fill('input[type="number"]', '25.50');
    await page.fill('input[placeholder*="Courses"]', 'Supermarché Carrefour');
    await page.selectOption('select', 'Alimentation');
    await page.fill('input[type="date"]', '2024-01-15');
    
    // Soumettre le formulaire
    await page.click('text=Ajouter');
    
    // Vérifier l'ajout dans la liste
    await page.click('text=Dépenses');
    await expect(page.locator('text=25.50 €')).toBeVisible();
    await expect(page.locator('text=Supermarché Carrefour')).toBeVisible();
  });

  test('navigation entre les onglets', async ({ page }) => {
    // Connexion préalable
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Tester la navigation
    await page.click('text=Dépenses');
    await expect(page.locator('text=Mes dépenses')).toBeVisible();
    
    await page.click('text=Statistiques');
    await expect(page.locator('text=Total des dépenses')).toBeVisible();
    
    await page.click('text=Profil');
    await expect(page.locator('text=Mon profil')).toBeVisible();
    
    await page.click('text=Tableau de bord');
    await expect(page.locator('text=Ce mois')).toBeVisible();
  });

  test('recherche et filtrage des dépenses', async ({ page }) => {
    // Connexion et ajout d'une dépense pour le test
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Ajouter une dépense test
    await page.click('text=Ajouter une dépense');
    await page.fill('input[type="number"]', '15.00');
    await page.fill('input[placeholder*="Courses"]', 'Restaurant McDonald');
    await page.selectOption('select', 'Loisirs');
    await page.click('text=Ajouter');
    
    // Aller à la liste des dépenses
    await page.click('text=Dépenses');
    
    // Tester la recherche
    await page.fill('input[placeholder*="Rechercher"]', 'McDonald');
    await expect(page.locator('text=Restaurant McDonald')).toBeVisible();
    
    // Tester le filtre par catégorie
    await page.selectOption('select:has-text("Toutes les catégories")', 'Loisirs');
    await expect(page.locator('text=Restaurant McDonald')).toBeVisible();
  });

  test('déconnexion utilisateur', async ({ page }) => {
    // Connexion
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Déconnexion
    await page.click('text=Déconnexion');
    
    // Vérifier le retour à la page de connexion
    await expect(page.locator('text=Se connecter')).toBeVisible();
    await expect(page.locator('text=Gérez vos dépenses personnelles')).toBeVisible();
  });

  test('responsive design sur mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Vérifier que l'interface mobile fonctionne
    await expect(page.locator('text=MyBank')).toBeVisible();
    
    // Connexion sur mobile
    await page.fill('input[type="email"]', 'mobile@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Vérifier l'adaptation mobile du tableau de bord
    await expect(page.locator('text=Tableau de bord')).toBeVisible();
    await expect(page.locator('text=Ce mois')).toBeVisible();
  });
});