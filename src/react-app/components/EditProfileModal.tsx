import { useState } from 'react';
import { X, Camera, User, Mail, Phone } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillInput from '@/react-app/components/PillInput';
import { useTranslation } from '@/react-app/utils/i18n';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  onSave: (profile: {
    name: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
  }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: EditProfileModalProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(currentProfile);
  const [imagePreview, setImagePreview] = useState(currentProfile.avatar || '');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      ...profile,
      avatar: imagePreview,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <ModernCard className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary">{t('profile.edit_profile')}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-2xl transition-colors back-button"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-background-secondary border-4 border-border-light">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>
              <button
                onClick={() => document.getElementById('profile-image-input')?.click()}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-text-secondary mt-3">{t('profile.change_photo')}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                {t('profile.full_name')}
              </label>
              <PillInput
                icon={User}
                placeholder={t('profile.full_name')}
                value={profile.name}
                onChange={(value) => setProfile({ ...profile, name: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                {t('profile.username')}
              </label>
              <PillInput
                icon={User}
                placeholder={t('profile.username')}
                value={profile.username}
                onChange={(value) => setProfile({ ...profile, username: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                {t('profile.email')}
              </label>
              <PillInput
                icon={Mail}
                placeholder={t('profile.email')}
                type="email"
                value={profile.email}
                onChange={(value) => setProfile({ ...profile, email: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                {t('profile.phone')}
              </label>
              <PillInput
                icon={Phone}
                placeholder={t('profile.phone')}
                type="tel"
                inputMode="numeric"
                value={profile.phone}
                onChange={(value) => setProfile({ ...profile, phone: value.replace(/[^0-9+\-\s]/g, '') })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <ModernButton 
              variant="outline" 
              fullWidth 
              onClick={onClose}
            >
              {t('common.cancel')}
            </ModernButton>
            <ModernButton 
              variant="primary" 
              fullWidth 
              onClick={handleSave}
              disabled={!profile.name.trim() || !profile.email.trim()}
            >
              {t('common.save')}
            </ModernButton>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}
