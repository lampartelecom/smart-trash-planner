
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar, ArrowLeft, Trash2, Recycle } from 'lucide-react';

interface CollectionRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CollectionRequestForm: React.FC<CollectionRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    wasteType: '',
    frequency: 'ponctuelle',
    date: '',
    quantity: '',
    address: '123 Rue de la Paix, 75001 Paris',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const wasteTypes = [
    { value: 'menagers', label: 'Déchets ménagers', icon: Trash2 },
    { value: 'recyclables', label: 'Déchets recyclables', icon: Recycle },
    { value: 'encombrants', label: 'Encombrants', icon: Trash2 },
    { value: 'verre', label: 'Verre', icon: Recycle },
    { value: 'organiques', label: 'Déchets organiques', icon: Trash2 },
    { value: 'electroniques', label: 'Déchets électroniques', icon: Trash2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button onClick={onCancel} variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Nouvelle demande de collecte</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Demande de collecte
            </CardTitle>
            <CardDescription>
              Remplissez les informations pour programmer votre collecte de déchets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de déchets */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Type de déchets *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {wasteTypes.map((type) => (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-all ${
                        formData.wasteType === type.value
                          ? 'ring-2 ring-green-600 border-green-600'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, wasteType: type.value })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <type.icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Fréquence */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Fréquence *</Label>
                <RadioGroup
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="ponctuelle" id="ponctuelle" />
                    <Label htmlFor="ponctuelle" className="font-medium cursor-pointer">
                      Ponctuelle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="hebdomadaire" id="hebdomadaire" />
                    <Label htmlFor="hebdomadaire" className="font-medium cursor-pointer">
                      Hebdomadaire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="mensuelle" id="mensuelle" />
                    <Label htmlFor="mensuelle" className="font-medium cursor-pointer">
                      Mensuelle
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date souhaitée */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date souhaitée *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Quantité estimée */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité estimée (optionnel)</Label>
                  <Select
                    value={formData.quantity}
                    onValueChange={(value) => setFormData({ ...formData, quantity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une quantité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petit">Petit (1-2 sacs)</SelectItem>
                      <SelectItem value="moyen">Moyen (3-5 sacs)</SelectItem>
                      <SelectItem value="grand">Grand (6-10 sacs)</SelectItem>
                      <SelectItem value="tres-grand">Très grand (plus de 10 sacs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Adresse */}
              <div className="space-y-2">
                <Label htmlFor="address">Adresse de collecte *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Adresse complète"
                  required
                />
              </div>

              {/* Commentaires */}
              <div className="space-y-2">
                <Label htmlFor="comments">Commentaires supplémentaires</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Instructions spéciales, accès, etc."
                  rows={3}
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!formData.wasteType || !formData.date}
                >
                  Soumettre la demande
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionRequestForm;
