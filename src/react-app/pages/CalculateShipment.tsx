import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, MapPin, Calculator, Flag, Globe } from 'lucide-react';
import { calculateShippingPrice, PRICING } from '@/shared/types';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillSelect from '@/react-app/components/PillSelect';
import PillInput from '@/react-app/components/PillInput';
// import { useTranslation } from '@/react-app/utils/i18n';

const COUNTRIES = [
  { value: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'FR', label: 'France', flag: '🇫🇷' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪' },
  { value: 'ES', label: 'Spain', flag: '🇪🇸' },
  { value: 'IT', label: 'Italy', flag: '🇮🇹' },
  { value: 'NL', label: 'Netherlands', flag: '🇳🇱' },
  { value: 'BE', label: 'Belgium', flag: '🇧🇪' },
  { value: 'PT', label: 'Portugal', flag: '🇵🇹' },
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
  'FR': ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
  'DE': ['Berlin', 'Munich', 'Hamburg', 'Cologne'],
  'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
  'IT': ['Rome', 'Milan', 'Naples', 'Turin'],
  'NL': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht'],
  'BE': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi'],
  'PT': ['Lisbon', 'Porto', 'Braga', 'Coimbra'],
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

export default function CalculateShipment() {
  const navigate = useNavigate();
  // const { t } = useTranslation();
  
  const [form, setForm] = useState({
    fromCountry: '',
    toCountry: '',
    fromCity: '',
    toCity: '',
    parcelType: '',
    weight: '1',
    value: '',
  });
  
  const [calculation, setCalculation] = useState<any>(null);

  const calculatePrice = (weight: number) => {
    const pricing = calculateShippingPrice(weight, parseFloat(form.value) > 0);
    
    return {
      basePrice: pricing.basePrice,
      travelerPayout: pricing.travelerPayout,
      insurance: pricing.insurance,
      total: pricing.total,
    };
  };

  const handleCalculate = () => {
    const weight = parseFloat(form.weight);
    if (!weight || weight <= 0) return;

    const mockDistance = Math.random() * 1000 + 200; // Mock distance between cities
    const pricing = calculatePrice(weight);
    
    setCalculation({
      ...pricing,
      distance: mockDistance,
      estimatedTime: '2-4 days',
      availableTravelers: Math.floor(Math.random() * 8) + 3,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-background border-b border-border-light">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 bg-background-card hover:bg-background-hover dark:bg-background-card dark:hover:bg-background-hover rounded-2xl flex items-center justify-center transition-colors shadow-soft"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary dark:text-text-primary" />
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">Calculate Shipment</div>
          <div className="text-sm text-text-secondary">Get instant pricing</div>
        </div>
        <div className="w-12 h-12"></div>
      </div>

      <div className="px-6 py-6">
        {/* Calculator Form */}
        <ModernCard className="mb-6 gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/shipping-interface-3d.png"
              alt="3D Shipping Calculator"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Shipment Calculator</h2>
              <p className="text-white/80">Get instant pricing for your parcel</p>
            </div>
          </div>
        </ModernCard>

        <ModernCard className="mb-6">
          <div className="space-y-6">
            <h3 className="font-semibold text-text-primary text-lg">Package Details</h3>
            
            {/* Route Selection */}
            <div className="grid grid-cols-2 gap-4">
              <PillSelect
                icon={Flag}
                placeholder="From Country"
                value={form.fromCountry}
                onChange={(value) => setForm({ ...form, fromCountry: value, fromCity: '' })}
                options={COUNTRIES}
              />
              <PillSelect
                icon={Flag}
                placeholder="To Country"
                value={form.toCountry}
                onChange={(value) => setForm({ ...form, toCountry: value, toCity: '' })}
                options={COUNTRIES}
              />
            </div>
            
            {form.fromCountry && (
              <PillSelect
                icon={MapPin}
                placeholder="From City"
                value={form.fromCity}
                onChange={(value) => setForm({ ...form, fromCity: value })}
                options={CITIES_BY_COUNTRY[form.fromCountry]?.map(city => ({ value: city, label: city })) || []}
              />
            )}
            
            {form.toCountry && (
              <PillSelect
                icon={MapPin}
                placeholder="To City"
                value={form.toCity}
                onChange={(value) => setForm({ ...form, toCity: value })}
                options={CITIES_BY_COUNTRY[form.toCountry]?.map(city => ({ value: city, label: city })) || []}
              />
            )}

            <PillSelect
              icon={Package}
              placeholder="Parcel type"
              value={form.parcelType}
              onChange={(value) => setForm({ ...form, parcelType: value })}
              options={PARCEL_TYPES}
            />

            <div className="grid grid-cols-2 gap-4">
              <PillInput
                icon={Package}
                placeholder="Weight (kg) - Max 20kg"
                value={form.weight}
                onChange={(value) => {
                  const cleanValue = value.replace(/[^0-9.]/g, '');
                  const numValue = parseFloat(cleanValue);
                  if (isNaN(numValue) || numValue <= 20) {
                    setForm({ ...form, weight: cleanValue });
                  }
                }}
                type="text"
                inputMode="decimal"
              />
              <PillInput
                icon={Globe}
                placeholder="Value (€) - Optional"
                value={form.value}
                onChange={(value) => setForm({ ...form, value: value.replace(/[^0-9.]/g, '') })}
                type="text"
                inputMode="decimal"
              />
            </div>

            <ModernButton
              variant="primary"
              fullWidth
              onClick={handleCalculate}
              disabled={!form.fromCity || !form.toCity || !form.weight || !form.parcelType || parseFloat(form.weight) > 20}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Price
            </ModernButton>
          </div>
        </ModernCard>

        {/* Results */}
        {calculation && (
          <div className="space-y-4">
            <ModernCard className="gradient-accent">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-black dark:text-black mb-2">
                  €{calculation.total.toFixed(2)}
                </div>
                <div className="text-black/70 dark:text-black/70">Total shipping cost</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-semibold text-black dark:text-black">{calculation.estimatedTime}</div>
                  <div className="text-sm text-black/70 dark:text-black/70">Delivery time</div>
                </div>
                <div>
                  <div className="font-semibold text-black dark:text-black">{calculation.availableTravelers}</div>
                  <div className="text-sm text-black/70 dark:text-black/70">Available travelers</div>
                </div>
              </div>
            </ModernCard>

            <ModernCard>
              <h4 className="font-semibold text-text-primary mb-4">Price Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Fixed rate ({form.weight}kg × €{PRICING.SENDER_RATE_PER_KG})</span>
                  <span className="font-semibold text-text-primary">€{calculation.basePrice.toFixed(2)}</span>
                </div>
                {calculation.insurance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Optional insurance (€{PRICING.OPTIONAL_INSURANCE_PER_KG}/kg)</span>
                    <span className="font-semibold text-text-primary">€{calculation.insurance.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border-light pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-text-primary text-lg">You Pay</span>
                    <span className="font-bold text-2xl text-primary">€{calculation.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </ModernCard>

            <div className="grid grid-cols-2 gap-4">
              <ModernButton
                variant="outline"
                fullWidth
                onClick={() => setCalculation(null)}
              >
                Recalculate
              </ModernButton>
              <ModernButton
                variant="primary"
                fullWidth
                onClick={() => {
                  const params = new URLSearchParams({
                    from: form.fromCity,
                    to: form.toCity,
                    weight: form.weight,
                    type: form.parcelType
                  });
                  navigate(`/search?${params.toString()}`);
                }}
              >
                Find Travelers
              </ModernButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
