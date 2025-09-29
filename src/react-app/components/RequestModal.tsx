import { useState } from 'react';
import { X, Package, DollarSign, FileText, AlertTriangle, Shield } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';
import PillInput from './PillInput';
import PillSelect from './PillSelect';
import PlatformMessage from './PlatformMessage';
import { calculateShippingPrice, PRICING } from '@/shared/types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  traveler: {
    id: number;
    name: string;
    avatar: string;
    route: string;
    date: string;
    availableKg: number;
    price: number;
  };
  onSubmit: (requestData: any) => void;
}

const PARCEL_TYPES = [
  { value: 'documents', label: 'Documents' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fragile', label: 'Fragile Items' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'books', label: 'Books' },
  { value: 'gifts', label: 'Small Gifts' },
  { value: 'other', label: 'Other' },
];

const VALUE_RANGES = [
  { value: '0-50', label: '€0 - €50' },
  { value: '51-100', label: '€51 - €100' },
  { value: '101-250', label: '€101 - €250' },
  { value: '251-500', label: '€251 - €500' },
  { value: '501-1000', label: '€501 - €1,000' },
  { value: '1000+', label: 'Over €1,000' },
];

export default function RequestModal({ 
  isOpen, 
  onClose, 
  traveler, 
  onSubmit 
}: RequestModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    parcelType: '',
    weight: 1,
    description: '',
    declaredValue: '',
    pickupAddress: '',
    deliveryAddress: '',
    specialInstructions: '',
    agreedToTerms: false,
    agreedToScreening: false,
    includeInsurance: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  if (!isOpen) return null;

  const calculateCost = () => {
    return calculateShippingPrice(formData.weight, formData.includeInsurance);
  };

  const costs = calculateCost();

  const canProceedStep1 = formData.parcelType && formData.weight > 0 && formData.description && formData.declaredValue;
  const canProceedStep2 = formData.pickupAddress && formData.deliveryAddress;
  const canSubmit = canProceedStep2 && formData.agreedToTerms && formData.agreedToScreening;

  const handleNext = () => {
    if (currentStep === 1 && canProceedStep1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && canProceedStep2) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    if (canSubmit) {
      // Generate tracking number
      const trackingNumber = `CS${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      onSubmit({
        ...formData,
        travelerId: traveler.id,
        estimatedCost: costs.total,
        trackingNumber,
        status: 'pending_acceptance',
        requestDate: new Date().toISOString(),
      });
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-text-primary mb-4">Package Details</h3>
      
      <PillSelect
        icon={Package}
        placeholder="What are you sending?"
        value={formData.parcelType}
        onChange={(value) => setFormData({ ...formData, parcelType: value })}
        options={PARCEL_TYPES}
      />

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Weight: {formData.weight}kg
        </label>
        <input
          type="range"
          min="0.5"
          max={Math.min(traveler.availableKg, 20)}
          step="0.1"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
          className="w-full h-2 bg-background-secondary rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-text-muted mt-1">
          <span>0.5kg</span>
          <span>{Math.min(traveler.availableKg, 20)}kg max</span>
        </div>
      </div>

      <PillInput
        icon={FileText}
        placeholder="Detailed description of contents"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
      />

      <PillSelect
        icon={DollarSign}
        placeholder="Declared value"
        value={formData.declaredValue}
        onChange={(value) => setFormData({ ...formData, declaredValue: value })}
        options={VALUE_RANGES}
      />

      <div className="space-y-4">
        <label className="flex items-start p-4 bg-background-secondary rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeInsurance}
            onChange={(e) => setFormData({ ...formData, includeInsurance: e.target.checked })}
            className="mt-1 mr-3 accent-primary"
          />
          <div className="text-sm">
            <div className="font-semibold text-text-primary mb-1">
              Add Optional Insurance (€{PRICING.OPTIONAL_INSURANCE_PER_KG}/kg)
            </div>
            <div className="text-text-secondary text-xs">
              Protect your package with additional coverage: €{(formData.weight * PRICING.OPTIONAL_INSURANCE_PER_KG).toFixed(2)} total
            </div>
          </div>
        </label>
      </div>

      <div className="bg-error/10 border border-error/20 rounded-2xl p-4">
        <div className="flex items-center text-error mb-2">
          <AlertTriangle className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">Important Legal Notice</span>
        </div>
        <p className="text-xs text-text-secondary">
          Sending illegal substances, prohibited items, or providing false declarations is strictly forbidden and may result in criminal prosecution under EU law.
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-text-primary mb-4">Delivery Details</h3>
      
      <PillInput
        icon={Package}
        placeholder="Pickup address (full address required)"
        value={formData.pickupAddress}
        onChange={(value) => setFormData({ ...formData, pickupAddress: value })}
      />

      <PillInput
        icon={Package}
        placeholder="Delivery address (full address required)"
        value={formData.deliveryAddress}
        onChange={(value) => setFormData({ ...formData, deliveryAddress: value })}
      />

      <PillInput
        icon={FileText}
        placeholder="Special instructions (optional)"
        value={formData.specialInstructions}
        onChange={(value) => setFormData({ ...formData, specialInstructions: value })}
      />

      <ModernCard className="gradient-primary text-white">
        <h4 className="font-bold mb-3">💰 Pricing Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Fixed rate ({formData.weight}kg × €{PRICING.SENDER_RATE_PER_KG})</span>
            <span>€{costs.basePrice.toFixed(2)}</span>
          </div>
          {formData.includeInsurance && (
            <div className="flex justify-between">
              <span>Insurance ({formData.weight}kg × €{PRICING.OPTIONAL_INSURANCE_PER_KG})</span>
              <span>€{costs.insurance.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-white/20 pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>You Pay</span>
              <span>€{costs.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </ModernCard>

      <PlatformMessage className="mt-4" />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-text-primary mb-4">Terms & Conditions</h3>
      
      <div className="space-y-4">
        <label className="flex items-start p-4 bg-background-secondary rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            className="mt-1 mr-3 accent-primary"
          />
          <div className="text-sm">
            <div className="font-semibold text-text-primary mb-1">
              I agree to the Terms & Conditions and Privacy Policy
            </div>
            <div className="text-text-secondary text-xs">
              By checking this box, you agree to our EU GDPR compliant terms and acknowledge liability for package contents.
            </div>
          </div>
        </label>

        <label className="flex items-start p-4 bg-background-secondary rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedToScreening}
            onChange={(e) => setFormData({ ...formData, agreedToScreening: e.target.checked })}
            className="mt-1 mr-3 accent-primary"
          />
          <div className="text-sm">
            <div className="font-semibold text-text-primary mb-1">
              I understand package screening requirements
            </div>
            <div className="text-text-secondary text-xs">
              Travelers may inspect packages for safety and legal compliance. Refusing inspection will void the delivery request.
            </div>
          </div>
        </label>
      </div>

      <button
        onClick={() => setShowTerms(true)}
        className="w-full text-primary text-sm underline hover:text-primary/80 transition-colors"
      >
        Read Full Terms & Conditions and Privacy Policy
      </button>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center text-primary mb-2">
          <Shield className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">EU Legal Protection</span>
        </div>
        <p className="text-xs text-text-secondary">
          This service operates under EU regulations. Both parties are protected by consumer rights and digital services legislation.
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Send Request</h2>
            <p className="text-sm text-text-secondary">
              To {traveler.name} • {traveler.route}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-text-muted">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-background-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex space-x-3 mt-6">
          {currentStep > 1 && (
            <ModernButton
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Back
            </ModernButton>
          )}
          {currentStep < 3 ? (
            <ModernButton
              variant="primary"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2)
              }
              className="flex-1"
            >
              Continue
            </ModernButton>
          ) : (
            <ModernButton
              variant="primary"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1"
            >
              Send Request
            </ModernButton>
          )}
        </div>
      </ModernCard>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <ModernCard className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">Terms & Conditions</h3>
              <button 
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <X className="w-5 h-5 text-text-primary" />
              </button>
            </div>
            
            <div className="text-sm text-text-secondary space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">1. Package Screening Requirements</h4>
                <p>All travelers are required to inspect packages for safety and legal compliance. This includes checking for prohibited items such as:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Illegal substances or drugs</li>
                  <li>Weapons or dangerous items</li>
                  <li>Counterfeit goods</li>
                  <li>Perishable or hazardous materials</li>
                  <li>Items that violate EU import/export regulations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">2. Legal Compliance</h4>
                <p>This service operates under EU regulations including GDPR, Digital Services Act, and cross-border transport laws. Users must comply with all applicable national and international laws.</p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">3. Liability Protection</h4>
                <p>COSEND acts as a platform facilitator. We are not liable for package contents, delivery delays, or disputes between users. Insurance coverage is recommended for valuable items.</p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">4. User Safety</h4>
                <p>All communication must remain within the platform. Sharing personal contact information may result in account suspension for user protection.</p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">5. KYC Requirements</h4>
                <p>All users must complete identity verification before using delivery services. This helps ensure safety and legal compliance.</p>
              </div>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
}
