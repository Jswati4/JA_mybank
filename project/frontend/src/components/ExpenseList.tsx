import React, { useState } from 'react';
import { Search, Filter, Edit3, Trash2, Calendar } from 'lucide-react';
import { Expense } from '../App';

// Définition des propriétés attendues pour le composant ExpenseList
interface ExpenseListProps {
  expenses: Expense[]; // Liste des dépenses
  categories: string[]; // Liste des catégories disponibles
  onEdit: (expense: Expense) => void; // Fonction appelée lors de la modification d'une dépense
  onDelete: (id: string) => void; // Fonction appelée lors de la suppression d'une dépense
}

// Composant principal pour afficher la liste des dépenses
export function ExpenseList({ expenses, categories, onEdit, onDelete }: ExpenseListProps) {
  // États locaux pour la recherche, la catégorie sélectionnée, le tri et l'ordre de tri
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtrage et tri des dépenses selon les critères sélectionnés
  const filteredExpenses = expenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || expense.category === selectedCategory)
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        default: // date
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calcul du montant total des dépenses filtrées
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Gestion de la suppression avec confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes dépenses</h2>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Champ de recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une dépense..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Sélection de la catégorie et du tri */}
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">Plus récent</option>
              <option value="date-asc">Plus ancien</option>
              <option value="amount-desc">Montant décroissant</option>
              <option value="amount-asc">Montant croissant</option>
              <option value="description-asc">Description A-Z</option>
              <option value="category-asc">Catégorie A-Z</option>
            </select>
          </div>
        </div>

        {/* Résumé du nombre de dépenses et du total */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {filteredExpenses.length} dépense(s) • Total : {totalAmount.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      {/* Liste des dépenses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredExpenses.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      {/* Description de la dépense */}
                      <h3 className="text-lg font-medium text-gray-900">
                        {expense.description}
                      </h3>
                      {/* Montant de la dépense */}
                      <span className="text-lg font-semibold text-gray-900">
                        -{expense.amount.toFixed(2)} €
                      </span>
                    </div>
                    
                    {/* Catégorie et date de la dépense */}
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-1" />
                        {expense.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(expense.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  {/* Boutons d'édition et de suppression */}
                  <div className="ml-6 flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Message affiché si aucune dépense n'est trouvée
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune dépense trouvée
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par ajouter votre première dépense'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}