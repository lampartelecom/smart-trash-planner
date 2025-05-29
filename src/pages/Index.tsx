
import React, { useState } from 'react';
import AuthenticationPage from '../components/AuthenticationPage';
import UserDashboard from '../components/UserDashboard';
import AgentDashboard from '../components/AgentDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{
    role: 'usager' | 'agent' | 'admin' | null;
    name: string;
    email: string;
  } | null>(null);

  const handleLogin = (email: string, password: string, role: 'usager' | 'agent' | 'admin') => {
    // Simulation de connexion
    setCurrentUser({
      role,
      name: email.split('@')[0],
      email
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthenticationPage onLogin={handleLogin} />;
  }

  switch (currentUser.role) {
    case 'usager':
      return <UserDashboard user={currentUser} onLogout={handleLogout} />;
    case 'agent':
      return <AgentDashboard user={currentUser} onLogout={handleLogout} />;
    case 'admin':
      return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return <AuthenticationPage onLogin={handleLogin} />;
  }
};

export default Index;
