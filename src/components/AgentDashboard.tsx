
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, MapPin, Navigation, AlertTriangle, User, LogOut, Calendar, Truck } from 'lucide-react';

interface AgentDashboardProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('missions');

  const missions = [
    {
      id: 1,
      address: '123 Rue de la Paix',
      wasteType: 'Déchets ménagers',
      time: '08:00',
      status: 'en_cours',
      client: 'Famille Dupont',
      notes: 'Bacs sur le trottoir'
    },
    {
      id: 2,
      address: '45 Avenue des Champs',
      wasteType: 'Recyclables',
      time: '09:30',
      status: 'a_faire',
      client: 'Entreprise ABC',
      notes: 'Accès par la cour arrière'
    },
    {
      id: 3,
      address: '78 Boulevard Victor Hugo',
      wasteType: 'Encombrants',
      time: '11:00',
      status: 'a_faire',
      client: 'M. Martin',
      notes: 'Vieux mobilier'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_cours':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'a_faire':
        return <Badge className="bg-yellow-100 text-yellow-800">À faire</Badge>;
      case 'termine':
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case 'probleme':
        return <Badge className="bg-red-100 text-red-800">Problème</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleConfirmCollection = (missionId: number) => {
    console.log('Collection confirmée pour la mission:', missionId);
  };

  const handleReportProblem = (missionId: number) => {
    console.log('Problème signalé pour la mission:', missionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Agent de collecte</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Agent {user.name}</span>
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
            { key: 'missions', label: 'Missions du jour', icon: Calendar },
            { key: 'map', label: 'Carte GPS', icon: Navigation },
            { key: 'profile', label: 'Mon profil', icon: User }
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

        {activeTab === 'missions' && (
          <div className="space-y-6">
            {/* Résumé du jour */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <p className="text-sm text-gray-600">Missions totales</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <p className="text-sm text-gray-600">En cours</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <p className="text-sm text-gray-600">À faire</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <p className="text-sm text-gray-600">Terminées</p>
                </CardContent>
              </Card>
            </div>

            {/* Liste des missions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Missions du jour</h2>
              {missions.map((mission) => (
                <Card key={mission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-lg font-medium">{mission.client}</div>
                          {getStatusBadge(mission.status)}
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {mission.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {mission.time} - {mission.wasteType}
                          </div>
                          {mission.notes && (
                            <div className="text-sm text-gray-500 italic">
                              Note: {mission.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {mission.status === 'a_faire' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleConfirmCollection(mission.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmer
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportProblem(mission.id)}
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Problème
                            </Button>
                          </>
                        )}
                        {mission.status === 'en_cours' && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleConfirmCollection(mission.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Terminer
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-2" />
                          GPS
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Carte GPS - Tournée du jour
              </CardTitle>
              <CardDescription>
                Suivez votre itinéraire optimisé pour les collectes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Carte GPS interactive</p>
                  <p className="text-sm text-gray-500">Localisation en temps réel et navigation</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Démarrer la navigation
                </Button>
                <Button variant="outline">
                  Ma position
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profil agent</CardTitle>
              <CardDescription>Informations et disponibilité</CardDescription>
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
                  <label className="text-sm font-medium">Statut</label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600">En service</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Véhicule assigné</label>
                  <div className="text-gray-900">Camion #TRP-456</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
