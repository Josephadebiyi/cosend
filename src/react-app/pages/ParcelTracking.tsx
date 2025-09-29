import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, MessageCircle, Star, User } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
}

interface ParcelDetails {
  id: string;
  trackingNumber: string;
  status: 'created' | 'matched' | 'picked_up' | 'in_transit' | 'delivered';
  sender: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    phone: string;
  };
  recipient: {
    name: string;
    phone: string;
  };
  traveler?: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    phone: string;
  };
  parcel: {
    type: string;
    weight: number;
    description: string;
    value: string;
  };
  route: {
    from: string;
    to: string;
    pickupAddress: string;
    deliveryAddress: string;
  };
  payment: {
    amount: number;
    currency: string;
  };
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export default function ParcelTracking() {
  const navigate = useNavigate();
  const { parcelId } = useParams();
  
  // Mock data - in real app would fetch based on parcelId
  const parcelDetails: ParcelDetails = {
    id: parcelId || '1',
    trackingNumber: '#BS240001',
    status: 'in_transit',
    sender: {
      name: 'Wade Warren',
      avatar: 'WW',
      verified: true,
      rating: 4.8,
      phone: '+44 7700 123456',
    },
    recipient: {
      name: 'Sarah Johnson',
      phone: '+33 6 12 34 56 78',
    },
    traveler: {
      name: 'Marcus K.',
      avatar: 'MK',
      verified: true,
      rating: 4.9,
      phone: '+49 151 12345678',
    },
    parcel: {
      type: 'Electronics',
      weight: 1.2,
      description: 'Smartphone in original packaging',
      value: '€800',
    },
    route: {
      from: 'London, UK',
      to: 'Paris, France',
      pickupAddress: '123 Tech Street, London E1 6AN',
      deliveryAddress: '456 Rue de la Tech, 75001 Paris',
    },
    payment: {
      amount: 12.48,
      currency: 'EUR',
    },
    estimatedDelivery: '2024-12-28T16:00:00Z',
    events: [
      {
        id: '1',
        timestamp: '2024-12-26T09:00:00Z',
        location: 'London, UK',
        status: 'Parcel Created',
        description: 'Your parcel request has been created and payment processed',
        completed: true,
      },
      {
        id: '2',
        timestamp: '2024-12-26T11:30:00Z',
        location: 'London, UK',
        status: 'Matched with Traveler',
        description: 'Your parcel has been matched with verified traveler Marcus K.',
        completed: true,
      },
      {
        id: '3',
        timestamp: '2024-12-26T14:00:00Z',
        location: 'London Heathrow',
        status: 'Picked Up',
        description: 'Parcel collected by traveler at pickup location',
        completed: true,
      },
      {
        id: '4',
        timestamp: '2024-12-26T18:45:00Z',
        location: 'In Transit',
        status: 'In Transit',
        description: 'Parcel is traveling to destination with Marcus K.',
        completed: true,
      },
      {
        id: '5',
        timestamp: '2024-12-28T10:00:00Z',
        location: 'Paris Charles de Gaulle',
        status: 'Arrived at Destination',
        description: 'Parcel has arrived at destination city',
        completed: false,
      },
      {
        id: '6',
        timestamp: '2024-12-28T16:00:00Z',
        location: 'Paris, France',
        status: 'Out for Delivery',
        description: 'Parcel is out for final delivery to recipient',
        completed: false,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-status-success';
      case 'in_transit': return 'text-primary';
      case 'picked_up': return 'text-status-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return CheckCircle;
      case 'in_transit': return Truck;
      case 'picked_up': return Package;
      default: return Clock;
    }
  };

  const getCurrentStepIndex = () => {
    return parcelDetails.events.filter(event => event.completed).length - 1;
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
              <div className="text-lg font-bold text-text-primary">Parcel Details</div>
              <div className="text-sm text-text-secondary">{parcelDetails.trackingNumber}</div>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Status Overview */}
        <ModernCard className="mb-6 bg-gradient-soft">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">{parcelDetails.parcel.type}</h2>
            <div className={`text-lg font-semibold capitalize ${getStatusColor(parcelDetails.status)}`}>
              {parcelDetails.status.replace('_', ' ')}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-text-secondary mb-1">From</div>
              <div className="font-semibold text-text-primary">{parcelDetails.route.from}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">To</div>
              <div className="font-semibold text-text-primary">{parcelDetails.route.to}</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border-light">
            <div>
              <div className="text-sm text-text-secondary">Weight</div>
              <div className="font-semibold text-text-primary">{parcelDetails.parcel.weight}kg</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary">Est. Delivery</div>
              <div className="font-semibold text-text-primary">
                {new Date(parcelDetails.estimatedDelivery).toLocaleDateString()}
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Tracking Progress */}
        <ModernCard className="mb-6">
          <h3 className="font-bold text-text-primary mb-4">Tracking Progress</h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-1000"
              style={{ height: `${(getCurrentStepIndex() / (parcelDetails.events.length - 1)) * 100}%` }}
            ></div>
            
            <div className="space-y-6">
              {parcelDetails.events.map((event, index) => {
                const isCompleted = event.completed;
                const isCurrent = index === getCurrentStepIndex() + 1;
                const StatusIcon = getStatusIcon(event.status);
                
                return (
                  <div key={event.id} className="flex items-start relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? 'bg-primary' : isCurrent ? 'bg-primary/50' : 'bg-background-secondary border-2 border-border-light'
                    }`}>
                      <StatusIcon className={`w-6 h-6 ${
                        isCompleted ? 'text-text-on-primary' : isCurrent ? 'text-primary' : 'text-text-muted'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className={`font-semibold ${isCompleted ? 'text-text-primary' : 'text-text-muted'}`}>
                        {event.status}
                      </div>
                      <div className={`text-sm ${isCompleted ? 'text-text-secondary' : 'text-text-muted'}`}>
                        {event.description}
                      </div>
                      <div className={`text-xs mt-1 ${isCompleted ? 'text-primary' : 'text-text-muted'}`}>
                        {event.location} • {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ModernCard>

        {/* Traveler Info */}
        {parcelDetails.traveler && (
          <ModernCard className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">Your Traveler</h3>
              <button 
                onClick={() => navigate(`/chat?userId=${parcelDetails.traveler?.name.toLowerCase().replace(' ', '_')}&userName=${parcelDetails.traveler?.name}&userAvatar=${parcelDetails.traveler?.avatar}`)}
                className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-text-on-primary font-bold mr-4">
                  {parcelDetails.traveler.avatar}
                </div>
                {parcelDetails.traveler.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-status-success rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-text-primary">{parcelDetails.traveler.name}</div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Star className="w-4 h-4 text-status-success mr-1 fill-current" />
                  {parcelDetails.traveler.rating} • Verified Traveler
                </div>
              </div>
            </div>
          </ModernCard>
        )}

        {/* Parcel Details */}
        <ModernCard className="mb-6">
          <h3 className="font-bold text-text-primary mb-4">Parcel Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Type:</span>
              <span className="font-semibold text-text-primary">{parcelDetails.parcel.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Weight:</span>
              <span className="font-semibold text-text-primary">{parcelDetails.parcel.weight}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Declared Value:</span>
              <span className="font-semibold text-text-primary">{parcelDetails.parcel.value}</span>
            </div>
            <div className="bg-background-secondary rounded-2xl p-4">
              <div className="text-sm font-semibold text-text-primary mb-1">Description:</div>
              <div className="text-sm text-text-secondary">{parcelDetails.parcel.description}</div>
            </div>
          </div>
        </ModernCard>

        {/* Contact Info */}
        <ModernCard className="mb-6">
          <h3 className="font-bold text-text-primary mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">Sender</div>
                <div className="text-sm text-text-secondary">{parcelDetails.sender.name}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-background-secondary rounded-2xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-text-secondary" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">Recipient</div>
                <div className="text-sm text-text-secondary">{parcelDetails.recipient.name}</div>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Action Buttons */}
        <div className="space-y-3">
          <ModernButton variant="primary" fullWidth>
            Get Support
          </ModernButton>
          <ModernButton variant="outline" fullWidth>
            Share Tracking
          </ModernButton>
        </div>
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
