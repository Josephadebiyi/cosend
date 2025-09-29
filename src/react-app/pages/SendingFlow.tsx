import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, Globe, MapPin, ArrowLeft, ChevronRight, FileText, Sparkles } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillSelect from '@/react-app/components/PillSelect';
import PillInput from '@/react-app/components/PillInput';
import { calculateShippingPrice, PRICING } from '@/shared/types';

interface SendingFormData {
  sendingType: 'country' | 'city' | '';
  fromCountry: string;
  toCountry: string;
  fromCity: string;
  toCity: string;
  parcelType: string;
  weight: number;
  description: string;
}

const COUNTRIES = [
  { value: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'FR', label: 'France', flag: '🇫🇷' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪' },
  { value: 'ES', label: 'Spain', flag: '🇪🇸' },
  { value: 'IT', label: 'Italy', flag: '🇮🇹' },
  { value: 'NL', label: 'Netherlands', flag: '🇳🇱' },
  { value: 'BE', label: 'Belgium', flag: '🇧🇪' },
  { value: 'PT', label: 'Portugal', flag: '🇵🇹' },
  { value: 'AT', label: 'Austria', flag: '🇦🇹' },
  { value: 'CH', label: 'Switzerland', flag: '🇨🇭' },
  { value: 'DK', label: 'Denmark', flag: '🇩🇰' },
  { value: 'SE', label: 'Sweden', flag: '🇸🇪' },
  { value: 'NO', label: 'Norway', flag: '🇳🇴' },
  { value: 'FI', label: 'Finland', flag: '🇫🇮' },
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool', 'Bristol', 'Leeds', 'Glasgow'],
  'FR': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg'],
  'DE': ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dresden'],
  'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Málaga', 'Zaragoza', 'Granada'],
  'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Venice', 'Bologna', 'Palermo'],
  'NL': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Breda'],
  'BE': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Louvain'],
  'PT': ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Funchal', 'Aveiro', 'Évora', 'Faro'],
  'AT': ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt', 'Villach', 'Wels'],
  'CH': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'Lucerne', 'St. Gallen'],
  'DK': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens'],
  'SE': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg'],
  'NO': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Tromsø'],
  'FI': ['Helsinki', 'Tampere', 'Turku', 'Oulu', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori'],
};

const PARCEL_TYPES = [
  { value: 'documents', label: 'Documents' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fragile', label: 'Fragile Items' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'books', label: 'Books' },
  { value: 'gifts', label: 'Small Gifts' },
  { value: 'other', label: 'Other' },
];

export default function SendingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SendingFormData>({
    sendingType: '',
    fromCountry: '',
    toCountry: '',
    fromCity: '',
    toCity: '',
    parcelType: '',
    weight: 1,
    description: '',
  });

  const calculatePrice = (weight: number) => {
    return calculateShippingPrice(weight, false);
  };

  const priceCalc = calculatePrice(formData.weight);

  const canProceedStep1 = formData.sendingType !== '';
  const canProceedStep2 = formData.sendingType === 'country' 
    ? formData.fromCountry && formData.toCountry && formData.fromCity && formData.toCity
    : formData.fromCity && formData.toCity;
  const canProceedStep3 = formData.parcelType && formData.weight > 0;

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to traveler search with form data
      const params = new URLSearchParams({
        type: formData.sendingType,
        fromCountry: formData.fromCountry,
        toCountry: formData.toCountry,
        fromCity: formData.fromCity,
        toCity: formData.toCity,
        weight: formData.weight.toString(),
        parcelType: formData.parcelType,
      });
      navigate(`/search?${params.toString()}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Choose Sending Type';
      case 2: return 'Select Route';
      case 3: return 'Parcel Details';
      case 4: return 'Review & Confirm';
      default: return 'Sending';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <Sparkles className="w-8 h-8 text-white animate-float" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">How would you like to send?</h3>
        <p className="text-text-secondary text-sm">Choose the best option for your package delivery</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setFormData({ ...formData, sendingType: 'country' })}
          className={`w-full p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-elevated ${
            formData.sendingType === 'country'
              ? 'border-primary bg-primary/10 text-text-primary shadow-medium'
              : 'border-border-light bg-background-secondary text-text-primary hover:border-primary/50'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all ${
              formData.sendingType === 'country' ? 'bg-primary text-white' : 'bg-primary/20 text-primary'
            }`}>
              <Globe className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Country to Country</div>
              <div className="text-text-secondary text-sm">Choose specific cities within countries</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFormData({ ...formData, sendingType: 'city' })}
          className={`w-full p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-elevated ${
            formData.sendingType === 'city'
              ? 'border-primary bg-primary/10 text-text-primary shadow-medium'
              : 'border-border-light bg-background-secondary text-text-primary hover:border-primary/50'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all ${
              formData.sendingType === 'city' ? 'bg-primary text-white' : 'bg-primary/20 text-primary'
            }`}>
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">City to City</div>
              <div className="text-text-secondary text-sm">Direct city selection</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <MapPin className="w-8 h-8 text-white animate-float" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Select Your Route</h3>
        <p className="text-text-secondary text-sm">Where would you like to send your package?</p>
      </div>

      {formData.sendingType === 'country' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">From Country</label>
              <PillSelect
                icon={Globe}
                placeholder="Select country"
                value={formData.fromCountry}
                onChange={(value) => setFormData({ ...formData, fromCountry: value, fromCity: '' })}
                options={COUNTRIES}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">To Country</label>
              <PillSelect
                icon={Globe}
                placeholder="Select country"
                value={formData.toCountry}
                onChange={(value) => setFormData({ ...formData, toCountry: value, toCity: '' })}
                options={COUNTRIES}
              />
            </div>
          </div>

          {formData.fromCountry && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-semibold text-text-primary">From City</label>
              <PillSelect
                icon={MapPin}
                placeholder="Select city"
                value={formData.fromCity}
                onChange={(value) => setFormData({ ...formData, fromCity: value })}
                options={CITIES_BY_COUNTRY[formData.fromCountry]?.map(city => ({ value: city, label: city })) || []}
              />
            </div>
          )}

          {formData.toCountry && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-semibold text-text-primary">To City</label>
              <PillSelect
                icon={MapPin}
                placeholder="Select city"
                value={formData.toCity}
                onChange={(value) => setFormData({ ...formData, toCity: value })}
                options={CITIES_BY_COUNTRY[formData.toCountry]?.map(city => ({ value: city, label: city })) || []}
              />
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary">From City</label>
            <PillSelect
              icon={MapPin}
              placeholder="Select city"
              value={formData.fromCity}
              onChange={(value) => setFormData({ ...formData, fromCity: value })}
              options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary">To City</label>
            <PillSelect
              icon={MapPin}
              placeholder="Select city"
              value={formData.toCity}
              onChange={(value) => setFormData({ ...formData, toCity: value })}
              options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
            />
          </div>
        </div>
      )}

      {/* Route Visualization */}
      {formData.fromCity && formData.toCity && (
        <ModernCard className="gradient-primary relative overflow-hidden animate-bounce-in">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/network-new.png"
              alt="Route Network"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="text-lg font-bold mb-2">
              {formData.fromCity} → {formData.toCity}
            </div>
            <div className="text-sm opacity-80">Route selected successfully</div>
          </div>
        </ModernCard>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <Package className="w-8 h-8 text-white animate-float" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Parcel Details</h3>
        <p className="text-text-secondary text-sm">Tell us about your package</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-primary">Parcel Type</label>
        <PillSelect
          icon={Package}
          placeholder="What are you sending?"
          value={formData.parcelType}
          onChange={(value) => setFormData({ ...formData, parcelType: value })}
          options={PARCEL_TYPES}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Weight: {formData.weight}kg
        </label>
        <input
          type="range"
          min="0.5"
          max="20"
          step="0.1"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
          className="w-full h-3 bg-background-secondary rounded-full appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-text-secondary mt-2">
          <span>0.5kg</span>
          <span>10kg</span>
          <span>20kg max</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-primary">Description (Optional)</label>
        <PillInput
          icon={FileText}
          placeholder="Brief description of your package"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
        />
      </div>

      {/* Price Preview */}
      <ModernCard className="gradient-accent relative overflow-hidden">
        <div className="text-center text-black">
          <div className="text-3xl font-bold mb-1">€{priceCalc.total.toFixed(2)}</div>
          <div className="text-sm opacity-80">Estimated total cost</div>
        </div>
      </ModernCard>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <ChevronRight className="w-8 h-8 text-white animate-float" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Review & Confirm</h3>
        <p className="text-text-secondary text-sm">Double-check your details before proceeding</p>
      </div>

      <ModernCard className="bg-background-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        <h4 className="font-bold text-text-primary mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Route Summary
        </h4>
        <div className="space-y-3 text-text-secondary">
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="font-semibold text-text-primary">
              {formData.sendingType === 'country' ? 'Country to Country' : 'City to City'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>From:</span>
            <span className="font-semibold text-text-primary">{formData.fromCity}</span>
          </div>
          <div className="flex justify-between">
            <span>To:</span>
            <span className="font-semibold text-text-primary">{formData.toCity}</span>
          </div>
          <div className="flex justify-between">
            <span>Parcel:</span>
            <span className="font-semibold text-text-primary">{formData.parcelType} • {formData.weight}kg</span>
          </div>
        </div>
      </ModernCard>

      <ModernCard className="gradient-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/wallet-new.png"
            alt="Pricing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-black mb-4">💰 Pricing Breakdown</h4>
          <div className="space-y-2 text-black">
            <div className="flex justify-between text-sm">
              <span>Fixed rate ({formData.weight}kg × €{PRICING.SENDER_RATE_PER_KG})</span>
              <span className="font-semibold">€{priceCalc.basePrice.toFixed(2)}</span>
            </div>
            <div className="border-t border-black/20 pt-2 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>You Pay</span>
                <span>€{priceCalc.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 left-8 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 relative z-10">
        <button 
          onClick={prevStep} 
          className="p-3 hover:bg-background-hover rounded-2xl transition-all duration-300 hover:scale-110"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{getStepTitle()}</div>
          <div className="text-sm text-text-secondary">Step {currentStep} of 4</div>
        </div>
        <div className="w-12 h-12"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8 relative z-10">
        <div className="w-full bg-border-light rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>Type</span>
          <span>Route</span>
          <span>Details</span>
          <span>Review</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24 relative z-10">
        <ModernCard className="mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </ModernCard>

        <ModernButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={nextStep}
          disabled={
            (currentStep === 1 && !canProceedStep1) ||
            (currentStep === 2 && !canProceedStep2) ||
            (currentStep === 3 && !canProceedStep3)
          }
          className="transform hover:scale-105 transition-all duration-300 shadow-elevated"
        >
          {currentStep === 4 ? '🚀 Find Travelers' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </ModernButton>
      </div>
    </div>
  );
}
