import React from 'react';
import { BarChart3, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { Expense } from '../App';

interface StatisticsProps {
  expenses: Expense[];
  categories: string[];
}

export function Statistics({ expenses, categories }: StatisticsProps) {
  // Calculate monthly expenses for the last 6 months
  const monthlyStats = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === date.getMonth() && 
             expenseDate.getFullYear() === date.getFullYear();
    });
    
    monthlyStats.push({
      month: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
      total: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      count: monthExpenses.length
    });
  }

  // Calculate category statistics
  const categoryStats = categories.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category);
    const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      category,
      total,
      count: categoryExpenses.length,
      percentage: total > 0 ? (total / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100 : 0
    };
  }).filter(stat => stat.total > 0).sort((a, b) => b.total - a.total);

  const maxMonthlyAmount = Math.max(...monthlyStats.map(stat => stat.total));
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistiques</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nombre total</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Évolution mensuelle</h3>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-sm font-medium text-gray-700 w-16">{stat.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ 
                          width: maxMonthlyAmount > 0 ? `${(stat.total / maxMonthlyAmount) * 100}%` : '0%' 
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    {stat.total.toFixed(0)} €
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition par catégorie</h3>
          <div className="space-y-4">
            {categoryStats.length > 0 ? (
              categoryStats.map((stat, index) => {
                const colors = [
                  'bg-blue-500',
                  'bg-green-500',
                  'bg-purple-500',
                  'bg-orange-500',
                  'bg-red-500',
                  'bg-indigo-500',
                  'bg-pink-500',
                  'bg-yellow-500'
                ];
                return (
                  <div key={stat.category} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]} mr-3`} />
                      <span className="text-sm font-medium text-gray-700 flex-1">{stat.category}</span>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-gray-900">{stat.total.toFixed(2)} €</div>
                        <div className="text-xs text-gray-500">
                          {stat.count} dépense{stat.count > 1 ? 's' : ''} • {stat.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Analyse détaillée</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)).toFixed(2) : '0.00'} €
            </div>
            <div className="text-sm text-gray-600">Plus grosse dépense</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {expenses.length > 0 ? Math.min(...expenses.map(e => e.amount)).toFixed(2) : '0.00'} €
            </div>
            <div className="text-sm text-gray-600">Plus petite dépense</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {categoryStats.length > 0 ? categoryStats[0].category : '-'}
            </div>
            <div className="text-sm text-gray-600">Catégorie dominante</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {(totalExpenses / 30).toFixed(2)} €
            </div>
            <div className="text-sm text-gray-600">Moyenne par jour</div>
          </div>
        </div>
      </div>
    </div>
  );
}