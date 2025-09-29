import { useState } from 'react';
import { X, CheckCircle, Package, MapPin, Shield, AlertTriangle } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';
import PlatformMessage from './PlatformMessage';
import { PRICING } from '@/shared/types';

interface AcceptanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    sender: string;
    parcelType: string;
    weight: number;
    description: string;
    declaredValue: string;
    pickupAddress: string;
    deliveryAddress: string;
    route: string;
    payment: number;
    trackingNumber: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

export default function AcceptanceModal({ 
  isOpen, 
  onClose, 
  request, 
  onAccept, 
  onDecline 
}: AcceptanceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [screeningChecked, setScreeningChecked] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">New Delivery Request</h3>
        <p className="text-text-secondary text-sm">Review the package details carefully</p>
      </div>

      <ModernCard className="bg-background-secondary">
        <h4 className="font-semibold text-text-primary mb-3">Package Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Type:</span>
            <span className="font-medium text-text-primary">{request.parcelType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Weight:</span>
            <span className="font-medium text-text-primary">{request.weight}kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Value:</span>
            <span className="font-medium text-text-primary">{request.declaredValue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Package Value:</span>
            <span className="font-medium text-text-primary">{request.declaredValue}</span>
          </div>
        </div>
      </ModernCard>

      <ModernCard className="bg-background-secondary">
        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          Route Details
        </h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-text-secondary">Pickup:</span>
            <p className="font-medium text-text-primary mt-1">{request.pickupAddress}</p>
          </div>
          <div>
            <span className="text-text-secondary">Delivery:</span>
            <p className="font-medium text-text-primary mt-1">{request.deliveryAddress}</p>
          </div>
        </div>
      </ModernCard>

      <div className="bg-warning/10 border border-warning/20 rounded-xl p-3">
        <p className="text-sm text-text-secondary">
          <strong>Description:</strong> {request.description}
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Shield className="w-8 h-8 text-warning" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">Safety Requirements</h3>
        <p className="text-text-secondary text-sm">You must complete these safety checks</p>
      </div>

      <div className="space-y-4">
        <label className="flex items-start p-4 bg-background-secondary rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={screeningChecked}
            onChange={(e) => setScreeningChecked(e.target.checked)}
            className="mt-1 mr-3 accent-primary"
          />
          <div className="text-sm">
            <div className="font-semibold text-text-primary mb-1">
              Package Screening Completed
            </div>
            <div className="text-text-secondary text-xs">
              I have physically inspected the package contents and confirmed they comply with all legal requirements and safety regulations.
            </div>
          </div>
        </label>

        <label className="flex items-start p-4 bg-background-secondary rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 mr-3 accent-primary"
          />
          <div className="text-sm">
            <div className="font-semibold text-text-primary mb-1">
              Legal Compliance Agreement
            </div>
            <div className="text-text-secondary text-xs">
              I understand my legal obligations and accept responsibility for safe transport under EU regulations.
            </div>
          </div>
        </label>
      </div>

      <div className="bg-error/10 border border-error/20 rounded-xl p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-error mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-semibold text-error mb-1">Important Legal Notice</div>
            <p className="text-text-secondary text-xs">
              Accepting illegal items or failing to properly screen packages may result in criminal prosecution. 
              You are legally responsible for ensuring all items comply with local and international transport laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-black" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">Ready to Accept?</h3>
        <p className="text-text-secondary text-sm">Confirm your delivery commitment</p>
      </div>

      <ModernCard className="gradient-primary text-white text-center">
        <h4 className="font-bold mb-2">Delivery Summary</h4>
        <div className="text-2xl font-bold mb-1">€{(request.weight * PRICING.TRAVELER_PAYOUT_PER_KG).toFixed(2)}</div>
        <div className="text-sm opacity-80">Your guaranteed earnings</div>
        <div className="text-xs opacity-70 mt-2">
          Tracking: {request.trackingNumber}
        </div>
      </ModernCard>

      <div className="bg-success/10 border border-success/20 rounded-xl p-4">
        <div className="flex items-center text-success mb-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">Protected Transaction</span>
        </div>
        <p className="text-xs text-text-secondary">
          Your payment is guaranteed upon successful delivery confirmation. Both parties are protected by our secure platform.
        </p>
      </div>

      <div className="text-center text-xs text-text-muted">
        By accepting, you commit to completing this delivery within the agreed timeframe.
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-text-muted">Step {currentStep} of 3</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
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

        {/* Platform Message */}
        {currentStep === 3 && (
          <PlatformMessage variant="info" className="mb-6" />
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-3 mt-6">
          {currentStep === 1 && (
            <>
              <ModernButton
                variant="outline"
                onClick={onDecline}
                className="flex-1"
              >
                Decline
              </ModernButton>
              <ModernButton
                variant="primary"
                onClick={() => setCurrentStep(2)}
                className="flex-1"
              >
                Review Safety
              </ModernButton>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <ModernButton
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                Back
              </ModernButton>
              <ModernButton
                variant="primary"
                onClick={() => setCurrentStep(3)}
                disabled={!screeningChecked || !termsAccepted}
                className="flex-1"
              >
                Continue
              </ModernButton>
            </>
          )}
          
          {currentStep === 3 && (
            <>
              <ModernButton
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1"
              >
                Back
              </ModernButton>
              <ModernButton
                variant="primary"
                onClick={handleAccept}
                className="flex-1"
              >
                Accept Delivery
              </ModernButton>
            </>
          )}
        </div>
      </ModernCard>
    </div>
  );
}
