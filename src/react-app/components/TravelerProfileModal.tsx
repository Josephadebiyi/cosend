import { X, Star, MapPin, Calendar, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

interface TravelerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  traveler: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    totalTrips: number;
    verified: boolean;
    route: string;
    date: string;
    availableKg: number;
    price: number;
    joinDate: string;
  };
  onRequestShipping: () => void;
}

export default function TravelerProfileModal({ 
  isOpen, 
  onClose, 
  traveler, 
  onRequestShipping 
}: TravelerProfileModalProps) {
  if (!isOpen) return null;

  // Mock reviews (EU GDPR compliant - anonymized)
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
    {
      id: 3,
      reviewer: 'S***h M.',
      rating: 4,
      comment: 'Good communication throughout the journey.',
      date: '6 weeks ago',
      route: 'Madrid → Barcelona'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl -m-2"></div>
          <h3 className="text-xl font-bold text-text-primary relative z-10">Traveler Profile</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-2xl transition-colors relative z-10"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {/* Traveler Info */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-elevated">
            {traveler.avatar}
          </div>
          
          <div className="flex items-center justify-center mb-2">
            <h4 className="text-xl font-bold text-text-primary mr-2">{traveler.name}</h4>
            {traveler.verified && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-soft">
                <CheckCircle className="w-4 h-4 text-white fill-current" />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center text-text-secondary mb-4">
            <Star className="w-4 h-4 text-accent mr-1 fill-current" />
            <span className="font-semibold">{traveler.rating}</span>
            <span className="mx-2">•</span>
            <span>{traveler.totalTrips} trips completed</span>
          </div>

          <div className="flex items-center justify-center text-sm text-text-muted">
            <Calendar className="w-4 h-4 mr-1" />
            Joined {new Date(traveler.joinDate).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>

        {/* Current Trip */}
        <ModernCard className="gradient-primary mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/shipping-interface-3d.png"
              alt="Trip Route"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-white">
            <h5 className="font-bold mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Current Trip
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Route:</span>
                <span className="font-semibold">{traveler.route}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-semibold">{traveler.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold">{traveler.availableKg}kg</span>
              </div>
              <div className="flex justify-between">
                <span>Rate:</span>
                <span className="font-semibold text-accent">€{traveler.price}/kg</span>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Safety Features */}
        <div className="mb-6">
          <h5 className="font-bold text-text-primary mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Safety & Trust
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
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h5 className="font-bold text-text-primary mb-3 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-primary" />
            Recent Reviews
          </h5>
          <div className="space-y-3 max-h-40 overflow-y-auto">
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
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <ModernButton
            variant="primary"
            fullWidth
            onClick={onRequestShipping}
            className="transform hover:scale-105 transition-all duration-300"
          >
            🚀 Request Shipping
          </ModernButton>
          <ModernButton
            variant="outline"
            fullWidth
            onClick={onClose}
            className="transform hover:scale-105 transition-all duration-300"
          >
            Close
          </ModernButton>
        </div>

        {/* GDPR Compliance Notice */}
        <div className="mt-4 text-xs text-text-muted text-center bg-background-secondary rounded-2xl p-3">
          <Shield className="w-4 h-4 inline mr-1" />
          Reviews are anonymized to protect user privacy per EU GDPR regulations
        </div>
      </ModernCard>
    </div>
  );
}
