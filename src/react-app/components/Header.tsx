import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  showNotifications?: boolean;
}

export default function Header({ title, showMenu = true, showNotifications = true }: HeaderProps) {
  return (
    <div className="bg-dark-card backdrop-blur-xl border-b border-dark px-4 py-4 flex items-center justify-between shadow-dark">
      <div className="flex items-center space-x-3">
        {showMenu && (
          <button className="p-2 hover:bg-dark-surface rounded-lg transition-colors">
            <Menu size={24} className="text-white-80" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>
      
      {showNotifications && (
        <button className="p-2 hover:bg-dark-surface rounded-lg transition-colors relative">
          <Bell size={24} className="text-white-80" />
          <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            3
          </span>
        </button>
      )}
    </div>
  );
}
