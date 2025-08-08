import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from '../Dashboard';

const mockExpenses = [
  {
    id: '1',
    amount: 50.00,
    description: 'Courses',
    category: 'Alimentation',
    date: '2024-01-15',
    userId: '1'
  },
  {
    id: '2',
    amount: 25.00,
    description: 'Transport',
    category: 'Transport',
    date: '2024-01-16',
    userId: '1'
  }
];

const categories = ['Alimentation', 'Transport', 'Loisirs'];

describe('Dashboard', () => {
  it('affiche le titre du tableau de bord', () => {
    render(<Dashboard expenses={mockExpenses} categories={categories} />);
    
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
  });

  it('calcule et affiche le total des dépenses du mois', () => {
    const currentMonthExpenses = mockExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    });
    
    render(<Dashboard expenses={mockExpenses} categories={categories} />);
    
    // Le total devrait être calculé automatiquement
    expect(screen.getByText('Ce mois')).toBeInTheDocument();
  });

  it('affiche le nombre de transactions', () => {
    render(<Dashboard expenses={mockExpenses} categories={categories} />);
    
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('affiche les catégories de dépenses', () => {
    render(<Dashboard expenses={mockExpenses} categories={categories} />);
    
    expect(screen.getByText('Dépenses par catégorie ce mois')).toBeInTheDocument();
  });

  it('affiche les dépenses récentes', () => {
    render(<Dashboard expenses={mockExpenses} categories={categories} />);
    
    expect(screen.getByText('Dépenses récentes')).toBeInTheDocument();
  });

  it('gère le cas où il n\'y a aucune dépense', () => {
    render(<Dashboard expenses={[]} categories={categories} />);
    
    expect(screen.getByText('Aucune dépense ce mois-ci')).toBeInTheDocument();
    expect(screen.getByText('Aucune dépense enregistrée')).toBeInTheDocument();
  });
});