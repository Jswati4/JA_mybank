import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  CreditCard,
  PieChart,
  DollarSign
} from 'lucide-react';
import { Expense } from '../App';

interface DashboardProps {
  expenses: Expense[];
  categories: string[];
}

export function Dashboard({ expenses, categories }: DashboardProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });

  const lastMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return expenseDate.getMonth() === lastMonth && 
           expenseDate.getFullYear() === lastMonthYear;
  });

  const totalThisMonth = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalLastMonth = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyChange = totalLastMonth > 0 ? 
    ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100 : 0;

  const categoryTotals = categories.map(category => ({
    category,
    total: thisMonthExpenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0)
  })).filter(item => item.total > 0);

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ce mois</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalThisMonth.toFixed(2)} €
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {monthlyChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              monthlyChange >= 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {Math.abs(monthlyChange).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-600 ml-1">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{thisMonthExpenses.length}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Moyenne/jour</p>
              <p className="text-2xl font-bold text-gray-900">
                {(totalThisMonth / new Date().getDate()).toFixed(2)} €
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Catégories</p>
              <p className="text-2xl font-bold text-gray-900">{categoryTotals.length}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <PieChart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dépenses par catégorie ce mois
          </h3>
          <div className="space-y-4">
            {categoryTotals.length > 0 ? (
              categoryTotals.map((item, index) => {
                const percentage = (item.total / totalThisMonth) * 100;
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
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`} />
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{item.total.toFixed(2)} €</div>
                      <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune dépense ce mois-ci</p>
            )}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dépenses récentes</h3>
          <div className="space-y-4">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                    <div className="text-xs text-gray-500">
                      {expense.category} • {new Date(expense.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    -{expense.amount.toFixed(2)} €
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune dépense enregistrée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}