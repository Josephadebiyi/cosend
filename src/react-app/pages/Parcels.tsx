import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, Clock, CheckCircle, Truck, ArrowLeft, MapPin } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernCard from '@/react-app/components/ModernCard';

const statusConfig = {
  created: { icon: Package, color: 'text-text-muted', bg: 'bg-border-light', label: 'Created' },
  matched: { icon: CheckCircle, color: 'text-status-info', bg: 'bg-blue-100', label: 'Matched' },
  picked_up: { icon: Truck, color: 'text-status-warning', bg: 'bg-orange-100', label: 'Picked Up' },
  in_transit: { icon: Truck, color: 'text-primary', bg: 'bg-primary-100', label: 'In Transit' },
  delivered: { icon: CheckCircle, color: 'text-status-success', bg: 'bg-green-100', label: 'Delivered' },
};

export default function Parcels() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sent' | 'carrying'>('sent');

  const mockSentParcels = [
    {
      id: 1,
      route: 'London → Paris',
      type: 'Documents',
      weight: 1.5,
      status: 'in_transit' as const,
      traveler: 'Sarah M.',
      price: 17.28,
      createdAt: '2024-12-26',
    },
    {
      id: 2,
      route: 'Berlin → Rome',
      type: 'Electronics',
      weight: 2.0,
      status: 'matched' as const,
      traveler: 'Marcus K.',
      price: 18.56,
      createdAt: '2024-12-25',
    },
  ];

  const mockCarryingParcels = [
    {
      id: 3,
      route: 'Madrid → Barcelona',
      type: 'Clothes',
      weight: 1.8,
      status: 'picked_up' as const,
      sender: 'Alex P.',
      earnings: 14.40,
      createdAt: '2024-12-27',
    },
  ];

  const renderParcelCard = (parcel: any, type: 'sent' | 'carrying') => {
    const statusInfo = statusConfig[parcel.status as keyof typeof statusConfig];
    const StatusIcon = statusInfo.icon;

    return (
      <ModernCard key={parcel.id} hover className="bg-primary">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center mr-3">
              <StatusIcon className="w-6 h-6 text-text-on-primary" />
            </div>
            <div>
              <div className="font-bold text-lg text-text-on-primary">{parcel.route}</div>
              <div className="text-text-on-primary/70">{parcel.type} • {parcel.weight}kg</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-text-on-primary">
              €{type === 'sent' ? parcel.price?.toFixed(2) : parcel.earnings?.toFixed(2)}
            </div>
            <div className="text-xs text-text-on-primary/70">
              {type === 'sent' ? 'paid' : 'earnings'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-text-on-primary/70">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(parcel.createdAt).toLocaleDateString()}
          </div>
          <div className="bg-text-on-primary text-primary px-3 py-1 rounded-full text-xs font-medium">
            {statusInfo.label}
          </div>
        </div>

        {type === 'sent' && parcel.traveler && (
          <div className="mt-4 pt-4 border-t border-text-on-primary/20">
            <div className="flex items-center text-sm text-text-on-primary">
              <div className="w-8 h-8 bg-text-on-primary rounded-full flex items-center justify-center text-primary text-xs font-bold mr-3">
                {parcel.traveler.charAt(0)}
              </div>
              Traveler: {parcel.traveler}
            </div>
          </div>
        )}

        {type === 'carrying' && parcel.sender && (
          <div className="mt-4 pt-4 border-t border-text-on-primary/20">
            <div className="flex items-center text-sm text-text-on-primary">
              <div className="w-8 h-8 bg-text-on-primary rounded-full flex items-center justify-center text-primary text-xs font-bold mr-3">
                {parcel.sender.charAt(0)}
              </div>
              Sender: {parcel.sender}
            </div>
          </div>
        )}
      </ModernCard>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header - Bito Style */}
      <div className="bg-background px-6 py-8 pt-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-background-light rounded-2xl flex items-center justify-center shadow-soft">
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Your Activity</div>
                <div className="font-semibold text-text-primary text-lg">My Parcels</div>
              </div>
            </div>
            <div className="w-10 h-10 bg-status-error/20 rounded-2xl flex items-center justify-center">
              <div className="w-4 h-4 bg-status-error rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Tab Navigation - Bito Style */}
        <ModernCard className="mb-6 p-1">
          <div className="flex bg-background-secondary rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'sent'
                  ? 'bg-primary text-text-on-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sent Parcels
            </button>
            <button
              onClick={() => setActiveTab('carrying')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'carrying'
                  ? 'bg-primary text-text-on-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Carrying
            </button>
          </div>
        </ModernCard>

        {/* Parcels List - Bito Style */}
        <div className="space-y-4">
          {activeTab === 'sent' ? (
            mockSentParcels.length > 0 ? (
              mockSentParcels.map((parcel) => renderParcelCard(parcel, 'sent'))
            ) : (
              <ModernCard className="text-center py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">No sent parcels</h3>
                <p className="text-text-secondary text-sm">Your sent parcels will appear here</p>
              </ModernCard>
            )
          ) : (
            mockCarryingParcels.length > 0 ? (
              mockCarryingParcels.map((parcel) => renderParcelCard(parcel, 'carrying'))
            ) : (
              <ModernCard className="text-center py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">No parcels to carry</h3>
                <p className="text-text-secondary text-sm">Accepted parcels will appear here</p>
              </ModernCard>
            )
          )}
        </div>

        {/* Status Legend - Bito Style */}
        <ModernCard className="mt-6">
          <h3 className="font-semibold text-text-primary text-lg mb-4">Status Guide</h3>
          <div className="space-y-3">
            {Object.entries(statusConfig).map(([status, config]) => {
              const Icon = config.icon;
              return (
                <div key={status} className="flex items-center p-3 bg-background-secondary rounded-2xl">
                  <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-text-primary">{config.label}</span>
                </div>
              );
            })}
          </div>
        </ModernCard>
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
