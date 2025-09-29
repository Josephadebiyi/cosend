import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, Camera, User, MapPin, CreditCard, CheckCircle, Shield, FileText, Home, Phone } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillInput from '@/react-app/components/PillInput';
import PillSelect from '@/react-app/components/PillSelect';
import { useTranslation } from '@/react-app/utils/i18n';
import { COUNTRIES } from '@/react-app/utils/countries';

export default function KYC() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    streetNumber: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    idType: 'passport',
    idNumber: '',
    idDocument: null as File | null,
    selfiePhoto: null as File | null,
  });

  const handleFileUpload = (type: 'idDocument' | 'selfiePhoto', file: File) => {
    setFormData({ ...formData, [type]: file });
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.address && 
               formData.streetNumber && formData.city && formData.postalCode && formData.country;
      case 2:
        return formData.idType && formData.idNumber && formData.idDocument;
      case 3:
        return formData.selfiePhoto;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('KYC data submitted:', formData);
    // Process KYC submission
    localStorage.setItem('kyc_completed', 'true');
    navigate('/');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t('kyc.personal_info');
      case 2: return t('kyc.document_verification');
      case 3: return t('kyc.identity_confirmation');
      default: return t('kyc.title');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-background border-b border-border-light">
        <button onClick={() => navigate(-1)} className="p-3 back-button">
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{t('kyc.title')}</div>
          <div className="text-sm text-text-secondary">{getStepTitle()}</div>
        </div>
        <div className="w-12 h-12"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-background">
        <div className="w-full bg-border-light rounded-full h-2 mb-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
        <div className="text-center text-text-secondary text-sm">Step {currentStep} of 3</div>
      </div>

      <div className="px-6 py-6">
        {/* EU Compliance Notice */}
        <ModernCard className="mb-6 bg-primary/10 border-primary/20">
          <div className="flex items-center text-primary mb-3">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-semibold">EU ISO Standards Compliance</span>
          </div>
          <p className="text-text-secondary text-sm">
            Your personal data is processed according to EU ISO 27001 standards for maximum security and privacy protection. All information is encrypted and stored securely.
          </p>
        </ModernCard>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <ModernCard className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary text-lg">{t('kyc.personal_info')}</h3>
            </div>
            <div className="space-y-4">
              <PillInput
                icon={User}
                placeholder={t('kyc.full_name')}
                value={formData.fullName}
                onChange={(value) => setFormData({ ...formData, fullName: value })}
              />
              
              <PillInput
                icon={User}
                placeholder={t('kyc.date_of_birth')}
                type="date"
                value={formData.dateOfBirth}
                onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">Complete Address</label>
                <PillInput
                  icon={Home}
                  placeholder={t('kyc.street_address')}
                  value={formData.address}
                  onChange={(value) => setFormData({ ...formData, address: value })}
                />
                <PillInput
                  icon={MapPin}
                  placeholder={t('kyc.street_number')}
                  value={formData.streetNumber}
                  onChange={(value) => setFormData({ ...formData, streetNumber: value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <PillInput
                  icon={MapPin}
                  placeholder={t('kyc.city')}
                  value={formData.city}
                  onChange={(value) => setFormData({ ...formData, city: value })}
                />
                <PillInput
                  icon={MapPin}
                  placeholder={t('kyc.postal_code')}
                  value={formData.postalCode}
                  onChange={(value) => setFormData({ ...formData, postalCode: value })}
                />
              </div>
              
              <PillSelect
                icon={MapPin}
                placeholder={t('kyc.country')}
                value={formData.country}
                onChange={(value) => setFormData({ ...formData, country: value })}
                options={COUNTRIES.map(country => ({ 
                  value: country.code, 
                  label: country.name,
                  flag: country.flag 
                }))}
              />

              <PillInput
                icon={Phone}
                placeholder={t('kyc.phone_number')}
                type="tel"
                inputMode="numeric"
                value={formData.phoneNumber}
                onChange={(value) => setFormData({ ...formData, phoneNumber: value.replace(/[^0-9+\-\s]/g, '') })}
              />
            </div>
          </ModernCard>
        )}

        {/* Step 2: Document Verification */}
        {currentStep === 2 && (
          <ModernCard className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white text-lg">Document Verification</h3>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-4">
              <div className="flex items-center text-primary mb-2">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">EU ISO Standards Compliance</span>
              </div>
              <p className="text-text-secondary text-xs">
                All documents are processed according to EU ISO 27001 standards for data security and privacy protection.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">{t('kyc.id_type')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-4 bg-background-secondary rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors border-2 border-transparent hover:border-primary/30">
                    <input
                      type="radio"
                      value="passport"
                      checked={formData.idType === 'passport'}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                      className="mr-3 accent-primary"
                    />
                    <span className="text-text-primary">{t('kyc.passport')}</span>
                  </label>
                  <label className="flex items-center p-4 bg-background-secondary rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors border-2 border-transparent hover:border-primary/30">
                    <input
                      type="radio"
                      value="id_card"
                      checked={formData.idType === 'id_card'}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                      className="mr-3 accent-primary"
                    />
                    <span className="text-text-primary">{t('kyc.national_id')}</span>
                  </label>
                </div>
              </div>

              <PillInput
                icon={CreditCard}
                placeholder="ID Number"
                value={formData.idNumber}
                onChange={(value) => setFormData({ ...formData, idNumber: value })}
              />

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">{t('kyc.upload_document')}</label>
                <div 
                  className="w-full h-40 bg-background-secondary rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => document.getElementById('id-input')?.click()}
                >
                  {formData.idDocument ? (
                    <div className="flex items-center text-primary">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      <span className="text-sm font-semibold">Document uploaded</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-text-muted mb-2" />
                      <span className="text-text-secondary text-sm text-center">
                        Upload {formData.idType === 'passport' ? t('kyc.passport') : t('kyc.national_id')}<br />
                        <span className="text-xs text-text-muted">Clear photo, all corners visible</span>
                      </span>
                    </>
                  )}
                </div>
                <input
                  id="id-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>
          </ModernCard>
        )}

        {/* Step 3: Identity Confirmation */}
        {currentStep === 3 && (
          <ModernCard className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white text-lg">Identity Confirmation</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">{t('kyc.upload_selfie')}</label>
                <div 
                  className="w-full h-40 bg-background-secondary rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => document.getElementById('selfie-input')?.click()}
                >
                  {formData.selfiePhoto ? (
                    <div className="flex items-center text-primary">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      <span className="text-sm font-semibold">Selfie uploaded</span>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-text-muted mb-2" />
                      <span className="text-text-secondary text-sm text-center">
                        {t('kyc.upload_selfie')}<br />
                        <span className="text-xs text-text-muted">Clear face photo, well-lit, no filters</span>
                      </span>
                    </>
                  )}
                </div>
                <input
                  id="selfie-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('selfiePhoto', e.target.files[0])}
                  className="hidden"
                />
                <div className="bg-background-light rounded-2xl p-3 mt-3">
                  <p className="text-xs text-text-secondary">
                    <strong>Requirements:</strong> Face clearly visible, good lighting, no sunglasses or hats, neutral expression. Photo will be processed according to EU biometric standards.
                  </p>
                </div>
              </div>
            </div>
          </ModernCard>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentStep > 1 && (
            <ModernButton variant="outline" onClick={prevStep} className="flex-1">
              {t('common.previous')}
            </ModernButton>
          )}
          <ModernButton 
            variant="primary" 
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="flex-1"
          >
            {currentStep === 3 ? t('common.submit') + ' Verification' : t('common.next')}
          </ModernButton>
        </div>

        {/* Verification Note */}
        <ModernCard className="mt-6 bg-background-light border-border-light">
          <p className="text-sm text-text-secondary">
            <strong>Note:</strong> KYC verification typically takes 1-2 business days. You'll receive an email once your verification is complete and your account is activated.
          </p>
        </ModernCard>
      </div>
    </div>
  );
}
