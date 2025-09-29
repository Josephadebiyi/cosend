import { useState, useRef, useEffect } from 'react';
import { Bell, X, Package, DollarSign, User } from 'lucide-react';
import { useTranslation } from '@/react-app/utils/i18n';

interface NotificationItem {
  id: string;
  type: 'traveler' | 'parcel' | 'payment' | 'general';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationPopup() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'traveler',
      title: 'New Traveler Nearby',
      description: 'Sarah M. is traveling London → Paris tomorrow',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'parcel',
      title: 'Parcel Status Update',
      description: 'Your parcel #12313546123 is now in transit',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      description: 'You earned €18.56 from delivery to Paris',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'traveler': return <User className="w-4 h-4" />;
      case 'parcel': return <Package className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl hover:bg-background-hover transition-colors relative back-button"
      >
        <Bell size={20} className="text-text-primary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute top-12 right-0 w-80 notification-popup rounded-2xl p-4 z-50 animate-fade-in-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text-primary">{t('notifications.title')}</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {t('notifications.mark_all_read')}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-background-hover rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`notification-item p-3 rounded-xl cursor-pointer ${
                    !notification.read ? 'bg-accent/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === 'traveler' ? 'bg-primary/20 text-primary' :
                      notification.type === 'parcel' ? 'bg-accent/20 text-accent' :
                      notification.type === 'payment' ? 'bg-green-500/20 text-green-500' :
                      'bg-background-grey text-text-secondary'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm ${
                          !notification.read ? 'text-text-primary' : 'text-text-secondary'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-50" />
                <p className="text-text-muted text-sm">{t('notifications.no_notifications')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border-light mt-4 pt-3">
            <button className="w-full text-center text-primary text-sm font-medium hover:underline">
              {t('notifications.view_all')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
