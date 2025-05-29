
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Recycle, Truck, Shield, Users } from 'lucide-react';

interface AuthenticationPageProps {
  onLogin: (email: string, password: string, role: 'usager' | 'agent' | 'admin') => void;
}

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'usager' | 'agent' | 'admin'>('usager');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'usager': return <Users className="h-5 w-5" />;
      case 'agent': return <Truck className="h-5 w-5" />;
      case 'admin': return <Shield className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Recycle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Trash Planner</h1>
          <p className="text-gray-600">Gestion intelligente des déchets</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{isLogin ? 'Connexion' : 'Inscription'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Type de compte</Label>
                <Select value={role} onValueChange={(value: 'usager' | 'agent' | 'admin') => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usager">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Usager (Ménage/Entreprise)
                      </div>
                    </SelectItem>
                    <SelectItem value="agent">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Agent de collecte
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Administration
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <div className="flex items-center gap-2">
                  {getRoleIcon(role)}
                  {isLogin ? 'Se connecter' : "S'inscrire"}
                </div>
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700"
              >
                {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Button variant="link" className="text-sm text-gray-500">
                Mot de passe oublié ?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationPage;
