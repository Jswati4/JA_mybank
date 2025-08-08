import React, { useState, useEffect } from 'react';
import { 
  Home, 
  PlusCircle, 
  CreditCard, 
  BarChart3, 
  Settings, 
  User,
  LogOut,
  Calendar,
  Search,
  Filter,
  Trash2,
  Edit3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Statistics } from './components/Statistics';
import { Profile } from './components/Profile';
import { LoginForm } from './components/LoginForm';

// Définition de l'interface pour une dépense
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: string;
}

// Définition de l'interface pour un utilisateur
export interface User {
  id: string;
  name: string;
  email: string;
}

// Liste des catégories de dépenses
const CATEGORIES = [
  'Alimentation',
  'Transport',
  'Loisirs',
  'Santé',
  'Shopping',
  'Logement',
  'Éducation',
  'Autre'
];

function App() {
  // État de l'utilisateur connecté
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Onglet actif dans la navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  // Liste des dépenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // Affichage du formulaire de dépense
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  // Dépense en cours d'édition
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Simulation de la connexion utilisateur
  const handleLogin = (email: string, password: string) => {
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email: email
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Chargement de l'utilisateur et des dépenses depuis le localStorage au montage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedExpenses = localStorage.getItem('expenses');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Sauvegarde des dépenses dans le localStorage à chaque modification
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('dashboard');
  };

  // Ajout d'une nouvelle dépense
  const addExpense = (expenseData: Omit<Expense, 'id' | 'userId'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      userId: currentUser?.id || '1'
    };
    setExpenses(prev => [...prev, newExpense]);
    setShowExpenseForm(false);
  };

  // Mise à jour d'une dépense existante
  const updateExpense = (expenseData: Omit<Expense, 'id' | 'userId'>) => {
    if (editingExpense) {
      setExpenses(prev => prev.map(exp => 
        exp.id === editingExpense.id 
          ? { ...exp, ...expenseData }
          : exp
      ));
      setEditingExpense(null);
    }
  };

  // Suppression d'une dépense
  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  // Démarrer l'édition d'une dépense
  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  // Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion
  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Filtrer les dépenses de l'utilisateur courant
  const userExpenses = expenses.filter(exp => exp.userId === currentUser.id);

  // Définition de la navigation latérale
  const navigation = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'expenses', label: 'Dépenses', icon: CreditCard },
    { id: 'statistics', label: 'Statistiques', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MyBank</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Bonjour, {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre latérale de navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Actions rapides */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Actions rapides</h3>
                <button
                  onClick={() => {
                    setEditingExpense(null);
                    setShowExpenseForm(true);
                  }}
                  className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="h-5 w-5 mr-3" />
                  Ajouter une dépense
                </button>
              </div>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <Dashboard expenses={userExpenses} categories={CATEGORIES} />
            )}
            
            {activeTab === 'expenses' && (
              <ExpenseList
                expenses={userExpenses}
                categories={CATEGORIES}
                onEdit={startEditing}
                onDelete={deleteExpense}
              />
            )}
            
            {activeTab === 'statistics' && (
              <Statistics expenses={userExpenses} categories={CATEGORIES} />
            )}
            
            {activeTab === 'profile' && (
              <Profile user={currentUser} />
            )}
          </div>
        </div>
      </div>

      {/* Modal du formulaire de dépense */}
      {showExpenseForm && (
        <ExpenseForm
          expense={editingExpense}
          categories={CATEGORIES}
          onSubmit={editingExpense ? updateExpense : addExpense}
          onCancel={() => {
            setShowExpenseForm(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
}

export default App;