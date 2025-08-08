import React, { useState } from 'react';
import { CreditCard, Mail, Lock } from 'lucide-react';

// Interface des propriétés attendues par le composant LoginForm
interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

// Composant principal du formulaire de connexion
export function LoginForm({ onLogin }: LoginFormProps) {
  // États pour stocker l'email, le mot de passe et le mode (connexion/inscription)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password); // Appel de la fonction de connexion passée en props
  };

  return (
    // Conteneur principal centré avec un fond en dégradé
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* En-tête avec logo et titre */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MyBank</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos dépenses personnelles en toute simplicité
          </p>
        </div>

        {/* Formulaire de connexion/inscription */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="votre.email@exemple.com"
                required
              />
            </div>
          </div>

          {/* Champ mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Bouton de soumission (connexion ou création de compte) */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>

        {/* Lien pour basculer entre connexion et inscription */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {isLogin ? 'Créer un nouveau compte' : 'Déjà un compte ? Se connecter'}
          </button>
        </div>

        {/* Message d'information en bas du formulaire */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Demo - Utilisez n'importe quelle adresse email valide
          </p>
        </div>
      </div>
    </div>
  );
}