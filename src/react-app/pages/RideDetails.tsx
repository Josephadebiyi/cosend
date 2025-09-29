import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Car, Clock, Shield, CheckCircle, MessageCircle, Package, Plane } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import RequestModal from '@/react-app/components/RequestModal';


interface RideDetails {
  id: number;
  driverId: string;
  driverName: string;
  driverRating: number;
  driverPhoto?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
  fromLocation: string;
  toLocation: string;
  fromAddress: string;
  toAddress: string;
  vehicleType: string;
  vehicleModel?: string;
  travelMode: 'car' | 'flight';
  comfortLevel?: 'basic' | 'comfort' | 'premium';
  verified: boolean;
  instantBooking: boolean;
  joinDate: string;
  totalTrips: number;
  availableKg: number;
  price: number;
}

export default function RideDetails() {
  const { rideId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const fromCity = searchParams.get('from') || 'Paris';
  const toCity = searchParams.get('to') || 'Berlin';

  // Mock data for the specific ride
  const mockRideDetails: RideDetails = {
    id: parseInt(rideId || '1'),
    driverId: 'sarah_m',
    driverName: 'Sarah M.',
    driverRating: 4.9,
    driverPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=64&h=64&fit=crop&crop=face',
    departureTime: '14:30',
    arrivalTime: '20:45',
    duration: '6h 15m',
    pricePerSeat: 45,
    availableSeats: 2,
    totalSeats: 4,
    fromLocation: fromCity,
    toLocation: toCity,
    fromAddress: 'Gare du Nord Station, Paris',
    toAddress: 'Berlin Hauptbahnhof, Berlin',
    vehicleType: 'Sedan',
    vehicleModel: 'BMW 3 Series',
    travelMode: 'car',
    comfortLevel: 'comfort',
    verified: true,
    instantBooking: true,
    joinDate: '2023-03-15',
    totalTrips: 23,
    availableKg: 5,
    price: 8,
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      reviewer: 'M***a K.',
      rating: 5,
      comment: 'Excellent service, package arrived safely and on time.',
      date: '2 weeks ago',
      route: 'London → Paris'
    },
    {
      id: 2,
      reviewer: 'A***x L.',
      rating: 5,
      comment: 'Very professional and reliable traveler.',
      date: '1 month ago',
      route: 'Berlin → Rome'
    },
  ];

  const handleRequestShipping = () => {
    setShowRequestModal(true);
  };

  const handleSubmitRequest = (requestData: any) => {
    console.log('Shipping request submitted:', requestData);
    setShowRequestModal(false);
    
    // Show success notification
    alert(`Request sent successfully! Tracking Number: ${requestData.trackingNumber}\n\nThe traveler will be notified and you can chat once they accept your request.`);
    
    // Simulate acceptance and show chat option
    setTimeout(() => {
      const userConfirm = confirm('Good news! The traveler has accepted your request. Would you like to start chatting?');
      if (userConfirm) {
        setShowChatModal(true);
      }
    }, 2000);
  };

  const travelerForModal = {
    id: mockRideDetails.id,
    name: mockRideDetails.driverName,
    avatar: mockRideDetails.driverName.split(' ').map(n => n[0]).join(''),
    rating: mockRideDetails.driverRating,
    totalTrips: mockRideDetails.totalTrips,
    verified: mockRideDetails.verified,
    route: `${mockRideDetails.fromLocation} → ${mockRideDetails.toLocation}`,
    date: 'Dec 28',
    availableKg: mockRideDetails.availableKg,
    price: mockRideDetails.price,
    joinDate: mockRideDetails.joinDate,
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pb-20">
      {/* Header */}
      <div className="bg-background px-6 py-6 pt-12 border-b border-border-light">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-background-hover rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">Traveler Details</div>
            <div className="text-sm text-text-secondary">{mockRideDetails.fromLocation} → {mockRideDetails.toLocation}</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Traveler Profile Card */}
        <ModernCard className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/shipping-interface-3d.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-elevated">
              {mockRideDetails.driverPhoto ? (
                <img 
                  src={mockRideDetails.driverPhoto} 
                  alt={mockRideDetails.driverName}
                  className="w-full h-full rounded-3xl object-cover"
                />
              ) : (
                mockRideDetails.driverName.split(' ').map(n => n[0]).join('')
              )}
            </div>
            
            <div className="flex items-center justify-center mb-2">
              <h4 className="text-xl font-bold text-text-primary mr-2">{mockRideDetails.driverName}</h4>
              {mockRideDetails.verified && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-soft">
                  <CheckCircle className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center text-text-secondary mb-4">
              <Star className="w-4 h-4 text-accent mr-1 fill-current" />
              <span className="font-semibold">{mockRideDetails.driverRating}</span>
              <span className="mx-2">•</span>
              <span>{mockRideDetails.totalTrips} trips completed</span>
            </div>

            <div className="flex items-center justify-center text-sm text-text-muted mb-6">
              <Clock className="w-4 h-4 mr-1" />
              Joined {new Date(mockRideDetails.joinDate).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>

            {/* Contact Actions - Only show after request accepted */}
            {false && ( // Hidden until request is accepted
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center bg-primary/10 rounded-2xl p-3 hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-medium">Message</span>
                </button>
              </div>
            )}
            
            {/* Info Notice */}
            <div className="bg-background-secondary rounded-2xl p-3 mb-6 text-center">
              <p className="text-text-secondary text-sm">
                Contact options will be available after the traveler accepts your request. All communication stays secure within COSEND.
              </p>
            </div>
          </div>
        </ModernCard>

        {/* Trip Details */}
        <ModernCard className="gradient-primary">
          <div className="text-white">
            <h5 className="font-bold mb-4 flex items-center">
              {mockRideDetails.travelMode === 'flight' ? (
                <Plane className="w-5 h-5 mr-2" />
              ) : (
                <Car className="w-5 h-5 mr-2" />
              )}
              Trip Details
            </h5>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white/70 mb-1">Departure</div>
                <div className="font-bold text-lg">{mockRideDetails.departureTime}</div>
                <div className="text-sm text-white/80">{mockRideDetails.fromAddress}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/70 mb-1">Arrival</div>
                <div className="font-bold text-lg">{mockRideDetails.arrivalTime}</div>
                <div className="text-sm text-white/80">{mockRideDetails.toAddress}</div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">{mockRideDetails.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="font-semibold">{mockRideDetails.vehicleModel || mockRideDetails.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Space:</span>
                <span className="font-semibold">{mockRideDetails.availableKg}kg</span>
              </div>
              <div className="flex justify-between">
                <span>Rate:</span>
                <span className="font-semibold text-accent">€{mockRideDetails.price}/kg</span>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Package Shipping Section */}
        <ModernCard className="border-2 border-accent/20">
          <div className="text-center mb-4">
            <Package className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="text-xl font-bold text-text-primary mb-2">Send a Package</h3>
            <p className="text-text-secondary">
              Send your package with {mockRideDetails.driverName} on this trip
            </p>
          </div>

          <div className="bg-accent/10 rounded-2xl p-4 mb-6 text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              €{mockRideDetails.price}/kg
            </div>
            <div className="text-sm text-text-secondary">
              + 16% service fee • Up to {mockRideDetails.availableKg}kg available
            </div>
          </div>

          <ModernButton
            variant="primary"
            fullWidth
            onClick={handleRequestShipping}
            className="transform hover:scale-105 transition-all duration-300"
          >
            🚀 Request Package Delivery
          </ModernButton>
        </ModernCard>

        {/* Safety Features */}
        <ModernCard>
          <h5 className="font-bold text-text-primary mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Safety & Trust Features
          </h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/10 rounded-2xl p-3 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold text-text-primary">ID Verified</div>
            </div>
            <div className="bg-accent/10 rounded-2xl p-3 text-center">
              <Star className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-sm font-semibold text-text-primary">Top Rated</div>
            </div>
          </div>
        </ModernCard>

        {/* Reviews */}
        <ModernCard>
          <h5 className="font-bold text-text-primary mb-3 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-primary" />
            Recent Reviews
          </h5>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-background-secondary rounded-2xl p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-text-primary text-sm">{review.reviewer}</span>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary text-xs mb-1">{review.comment}</p>
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <span>{review.route}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* GDPR Notice */}
        <div className="text-xs text-text-muted text-center bg-background-secondary rounded-2xl p-3">
          <Shield className="w-4 h-4 inline mr-1" />
          Reviews are anonymized to protect user privacy per EU GDPR regulations
        </div>
      </div>

      {/* Request Modal */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        traveler={travelerForModal}
        onSubmit={handleSubmitRequest}
      />

      {/* Navigate to Chat Page */}
      {showChatModal && (() => {
        const chatParams = new URLSearchParams({
          userId: mockRideDetails.driverId,
          userName: mockRideDetails.driverName,
          userAvatar: mockRideDetails.driverName.split(' ').map(n => n[0]).join(''),
        });
        navigate(`/chat?${chatParams.toString()}`);
        setShowChatModal(false);
        return null;
      })()}
    </div>
  );
}
