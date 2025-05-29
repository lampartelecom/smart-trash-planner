
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, Plus, Bell, User, History, LogOut } from 'lucide-react';
import CollectionRequestForm from './CollectionRequestForm';

interface UserDashboardProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const upcomingCollections = [
    {
      id: 1,
      type: 'Déchets ménagers',
      date: '2025-01-02',
      time: '08:00',
      status: 'confirmé',
      address: '123 Rue de la Paix'
    },
    {
      id: 2,
      type: 'Recyclables',
      date: '2025-01-05',
      time: '09:30',
      status: 'en_attente',
      address: '123 Rue de la Paix'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      message: 'Votre collecte de demain est confirmée',
      time: '2 heures',
      type: 'success'
    },
    {
      id: 2,
      message: 'Nouvelle collecte programmée pour le 5 janvier',
      time: '1 jour',
      type: 'info'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmé':
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case 'en_attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'collecté':
        return <Badge className="bg-blue-100 text-blue-800">Collecté</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (showRequestForm) {
    return (
      <CollectionRequestForm
        onSubmit={(data) => {
          console.log('Nouvelle demande:', data);
          setShowRequestForm(false);
        }}
        onCancel={() => setShowRequestForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Smart Trash Planner</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
                <Button onClick={onLogout} variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {[
            { key: 'home', label: 'Accueil', icon: Calendar },
            { key: 'requests', label: 'Demandes', icon: Plus },
            { key: 'history', label: 'Historique', icon: History },
            { key: 'profile', label: 'Profil', icon: User }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'ghost'}
              onClick={() => setActiveTab(key)}
              className="flex-1 gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actions rapides */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>Gérez vos collectes facilement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setShowRequestForm(true)}
                      className="h-24 bg-green-600 hover:bg-green-700"
                    >
                      <div className="text-center">
                        <Plus className="h-6 w-6 mx-auto mb-2" />
                        <div>Nouvelle demande</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-24">
                      <div className="text-center">
                        <Calendar className="h-6 w-6 mx-auto mb-2" />
                        <div>Planifier collecte</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Collectes à venir */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Collectes à venir</CardTitle>
                  <CardDescription>Vos prochaines collectes programmées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingCollections.map((collection) => (
                      <div
                        key={collection.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <div>
                            <div className="font-medium">{collection.type}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {collection.date}
                              <Clock className="h-4 w-4 ml-2" />
                              {collection.time}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4" />
                              {collection.address}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(collection.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="text-sm">{notification.message}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Il y a {notification.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Mes statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Collectes ce mois</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Déchets recyclés</span>
                      <span className="font-medium">45 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Économies CO₂</span>
                      <span className="font-medium text-green-600">12 kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="text-center py-12">
            <Plus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande en cours</h3>
            <p className="text-gray-600 mb-6">Créez une nouvelle demande de collecte</p>
            <Button onClick={() => setShowRequestForm(true)} className="bg-green-600 hover:bg-green-700">
              Nouvelle demande
            </Button>
          </div>
        )}

        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Historique des collectes</CardTitle>
              <CardDescription>Toutes vos collectes précédentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Aucun historique disponible pour le moment</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profil utilisateur</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <div className="text-gray-900">{user.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="text-gray-900">{user.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Type de compte</label>
                  <div className="text-gray-900">Usager</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
