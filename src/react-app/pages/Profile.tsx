import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Settings, HelpCircle, LogOut, ChevronRight, ArrowLeft, Package, Gift, Moon, Bell, Globe, CheckCircle, Edit } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import ReferralSystem from '@/react-app/components/ReferralSystem';
import ThemeToggle from '@/react-app/components/ThemeToggle';
import EditProfileModal from '@/react-app/components/EditProfileModal';
import { useTranslation } from '@/react-app/utils/i18n';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { t, setLanguage, currentLanguage } = useTranslation();
  
  const [user, setUser] = useState({
    name: authUser?.google_user_data?.name || 'User',
    email: authUser?.email || 'user@example.com',
    phone: '+44 7700 123456',
    userId: `@${authUser?.id?.slice(0, 6) || 'AB221'}`,
    rating: 4.8,
    totalDeliveries: 12,
    packagesSent: 6,
    packagesReceived: 12,
    verified: true,
    kycCompleted: true,
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  });

  const [showReferral, setShowReferral] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    {
      icon: Shield,
      label: 'Verification & KYC',
      description: user.kycCompleted ? 'ID and phone verified' : 'Complete your verification',
      action: () => navigate('/kyc'),
      status: user.kycCompleted ? 'Verified' : 'Pending',
      statusColor: user.kycCompleted ? 'status-success' : 'status-warning',
    },
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Privacy, notifications, security',
      action: () => {},
    },
    {
      icon: Globe,
      label: 'Language & Region',
      description: `${LANGUAGES.find(l => l.code === currentLanguage)?.name || 'English'}`,
      action: () => setShowLanguageModal(true),
    },
    {
      icon: Gift,
      label: 'Referral Program',
      description: 'Earn €5 per friend referral',
      action: () => setShowReferral(!showReferral),
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'FAQs, contact us',
      action: () => navigate('/support'),
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      description: 'Log out of your account',
      action: async () => {
        try {
          await logout();
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userEmail');
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
          // Fallback to local logout
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userEmail');
          navigate('/login');
        }
      },
      danger: true,
    },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setShowLanguageModal(false);
  };

  const handleProfileSave = (updatedProfile: any) => {
    setUser({ ...user, ...updatedProfile });
    console.log('Profile updated:', updatedProfile);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-6 py-8 pt-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center shadow-soft hover:shadow-medium transition-all back-button"
            >
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">{t('profile.title')}</h1>
            <div className="w-12"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Profile Header */}
        <ModernCard className="mb-6 gradient-primary text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full animate-float"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto shadow-elevated backdrop-blur-sm overflow-hidden">
                <img 
                  src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-elevated hover:scale-110 transition-transform"
              >
                <Edit className="w-4 h-4 text-white" />
              </button>
              {user.verified && (
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-text-on-primary mb-2">{user.name}</h2>
            <p className="text-text-on-primary/70 text-sm mb-2">{user.userId}</p>
            
            {user.kycCompleted && (
              <div className="inline-flex items-center bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t('profile.kyc_verified')}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-text-on-primary">{user.packagesReceived}</div>
                <div className="text-text-on-primary/70 text-sm">{t('profile.packages_received')}</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-text-on-primary">{user.packagesSent}</div>
                <div className="text-text-on-primary/70 text-sm">{t('profile.packages_sent')}</div>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Settings Toggles */}
        <ModernCard className="mb-6">
          <h3 className="font-semibold text-text-primary text-lg mb-4">Quick Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background-secondary rounded-2xl hover:bg-primary/5 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-text-primary">Dark Mode</span>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between p-4 bg-background-secondary rounded-2xl hover:bg-primary/5 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium text-text-primary">Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`toggle-switch ${notifications ? 'active' : ''}`}
              />
            </div>
          </div>
        </ModernCard>

        {/* Referral System */}
        {showReferral && (
          <div className="mb-6">
            <ReferralSystem />
          </div>
        )}

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          currentProfile={{
            name: user.name,
            username: user.userId,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
          }}
          onSave={handleProfileSave}
        />

        {/* Menu Items */}
        <ModernCard className="mb-6">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button 
                key={index} 
                onClick={item.action} 
                className="w-full p-4 rounded-2xl hover:bg-background-secondary transition-all interactive"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                      item.danger ? 'bg-error/20' : 'bg-primary/20'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.danger ? 'text-error' : 'text-primary'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className={`font-semibold ${item.danger ? 'text-error' : 'text-text-primary'}`}>
                        {item.label}
                      </div>
                      <div className="text-sm text-text-secondary">{item.description}</div>
                      {item.status && (
                        <div className={`text-xs font-medium mt-1 ${item.statusColor}`}>
                          {item.status}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              </button>
            ))}
          </div>
        </ModernCard>

        {/* App Info */}
        <ModernCard variant="secondary" className="text-center">
          <div className="text-sm text-text-secondary">
            <p className="font-semibold text-text-primary mb-1">COSEND v1.0.0</p>
            <p>Made with ❤️ for EU travelers</p>
          </div>
        </ModernCard>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <ModernCard className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">{t('profile.language_region')}</h3>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center p-4 rounded-2xl transition-all ${
                    currentLanguage === language.code
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-background-secondary hover:bg-primary/5 border-2 border-transparent'
                  }`}
                >
                  <span className="text-2xl mr-4">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-text-primary">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border-light">
              <ModernButton 
                variant="outline" 
                fullWidth 
                onClick={() => setShowLanguageModal(false)}
              >
                Cancel
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      )}

      <ModernBottomNavigation />
    </div>
  );
}
