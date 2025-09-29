import { Bell, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface ModernHeaderProps {
  title: string;
  showMenu?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
}

export default function ModernHeader({ 
  title, 
  showMenu = true, 
  showNotifications = true,
  showThemeToggle = false 
}: ModernHeaderProps) {
  return (
    <div className="bg-background border-b border-light px-4 py-4 flex items-center justify-between shadow-soft">
      <div className="flex items-center space-x-3">
        {showMenu && (
          <button className="p-2 hover:bg-background-light rounded-xl transition-colors">
            <Menu size={24} className="text-text-secondary" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {showThemeToggle && <ThemeToggle />}
        {showNotifications && (
          <button className="p-2 hover:bg-background-light rounded-xl transition-colors relative">
            <Bell size={24} className="text-text-secondary" />
            <span className="absolute -top-1 -right-1 bg-accent text-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
