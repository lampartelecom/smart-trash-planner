
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  Truck, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  Settings, 
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const statsData = [
    { name: 'Lun', collectes: 45, recyclage: 32 },
    { name: 'Mar', collectes: 52, recyclage: 38 },
    { name: 'Mer', collectes: 38, recyclage: 28 },
    { name: 'Jeu', collectes: 61, recyclage: 45 },
    { name: 'Ven', collectes: 48, recyclage: 35 },
    { name: 'Sam', collectes: 35, recyclage: 25 },
    { name: 'Dim', collectes: 28, recyclage: 20 }
  ];

  const wasteTypeData = [
    { name: 'Ménagers', value: 45, color: '#10B981' },
    { name: 'Recyclables', value: 30, color: '#3B82F6' },
    { name: 'Encombrants', value: 15, color: '#F59E0B' },
    { name: 'Organiques', value: 10, color: '#8B5CF6' }
  ];

  const pendingRequests = [
    {
      id: 1,
      client: 'Famille Dubois',
      address: '12 Rue de la République',
      wasteType: 'Encombrants',
      date: '2025-01-02',
      priority: 'normal'
    },
    {
      id: 2,
      client: 'Entreprise TechCorp',
      address: '45 Avenue des Entreprises',
      wasteType: 'Recyclables',
      date: '2025-01-02',
      priority: 'urgent'
    },
    {
      id: 3,
      client: 'Restaurant Le Bistrot',
      address: '8 Place du Marché',
      wasteType: 'Organiques',
      date: '2025-01-03',
      priority: 'normal'
    }
  ];

  const agents = [
    {
      id: 1,
      name: 'Pierre Martin',
      vehicle: 'TRP-123',
      status: 'en_mission',
      missions: 5,
      completed: 3
    },
    {
      id: 2,
      name: 'Sophie Durand',
      vehicle: 'TRP-456',
      status: 'disponible',
      missions: 4,
      completed: 4
    },
    {
      id: 3,
      name: 'Marc Leroy',
      vehicle: 'TRP-789',
      status: 'en_mission',
      missions: 6,
      completed: 2
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_mission':
        return <Badge className="bg-blue-100 text-blue-800">En mission</Badge>;
      case 'disponible':
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>;
      case 'pause':
        return <Badge className="bg-yellow-100 text-yellow-800">En pause</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'normal':
        return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Administration</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Admin {user.name}</span>
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
            { key: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
            { key: 'users', label: 'Utilisateurs', icon: Users },
            { key: 'collections', label: 'Collectes', icon: Calendar },
            { key: 'agents', label: 'Agents & Véhicules', icon: Truck },
            { key: 'reports', label: 'Rapports', icon: BarChart }
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

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-green-600">247</div>
                      <p className="text-sm text-gray-600">Collectes cette semaine</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-xs text-green-600 mt-2">+12% vs semaine dernière</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <p className="text-sm text-gray-600">Demandes en attente</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-600 mt-2">-3 depuis hier</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <p className="text-sm text-gray-600">Agents actifs</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">3 en mission</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-orange-600">85%</div>
                      <p className="text-sm text-gray-600">Taux de recyclage</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-xs text-green-600 mt-2">+5% ce mois</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique des collectes */}
              <Card>
                <CardHeader>
                  <CardTitle>Collectes de la semaine</CardTitle>
                  <CardDescription>Évolution des collectes et du recyclage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="collectes" fill="#10B981" name="Collectes totales" />
                      <Bar dataKey="recyclage" fill="#3B82F6" name="Recyclage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Répartition des déchets */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par type de déchets</CardTitle>
                  <CardDescription>Distribution cette semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={wasteTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {wasteTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Demandes en attente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Demandes en attente de traitement
                </CardTitle>
                <CardDescription>Demandes nécessitant une planification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{request.client}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {request.address}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {request.wasteType} - {request.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getPriorityBadge(request.priority)}
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Planifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des agents et véhicules</CardTitle>
                <CardDescription>État des équipes de collecte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-gray-600">Véhicule: {agent.vehicle}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {agent.completed}/{agent.missions} missions
                          </div>
                          <div className="text-xs text-gray-600">Aujourd'hui</div>
                        </div>
                        {getStatusBadge(agent.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Autres onglets avec contenu placeholder */}
        {(activeTab === 'users' || activeTab === 'collections' || activeTab === 'reports') && (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'users' && 'Gestion des utilisateurs'}
                {activeTab === 'collections' && 'Gestion des collectes'}
                {activeTab === 'reports' && 'Rapports et statistiques'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'users' && 'Liste et gestion des comptes usagers'}
                {activeTab === 'collections' && 'Planification et suivi des collectes'}
                {activeTab === 'reports' && 'Analyses détaillées et exports'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  {activeTab === 'users' && <Users className="h-12 w-12 mx-auto" />}
                  {activeTab === 'collections' && <Calendar className="h-12 w-12 mx-auto" />}
                  {activeTab === 'reports' && <BarChart className="h-12 w-12 mx-auto" />}
                </div>
                <p className="text-gray-600">Fonctionnalité en développement</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
