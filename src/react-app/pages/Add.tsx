import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, Plane, MapPin, Calendar, Weight, CreditCard, ArrowLeft, Globe, Flag, Scan, Car, Clock } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillInput from '@/react-app/components/PillInput';
import PillSelect from '@/react-app/components/PillSelect';
import { PARCEL_TYPES, calculateShippingPrice, PRICING } from '@/shared/types';

const COUNTRIES = [
  { value: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'FR', label: 'France', flag: '🇫🇷' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪' },
  { value: 'ES', label: 'Spain', flag: '🇪🇸' },
  { value: 'IT', label: 'Italy', flag: '🇮🇹' },
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
  'FR': ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
  'DE': ['Berlin', 'Munich', 'Hamburg', 'Cologne'],
  'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
  'IT': ['Rome', 'Milan', 'Naples', 'Turin'],
};

export default function Add() {
  const [mode, setMode] = useState<'parcel' | 'trip'>('parcel');
  const [sendingType, setSendingType] = useState<'country' | 'city'>('country');
  const [formData, setFormData] = useState({
    fromCountry: '',
    toCountry: '',
    fromCity: '',
    toCity: '',
    weight: 1,
    parcelType: '',
    date: '',
    availableKg: 5,
    description: '',
    travelMode: 'flight', // 'flight' or 'car'
    flightNumber: '',
    departureTime: '',
  });
  const navigate = useNavigate();

  const calculatePrice = (weight: number) => {
    return calculateShippingPrice(weight, false);
  };

  const { basePrice, total } = calculatePrice(formData.weight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    navigate('/');
  };

  const parcelTypeOptions = PARCEL_TYPES.map(type => ({ value: type.value, label: type.label }));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-light px-4 py-4 flex items-center shadow-soft">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-background-light rounded-xl transition-colors mr-3"
        >
          <ArrowLeft size={24} className="text-text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-text-primary">Add New</h1>
      </div>
      
      <div className="instagram-compact px-4 py-4">
        {/* Mode Toggle */}
        <ModernCard className="mb-4">
          <div className="flex bg-background-light rounded-xl p-1">
            <button
              onClick={() => setMode('parcel')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
                mode === 'parcel'
                  ? 'bg-accent accent-text shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Package className="w-4 h-4 mr-2" />
              Sending
            </button>
            <button
              onClick={() => setMode('trip')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
                mode === 'trip'
                  ? 'bg-accent accent-text shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Plane className="w-4 h-4 mr-2" />
              Add Trip
            </button>
          </div>
        </ModernCard>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'parcel' && (
            <>
              {/* Sending Type Selection */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Sending Type
                </h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setSendingType('country')}
                    className={`w-full p-4 rounded-pill border-2 transition-all text-left ${
                      sendingType === 'country'
                        ? 'border-accent bg-accent/10 text-text-primary'
                        : 'border-light bg-background text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Flag className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold">Country to Country</div>
                        <div className="text-sm text-text-muted">Select countries then specific cities</div>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSendingType('city')}
                    className={`w-full p-4 rounded-pill border-2 transition-all text-left ${
                      sendingType === 'city'
                        ? 'border-accent bg-accent/10 text-text-primary'
                        : 'border-light bg-background text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold">City to City</div>
                        <div className="text-sm text-text-muted">Direct city selection within same country</div>
                      </div>
                    </div>
                  </button>
                </div>
              </ModernCard>

              {/* Route Selection */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Route Selection
                </h3>
                <div className="space-y-4">
                  {sendingType === 'country' ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <PillSelect
                          icon={Flag}
                          placeholder="From Country"
                          value={formData.fromCountry}
                          onChange={(value) => setFormData({ ...formData, fromCountry: value, fromCity: '' })}
                          options={COUNTRIES}
                        />
                        <PillSelect
                          icon={Flag}
                          placeholder="To Country"
                          value={formData.toCountry}
                          onChange={(value) => setFormData({ ...formData, toCountry: value, toCity: '' })}
                          options={COUNTRIES}
                        />
                      </div>
                      
                      {formData.fromCountry && (
                        <PillSelect
                          icon={MapPin}
                          placeholder="From City"
                          value={formData.fromCity}
                          onChange={(value) => setFormData({ ...formData, fromCity: value })}
                          options={CITIES_BY_COUNTRY[formData.fromCountry]?.map(city => ({ value: city, label: city })) || []}
                        />
                      )}
                      
                      {formData.toCountry && (
                        <PillSelect
                          icon={MapPin}
                          placeholder="To City"
                          value={formData.toCity}
                          onChange={(value) => setFormData({ ...formData, toCity: value })}
                          options={CITIES_BY_COUNTRY[formData.toCountry]?.map(city => ({ value: city, label: city })) || []}
                        />
                      )}
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <PillSelect
                        icon={MapPin}
                        placeholder="From City"
                        value={formData.fromCity}
                        onChange={(value) => setFormData({ ...formData, fromCity: value })}
                        options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                      />
                      <PillSelect
                        icon={MapPin}
                        placeholder="To City"
                        value={formData.toCity}
                        onChange={(value) => setFormData({ ...formData, toCity: value })}
                        options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                      />
                    </div>
                  )}
                </div>
              </ModernCard>

              {/* Parcel Details */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" />
                  Parcel Details
                </h3>
                <div className="space-y-4">
                  <PillSelect
                    icon={Package}
                    placeholder="Parcel Type"
                    value={formData.parcelType}
                    onChange={(value) => setFormData({ ...formData, parcelType: value })}
                    options={parcelTypeOptions}
                  />
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-3">
                      Weight: {formData.weight}kg
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-background-light rounded-pill appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(formData.weight / 10) * 100}%, var(--background-light) ${(formData.weight / 10) * 100}%, var(--background-light) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-text-muted mt-1">
                      <span>0.5kg</span>
                      <span>10kg</span>
                    </div>
                  </div>

                  <PillInput
                    icon={Scan}
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                  />
                </div>
              </ModernCard>

              {/* Price Breakdown */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Price Breakdown
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Fixed rate ({formData.weight}kg × €{PRICING.SENDER_RATE_PER_KG})</span>
                    <span className="font-semibold text-text-primary">€{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-light pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-text-primary">You Pay</span>
                      <span className="text-primary">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </>
          )}

          {mode === 'trip' && (
            <>
              {/* Date Selection */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Travel Date
                </h3>
                <PillInput
                  icon={Calendar}
                  placeholder="Travel date"
                  type="date"
                  value={formData.date}
                  onChange={(value) => setFormData({ ...formData, date: value })}
                />
              </ModernCard>

              {/* Route Selection for Trip */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Travel Route
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <PillSelect
                    icon={MapPin}
                    placeholder="From City"
                    value={formData.fromCity}
                    onChange={(value) => setFormData({ ...formData, fromCity: value })}
                    options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                  />
                  <PillSelect
                    icon={MapPin}
                    placeholder="To City"
                    value={formData.toCity}
                    onChange={(value) => setFormData({ ...formData, toCity: value })}
                    options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                  />
                </div>
              </ModernCard>

              {/* Travel Mode Selection */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-primary" />
                  Travel Mode
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, travelMode: 'flight', flightNumber: '' })}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.travelMode === 'flight'
                        ? 'border-primary bg-primary/10 text-text-primary'
                        : 'border-border-light bg-background text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <Plane className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-sm">Flight</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, travelMode: 'car', flightNumber: '' })}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.travelMode === 'car'
                        ? 'border-primary bg-primary/10 text-text-primary'
                        : 'border-border-light bg-background text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <Car className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-sm">Car</div>
                  </button>
                </div>
                
                {formData.travelMode === 'flight' && (
                  <div className="space-y-3">
                    <PillInput
                      icon={Plane}
                      placeholder="Flight number (e.g. LH456)"
                      value={formData.flightNumber}
                      onChange={(value) => setFormData({ ...formData, flightNumber: value })}
                    />
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                      <div className="flex items-center text-primary mb-1">
                        <Scan className="w-4 h-4 mr-2" />
                        <span className="font-medium text-sm">AI Flight Verification</span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        Flight details will be automatically verified against airline databases for authenticity and schedule accuracy.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <PillInput
                    icon={Clock}
                    placeholder="Departure time"
                    type="time"
                    value={formData.departureTime}
                    onChange={(value) => setFormData({ ...formData, departureTime: value })}
                  />
                </div>
              </ModernCard>

              {/* Available Capacity */}
              <ModernCard>
                <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Weight className="w-5 h-5 mr-2 text-primary" />
                  Available Capacity
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Available space: {formData.availableKg}kg
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={formData.availableKg}
                    onChange={(e) => setFormData({ ...formData, availableKg: parseInt(e.target.value) })}
                    className="w-full h-2 bg-background-light rounded-pill appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(formData.availableKg / 20) * 100}%, var(--background-light) ${(formData.availableKg / 20) * 100}%, var(--background-light) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-text-muted mt-1">
                    <span>1kg</span>
                    <span>20kg</span>
                  </div>
                  <div className="mt-4 bg-accent/20 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold accent-text mb-1">
                      €{(formData.availableKg * PRICING.TRAVELER_PAYOUT_PER_KG).toFixed(2)}
                    </div>
                    <div className="accent-text text-sm">Your guaranteed earnings</div>
                  </div>
                </div>
              </ModernCard>
            </>
          )}

          <ModernButton type="submit" variant="accent" fullWidth className="mt-8">
            {mode === 'parcel' ? 'Create Parcel Request' : 'List Trip'}
          </ModernButton>
        </form>
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
