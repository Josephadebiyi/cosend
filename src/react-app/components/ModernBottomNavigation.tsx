import { useLocation, useNavigate } from 'react-router';
import { Package, Wallet, User, Search, Home } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Search, label: 'Track', path: '/track' },
  { icon: Package, label: 'Parcels', path: '/parcels-new' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function ModernBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bottom-nav z-50">
      <div className="flex justify-around items-center py-3 px-2 max-w-md mx-auto relative">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'active' : ''} flex-1`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
