import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, MapPin, Search, Eye, HelpCircle } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';

interface TrackingData {
  trackingNumber: string;
  status: string;
  fromLocation: string;
  toLocation: string;
  progress: number;
  pickupDate: string;
  deliveryDate: string;
  liveTracking: boolean;
}

export default function Tracking() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);

  const mockTrackingData: TrackingData = {
    trackingNumber: '#KA08J9192',
    status: 'In Transit',
    fromLocation: 'USA',
    toLocation: 'Canada',
    progress: 65,
    pickupDate: '23 Feb, 2024',
    deliveryDate: '25 Feb, 2024',
    liveTracking: true,
  };

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {!trackingData ? (
        // Search Interface
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pt-12">
            <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Enter Tracking Number</div>
            </div>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="e.g., #KA08J9192"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="w-full bg-white/10 backdrop-blur-sm rounded-2xl pl-12 pr-16 py-4 text-white placeholder-white/50 border border-white/20 focus:border-white/50 focus:outline-none text-lg"
              />
              <button 
                onClick={handleTrack}
                disabled={loading || !trackingNumber.trim()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Eye className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
            
            <div className="text-center">
              <div className="text-white/70 text-lg">Track parcels sent via COSEND</div>
            </div>
          </div>
        </div>
      ) : (
        // Tracking Interface - Exact Match to Screenshot  
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
          {/* Header Icons */}
          <div className="absolute top-14 left-6 right-6 flex justify-between z-20">
            <button onClick={() => setTrackingData(null)} className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tracking Title */}
          <div className="absolute top-32 left-6 z-20">
            <h1 className="text-white text-5xl font-bold">Tracking</h1>
          </div>

          {/* Circular Route Path */}
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="relative w-80 h-80">
              {/* White curved path */}
              <div className="absolute inset-0">
                <svg width="320" height="320" viewBox="0 0 320 320" className="w-full h-full">
                  {/* Curved white path from left to right */}
                  <path
                    d="M 60 160 Q 160 80 260 160"
                    stroke="white"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Dashed circle for reference */}
                  <circle
                    cx="160"
                    cy="160"
                    r="80"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                </svg>
              </div>

              {/* Start Point - Package Icon (left side) */}
              <div className="absolute" style={{ top: '50%', left: '20px', transform: 'translateY(-50%)' }}>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border-4 border-white">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* End Point - Location Pin (right side) */}
              <div className="absolute" style={{ top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border-4 border-white">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Current Position - Green Dot (on the curve) */}
              <div className="absolute" style={{ top: '25%', right: '30%', transform: 'translate(50%, -50%)' }}>
                <div className="w-5 h-5 bg-accent rounded-full border-2 border-white"></div>
              </div>

              {/* Status Info - Centered in the circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 text-center z-20">
                <div className="text-white text-2xl font-bold mb-1">{trackingData.status}</div>
                <div className="text-white/90 text-base mb-3">{trackingData.trackingNumber}</div>
                
                {/* Live Tracking Button - Smaller and centered */}
                <div className="bg-accent text-black px-5 py-2 rounded-full font-semibold text-sm">
                  Live Tracking
                </div>
              </div>
            </div>
          </div>

          

          {/* Delivery Details Card */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-t-3xl p-6" style={{ height: '160px' }}>
            <h3 className="text-xl font-bold text-black mb-4">Delivery Details</h3>
            
            {/* Progress Bar with Package Icon and Green Stripes */}
            <div className="flex items-center mb-4">
              <div className="flex-1 relative">
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full relative overflow-hidden" style={{ width: '65%' }}>
                    {/* Green diagonal stripes */}
                    <div 
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px)'
                      }}
                    ></div>
                  </div>
                </div>
                {/* Package icon on progress bar */}
                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '65%', marginLeft: '-12px' }}>
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <Package className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex justify-between text-base text-gray-600">
              <div>
                <div className="font-semibold">{trackingData.pickupDate}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{trackingData.deliveryDate}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModernBottomNavigation />
    </div>
  );
}
