import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Package, User, Phone, CheckCircle, X, MessageCircle, Navigation } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import TrackingStatusModal from '@/react-app/components/TrackingStatusModal';

interface ParcelRequest {
  id: number;
  sender: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    phone: string;
  };
  pickup: {
    address: string;
    city: string;
    contactPerson: string;
    instructions: string;
    timeWindow: string;
    coordinates: { lat: number; lng: number };
  };
  dropoff: {
    address: string;
    city: string;
    contactPerson: string;
    instructions: string;
    timeWindow: string;
    coordinates: { lat: number; lng: number };
  };
  parcel: {
    type: string;
    weight: number;
    description: string;
    value: string;
    fragile: boolean;
  };
  payment: {
    amount: number;
    currency: string;
  };
  deadline: string;
  specialInstructions: string;
  status: 'accepted' | 'in_progress' | 'picked_up' | 'delivered';
}

export default function PickupDetails() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [currentStatus, setCurrentStatus] = useState<'accepted' | 'in_progress' | 'picked_up' | 'delivered'>('accepted');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Mock data - in real app, fetch based on requestId
  const parcelRequest: ParcelRequest = {
    id: parseInt(requestId || '1'),
    sender: {
      name: 'Alex Patterson',
      avatar: 'AP',
      verified: true,
      rating: 4.9,
      phone: '+1 (555) 123-4567',
    },
    pickup: {
      address: '123 Business Plaza, Suite 400',
      city: 'Madrid, Spain',
      contactPerson: 'Alex Patterson',
      instructions: 'Reception on ground floor. Ask for Alex from Suite 400. Building has secure parking.',
      timeWindow: '9:00 AM - 6:00 PM',
      coordinates: { lat: 40.4168, lng: -3.7038 },
    },
    dropoff: {
      address: '456 Innovation Street, Floor 2',
      city: 'Barcelona, Spain',
      contactPerson: 'Maria Rodriguez',
      instructions: 'Modern glass building. Reception will call Maria. Package must be signed by recipient.',
      timeWindow: '10:00 AM - 7:00 PM',
      coordinates: { lat: 41.3851, lng: 2.1734 },
    },
    parcel: {
      type: 'Documents',
      weight: 2.0,
      description: 'Important business documents in sealed envelope',
      value: '€500',
      fragile: false,
    },
    payment: {
      amount: 18.56,
      currency: 'EUR',
    },
    deadline: '2024-12-30T18:00:00Z',
    specialInstructions: 'Handle with care. Documents are confidential business contracts.',
    status: currentStatus,
  };

  const statusSteps = [
    { key: 'accepted', label: 'Accepted', icon: CheckCircle },
    { key: 'in_progress', label: 'On Route to Pickup', icon: Navigation },
    { key: 'picked_up', label: 'Package Picked Up', icon: Package },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === currentStatus);
  };

  const updateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus as any);
    setShowTrackingModal(false);
    // Here you would call API to update status
    console.log('Status updated to:', newStatus);
  };

  const openMaps = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
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
              <div className="text-lg font-bold text-text-primary">Pickup Details</div>
              <div className="text-sm text-text-secondary">Request #{parcelRequest.id}</div>
            </div>
            <button 
              onClick={() => setShowStatusModal(true)}
              className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <Package className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Status Progress */}
        <ModernCard className="mb-6">
          <h3 className="font-semibold text-text-primary mb-4">Delivery Status</h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500"
              style={{ height: `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` }}
            ></div>
            
            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();
                const StepIcon = step.icon;
                
                return (
                  <div key={step.key} className="flex items-center relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? 'bg-primary' : 'bg-background-secondary border-2 border-border-light'
                    }`}>
                      <StepIcon className={`w-6 h-6 ${
                        isCompleted ? 'text-text-on-primary' : 'text-text-muted'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className={`font-semibold ${isCompleted ? 'text-text-primary' : 'text-text-muted'}`}>
                        {step.label}
                      </div>
                      {isCurrent && (
                        <div className="text-sm text-primary">Current status</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ModernCard>

        {/* Sender Info */}
        <ModernCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Sender Information</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => window.open(`tel:${parcelRequest.sender.phone}`)}
                className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
              </button>
              <button className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary/30 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-text-on-primary font-bold mr-4">
                {parcelRequest.sender.avatar}
              </div>
              {parcelRequest.sender.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-status-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="font-semibold text-text-primary">{parcelRequest.sender.name}</div>
              <div className="text-sm text-text-secondary">Rating: ⭐ {parcelRequest.sender.rating}</div>
              <div className="text-sm text-text-muted">{parcelRequest.sender.phone}</div>
            </div>
          </div>
        </ModernCard>

        {/* Pickup Location */}
        <ModernCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Pickup Location</h3>
            <ModernButton 
              variant="outline" 
              size="sm"
              onClick={() => openMaps(parcelRequest.pickup.coordinates)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </ModernButton>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">{parcelRequest.pickup.address}</div>
                <div className="text-sm text-text-secondary">{parcelRequest.pickup.city}</div>
              </div>
            </div>
            <div className="flex items-start">
              <User className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">Contact: {parcelRequest.pickup.contactPerson}</div>
                <div className="text-sm text-text-secondary">Available: {parcelRequest.pickup.timeWindow}</div>
              </div>
            </div>
            <div className="bg-background-secondary rounded-2xl p-4">
              <div className="text-sm font-medium text-text-primary mb-1">Pickup Instructions:</div>
              <div className="text-sm text-text-secondary">{parcelRequest.pickup.instructions}</div>
            </div>
          </div>
        </ModernCard>

        {/* Dropoff Location */}
        <ModernCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Drop-off Location</h3>
            <ModernButton 
              variant="outline" 
              size="sm"
              onClick={() => openMaps(parcelRequest.dropoff.coordinates)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </ModernButton>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">{parcelRequest.dropoff.address}</div>
                <div className="text-sm text-text-secondary">{parcelRequest.dropoff.city}</div>
              </div>
            </div>
            <div className="flex items-start">
              <User className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">Contact: {parcelRequest.dropoff.contactPerson}</div>
                <div className="text-sm text-text-secondary">Available: {parcelRequest.dropoff.timeWindow}</div>
              </div>
            </div>
            <div className="bg-background-secondary rounded-2xl p-4">
              <div className="text-sm font-medium text-text-primary mb-1">Drop-off Instructions:</div>
              <div className="text-sm text-text-secondary">{parcelRequest.dropoff.instructions}</div>
            </div>
          </div>
        </ModernCard>

        {/* Package Details */}
        <ModernCard className="mb-6">
          <h3 className="font-semibold text-text-primary mb-4">Package Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Type:</span>
              <span className="font-medium text-text-primary">{parcelRequest.parcel.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Weight:</span>
              <span className="font-medium text-text-primary">{parcelRequest.parcel.weight}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Declared Value:</span>
              <span className="font-medium text-text-primary">{parcelRequest.parcel.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Fragile:</span>
              <span className={`font-medium ${parcelRequest.parcel.fragile ? 'status-warning' : 'status-success'}`}>
                {parcelRequest.parcel.fragile ? 'Yes - Handle with care' : 'No'}
              </span>
            </div>
            <div className="bg-background-secondary rounded-2xl p-4">
              <div className="text-sm font-medium text-text-primary mb-1">Description:</div>
              <div className="text-sm text-text-secondary">{parcelRequest.parcel.description}</div>
            </div>
          </div>
        </ModernCard>

        {/* Payment & Deadline */}
        <ModernCard className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                €{parcelRequest.payment.amount}
              </div>
              <div className="text-sm text-text-secondary">Your Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary mb-1">
                {new Date(parcelRequest.deadline).toLocaleDateString()}
              </div>
              <div className="text-sm text-text-secondary">Delivery Deadline</div>
            </div>
          </div>
        </ModernCard>

        {/* Action Buttons */}
        <div className="space-y-3">
          <ModernButton 
            variant="primary" 
            fullWidth
            onClick={() => setShowTrackingModal(true)}
          >
            Update Status
          </ModernButton>
          <ModernButton 
            variant="outline" 
            fullWidth
            onClick={() => navigate('/support')}
          >
            Report Issue
          </ModernButton>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <ModernCard className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Update Status</h3>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <X className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            <div className="space-y-3">
              {statusSteps.map((step, index) => {
                const isAvailable = index <= getCurrentStepIndex() + 1;
                const StepIcon = step.icon;
                
                return (
                  <button
                    key={step.key}
                    onClick={() => updateStatus(step.key as any)}
                    disabled={!isAvailable}
                    className={`w-full flex items-center p-4 rounded-2xl transition-all ${
                      step.key === currentStatus
                        ? 'bg-primary/10 border-2 border-primary'
                        : isAvailable
                        ? 'bg-background-secondary hover:bg-primary/5 border-2 border-transparent'
                        : 'bg-background-secondary/50 border-2 border-transparent opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <StepIcon className={`w-5 h-5 mr-3 ${
                      step.key === currentStatus ? 'text-primary' : 'text-text-secondary'
                    }`} />
                    <span className={`font-medium ${
                      step.key === currentStatus ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {step.label}
                    </span>
                    {step.key === currentStatus && (
                      <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border-light">
              <ModernButton 
                variant="outline" 
                fullWidth 
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Tracking Status Modal */}
      <TrackingStatusModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        currentStatus={currentStatus as any}
        onStatusUpdate={updateStatus}
        userRole="traveler"
      />

      <ModernBottomNavigation />
    </div>
  );
}
