import React from 'react';
import { BarChart3, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { Expense } from '../App';

// Définition des props attendues pour le composant Statistics
interface StatisticsProps {
  expenses: Expense[];
  categories: string[];
}

// Composant principal des statistiques
export function Statistics({ expenses, categories }: StatisticsProps) {
  const now = new Date();

  // Nombre de jours dans le mois courant pour calculer la moyenne par jour
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  // Calcul des statistiques mensuelles sur les 6 derniers mois
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    // Filtrer les dépenses du mois courant de la boucle
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === date.getMonth() && 
             expenseDate.getFullYear() === date.getFullYear();
    });

    // Ajouter les statistiques du mois à la liste
    monthlyStats.push({
      month: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
      total: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      count: monthExpenses.length,
    });
  }

  // Calcul du total des dépenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Calcul des statistiques par catégorie
  const categoryStats = categories
    .map(category => {
      // Filtrer les dépenses de la catégorie
      const categoryExpenses = expenses.filter(exp => exp.category === category);
      const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        category,
        total,
        count: categoryExpenses.length,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
      };
    })
    // Garder uniquement les catégories avec des dépenses
    .filter(stat => stat.total > 0)
    // Trier par montant décroissant
    .sort((a, b) => b.total - a.total);

  // Trouver le montant mensuel maximum pour l'affichage graphique
  const maxMonthlyAmount = Math.max(...monthlyStats.map(stat => stat.total));
  // Calcul de la dépense moyenne par dépense
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  // Calcul de la dépense moyenne par jour du mois courant
  const averagePerDay = totalExpenses / daysInMonth;

  // Palette de couleurs pour les graphiques/catégories
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-yellow-500',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistiques</h2>
      </div>

      {/* Cartes Résumé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte : Total des dépenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total des dépenses</p>
              <p className="text-2xl font-bold text-gray-900">{totalExpenses.toFixed(2)} €</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Carte : Dépense moyenne */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dépense moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{averageExpense.toFixed(2)} €</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Carte supplémentaire à compléter */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">

