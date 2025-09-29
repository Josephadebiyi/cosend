import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Package, User, ChevronRight } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';

export default function Monitor() {
  const navigate = useNavigate();
  const [userPackages] = useState([
    {
      id: 1,
      trackingNumber: '#KA08J9192',
      status: 'In Transit',
      route: 'USA → Canada',
      eta: '25 March, 2024',
      progress: 75,
      avatar: '🚛',
    },
    {
      id: 2,
      trackingNumber: '#KA089B192',
      status: 'Delivered',
      route: 'USA → India',
      eta: '5 March, 2024',
      progress: 100,
      avatar: '📦',
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="main-content">
        {/* Header */}
        <div className="bg-background container-responsive py-8 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-accent rounded-sm"></div>
              <div className="w-3 h-3 bg-accent rounded-sm ml-1"></div>
            </div>
            <div className="w-10 h-10 bg-background-secondary rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-text-secondary" />
            </div>
          </div>
        </div>

        <div className="container-responsive -mt-6">
        {/* Monitor Section with 3D Background */}
        <ModernCard className="mb-8 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white min-h-[400px]">
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/monitor-dashboard-3d.png"
              alt="3D Monitor Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-2">Monitor</h1>
            
            <div className="mt-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Your</h2>
              <h2 className="text-2xl font-bold text-white">Package's</h2>
            </div>

            {/* Floating Package Cards */}
            <div className="space-y-4 mb-8">
              {userPackages.slice(0, 2).map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => navigate(`/tracking-page`)}
                  style={{
                    transform: `translateX(${index * 20}px) translateY(${index * 10}px)`,
                    animation: `float 3s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">{pkg.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{pkg.trackingNumber}</div>
                        <div className="text-white/70 text-xs">{pkg.route}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50" />
                  </div>
                </div>
              ))}
            </div>

            <ModernButton
              variant="primary"
              fullWidth
              onClick={() => navigate('/tracking-page')}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
            >
              Start Tracking
              <ArrowRight className="w-4 h-4 ml-2" />
            </ModernButton>
          </div>
        </ModernCard>

        {/* Account Section */}
        <ModernCard className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-secondary mb-1">Have an account?</div>
              <div className="font-semibold text-text-primary">Log In</div>
            </div>
            <ModernButton
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Log In
            </ModernButton>
          </div>
        </ModernCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <ModernButton
            variant="secondary"
            fullWidth
            onClick={() => navigate('/parcels-new')}
            className="py-6"
          >
            <Package className="w-6 h-6 mb-2" />
            <span className="text-sm">View Parcels</span>
          </ModernButton>
          <ModernButton
            variant="outline"
            fullWidth
            onClick={() => navigate('/profile')}
            className="py-6"
          >
            <User className="w-6 h-6 mb-2" />
            <span className="text-sm">Profile</span>
          </ModernButton>
        </div>
      </div>

        <ModernBottomNavigation />
      </div>
    </div>
  );
}
