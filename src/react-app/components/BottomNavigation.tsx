import { useLocation, useNavigate } from 'react-router';
import { Home, Package, Plus, Wallet, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Package, label: 'Parcels', path: '/parcels' },
  { icon: Plus, label: 'Add', path: '/add' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-card backdrop-blur-xl border-t border-dark shadow-dark z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-accent bg-dark-surface glow-accent'
                  : 'text-white-60 hover:text-white-80 hover:bg-dark-surface'
              }`}
            >
              <Icon size={24} className={isActive ? 'mb-1' : 'mb-1'} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
