import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, MapPin, Calendar, Clock, Edit, Trash2, Plus, Plane, Car, CheckCircle } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';

interface TravelListing {
  id: number;
  fromCity: string;
  toCity: string;
  travelDate: string;
  departureTime: string;
  availableKg: number;
  usedKg: number;
  status: 'active' | 'completed' | 'cancelled';
  travelMode: 'flight' | 'car';
  requests: number;
  earnings: number;
}

export default function CarryPackageListings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'requests' | 'listings'>('requests');

  const mockListings: TravelListing[] = [
    {
      id: 1,
      fromCity: 'London',
      toCity: 'Paris',
      travelDate: '2024-12-28',
      departureTime: '14:30',
      availableKg: 5,
      usedKg: 2,
      status: 'active',
      travelMode: 'flight',
      requests: 3,
      earnings: 16.40,
    },
    {
      id: 2,
      fromCity: 'Berlin',
      toCity: 'Rome',
      travelDate: '2024-12-30',
      departureTime: '09:15',
      availableKg: 3,
      usedKg: 3,
      status: 'completed',
      travelMode: 'flight',
      requests: 2,
      earnings: 24.00,
    },
    {
      id: 3,
      fromCity: 'Madrid',
      toCity: 'Barcelona',
      travelDate: '2025-01-02',
      departureTime: '16:00',
      availableKg: 7,
      usedKg: 0,
      status: 'active',
      travelMode: 'car',
      requests: 1,
      earnings: 0,
    },
  ];

  const mockRequests = [
    {
      id: 1,
      sender: 'Alex P.',
      route: 'London → Paris',
      weight: 2,
      type: 'Documents',
      payment: 18.56,
      avatar: 'AP',
      verified: true,
      description: 'Important business documents - handle with care',
      deadline: '2024-12-30',
      status: 'pending',
    },
    {
      id: 2,
      sender: 'Emma L.',
      route: 'Berlin → Rome',
      weight: 1.5,
      type: 'Electronics',
      payment: 13.92,
      avatar: 'EL',
      verified: false,
      description: 'Small electronic device, fragile packaging',
      deadline: '2025-01-05',
      status: 'pending',
    },
  ];

  

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'completed': return 'badge';
      case 'cancelled': return 'badge-error';
      default: return 'badge';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-6 py-8 pt-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 bg-background-light rounded-2xl flex items-center justify-center shadow-soft hover:shadow-elevated transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">Carry Packages</div>
              <div className="text-sm text-text-secondary">Manage your travel listings</div>
            </div>
            <button 
              onClick={() => navigate('/add-travel-listing')}
              className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-background-light rounded-2xl p-1 shadow-soft">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'requests'
                  ? 'bg-primary text-text-on-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Requests ({mockRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'listings'
                  ? 'bg-primary text-text-on-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
            >
              <Plane className="w-4 h-4 inline mr-2" />
              My Listings ({mockListings.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-6">
        {activeTab === 'requests' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary text-xl">Incoming Requests</h3>
              <span className="text-primary text-sm font-semibold">
                {mockRequests.length} pending
              </span>
            </div>

            {mockRequests.length > 0 ? (
              <div className="space-y-3">
                {mockRequests.map((request) => (
                  <ModernCard key={request.id} className="bg-background-light hover:bg-background-secondary transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-text-on-primary font-bold mr-4">
                              {request.avatar}
                            </div>
                            {request.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-status-success rounded-full flex items-center justify-center border-2 border-background">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-semibold text-text-primary">{request.sender}</span>
                              {request.verified && (
                                <span className="ml-2 px-2 py-1 bg-status-success/10 text-status-success text-xs font-medium rounded-full border border-status-success/20">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-text-secondary">{request.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-text-secondary mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-primary" />
                          {request.route}
                        </div>
                        <div className="text-sm text-text-muted mb-2">{request.weight}kg • Deadline: {new Date(request.deadline).toLocaleDateString()}</div>
                        <div className="text-sm text-text-secondary">{request.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary mb-2">€{request.payment}</div>
                        <div className="text-xs text-text-muted mb-3">your earnings</div>
                        <div className="space-y-2">
                          <ModernButton 
                            variant="primary" 
                            size="sm"
                            onClick={() => navigate(`/request-details/${request.id}`)}
                            className="w-full"
                          >
                            View Details
                          </ModernButton>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                ))}
              </div>
            ) : (
              <ModernCard className="text-center py-8">
                <Package className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">No Requests Yet</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Create travel listings to start receiving parcel requests
                </p>
                <ModernButton variant="primary" onClick={() => navigate('/add-travel-listing')}>
                  Create Listing
                </ModernButton>
              </ModernCard>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary text-xl">My Travel Listings</h3>
              <ModernButton 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/add-travel-listing')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Listing
              </ModernButton>
            </div>

            {mockListings.length > 0 ? (
              <div className="space-y-3">
                {mockListings.map((listing) => (
                  <ModernCard key={listing.id} className="bg-background-light hover:bg-background-secondary transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                            {listing.travelMode === 'flight' ? (
                              <Plane className="w-6 h-6 text-primary" />
                            ) : (
                              <Car className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary">
                              {listing.fromCity} → {listing.toCity}
                            </div>
                            <div className={`text-sm font-medium ${getStatusBadge(listing.status)}`}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-text-secondary mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(listing.travelDate).toLocaleDateString()}
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {listing.departureTime}
                        </div>
                        <div className="text-sm text-text-muted">
                          Capacity: {listing.usedKg}/{listing.availableKg}kg • {listing.requests} requests
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary mb-2">€{listing.earnings.toFixed(2)}</div>
                        <div className="text-xs text-text-muted mb-3">earnings</div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => navigate(`/edit-listing/${listing.id}`)}
                            className="w-8 h-8 bg-background-secondary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors"
                          >
                            <Edit className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button 
                            onClick={() => {}}
                            className="w-8 h-8 bg-status-error/10 rounded-xl flex items-center justify-center hover:bg-status-error/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-status-error" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                ))}
              </div>
            ) : (
              <ModernCard className="text-center py-8">
                <Plane className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">No Listings Yet</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Create your first travel listing to start earning
                </p>
                <ModernButton variant="primary" onClick={() => navigate('/add-travel-listing')}>
                  Create First Listing
                </ModernButton>
              </ModernCard>
            )}
          </div>
        )}
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
