import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, Plane, MapPin, Star, ArrowRight, Globe, Calendar, Search, Bell, Users, X, CheckCircle, Clock, Flag } from 'lucide-react';
import { CITIES, calculateShippingPrice, PRICING } from '@/shared/types';
import { useTranslation } from '@/react-app/utils/i18n';

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

import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillSelect from '@/react-app/components/PillSelect';
import PillInput from '@/react-app/components/PillInput';
import ThemeToggle from '@/react-app/components/ThemeToggle';
import TravelerProfileModal from '@/react-app/components/TravelerProfileModal';
import RequestModal from '@/react-app/components/RequestModal';

import PlatformMessage from '@/react-app/components/PlatformMessage';

export default function Home() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'send' | 'carry'>('send');
  const [homeMode, setHomeMode] = useState<'main' | 'carry-form'>('main');
  const [sendingType, setSendingType] = useState<'country' | 'city'>('country');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState<any>(null);
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  
  const [sendForm, setSendForm] = useState({
    fromCountry: '',
    toCountry: '',
    fromCity: '',
    toCity: '',
    parcelType: '',
    weight: 1,
  });
  
  const [carryForm, setCarryForm] = useState({
    fromCity: '',
    toCity: '',
    travelDate: '',
    availableKg: 5,
    departureTime: '',
  });
  
  const navigate = useNavigate();

  const mockTrips = [
    {
      id: 1,
      name: 'Sarah M.',
      traveler: 'Sarah M.',
      rating: 4.9,
      route: 'London → Paris',
      date: 'Dec 28',
      availableKg: 5,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'SM',
      verified: true,
      totalTrips: 23,
      joinDate: '2023-03-15',
    },
    {
      id: 2,
      name: 'Marcus K.',
      traveler: 'Marcus K.',
      rating: 4.8,
      route: 'Berlin → Rome',
      date: 'Dec 30',
      availableKg: 3,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'MK',
      verified: true,
      totalTrips: 18,
      joinDate: '2023-07-22',
    },
  ];

  const mockParcelRequests = [
    {
      id: 1,
      sender: 'Alex P.',
      route: 'Madrid → Barcelona',
      weight: 2,
      type: 'Documents',
      payment: 18.56,
      avatar: 'AP',
      verified: true,
      pickupAddress: '123 Main St, Madrid',
      dropoffAddress: '456 Park Ave, Barcelona',
      description: 'Important business documents - handle with care',
      deadline: '2024-12-30',
      status: 'pending',
    },
    {
      id: 2,
      sender: 'Emma L.',
      route: 'Amsterdam → Berlin',
      weight: 1.5,
      type: 'Electronics',
      payment: 13.92,
      avatar: 'EL',
      verified: false,
      pickupAddress: '789 Tech Blvd, Amsterdam',
      dropoffAddress: '321 Innovation St, Berlin',
      description: 'Small electronic device, fragile packaging',
      deadline: '2025-01-05',
      status: 'pending',
    },
  ];

  const cityOptions = CITIES.map(city => ({
    value: city,
    label: city,
    flag: '🇪🇺',
  }));

  const parcelTypeOptions = [
    { value: 'documents', label: 'Documents' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fragile', label: 'Fragile Items' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'books', label: 'Books' },
    { value: 'gifts', label: 'Small Gifts' },
    { value: 'other', label: 'Other' },
  ];

  const declineReasons = [
    'Trip was canceled',
    'Route changed',
    'No longer traveling',
    'Insufficient capacity',
    'Other',
  ];

  const calculatePrice = (weight: number) => {
    return calculateShippingPrice(weight, false);
  };

  const priceCalc = calculatePrice(sendForm.weight);

  const handleTabChange = (tab: 'send' | 'carry') => {
    setActiveTab(tab);
    if (tab === 'carry') {
      setHomeMode('carry-form');
    } else {
      setHomeMode('main');
    }
  };

  const handleAcceptRequest = (request: any) => {
    navigate(`/pickup-details/${request.id}`);
  };

  const handleDeclineRequest = (request: any) => {
    setSelectedRequest(request);
    setShowDeclineModal(true);
  };

  const submitDecline = () => {
    console.log('Declined request:', selectedRequest.id, 'Reason:', declineReason);
    setShowDeclineModal(false);
    setSelectedRequest(null);
    setDeclineReason('');
  };

  const handleRequestShipping = (traveler: any) => {
    setSelectedTraveler(traveler);
    setShowTravelerModal(false);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = (requestData: any) => {
    console.log('Shipping request submitted:', requestData);
    
    // Check KYC status first
    const isKYCCompleted = localStorage.getItem('kyc_completed') === 'true';
    
    if (!isKYCCompleted) {
      // Redirect to KYC if not completed
      navigate('/kyc');
      return;
    }
    
    // Close request modal and show success message
    setShowRequestModal(false);
    
    // Show success notification with tracking number
    alert(`Request sent successfully! Tracking Number: ${requestData.trackingNumber}\n\nThe traveler will be notified and you can chat once they accept your request.`);
    
    // Simulate acceptance after a short delay for demo purposes
    setTimeout(() => {
      // In a real app, this would come from a backend notification
      const userConfirm = confirm('Good news! The traveler has accepted your request. Would you like to start chatting?');
      if (userConfirm) {
        setShowChatModal(true);
      }
    }, 2000);
  };

  const submitCarryListing = () => {
    console.log('Creating carry listing:', carryForm);
    setHomeMode('main');
    navigate('/my-listings');
  };

  if (homeMode === 'carry-form') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-background px-6 py-8 pt-12">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setHomeMode('main')}
                className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center shadow-soft hover:shadow-medium transition-all"
              >
                <X className="w-5 h-5 text-text-primary" />
              </button>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">List Your Travel</div>
                <div className="text-sm text-text-secondary">Earn by carrying packages</div>
              </div>
              <div className="w-12"></div>
            </div>
          </div>
        </div>

        <div className="instagram-compact px-4 -mt-4">
          <ModernCard className="mb-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-text-primary text-xl mb-2">Share Your Journey</h3>
                <p className="text-text-secondary">Help others send packages while you travel and earn money</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <PillSelect
                  icon={Globe}
                  placeholder="From"
                  value={carryForm.fromCity}
                  onChange={(value) => setCarryForm({ ...carryForm, fromCity: value })}
                  options={cityOptions}
                />
                <PillSelect
                  icon={MapPin}
                  placeholder="To"
                  value={carryForm.toCity}
                  onChange={(value) => setCarryForm({ ...carryForm, toCity: value })}
                  options={cityOptions}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <PillInput
                  icon={Calendar}
                  placeholder="Travel date"
                  type="date"
                  value={carryForm.travelDate}
                  onChange={(value) => setCarryForm({ ...carryForm, travelDate: value })}
                />
                <PillInput
                  icon={Clock}
                  placeholder="Time"
                  type="time"
                  value={carryForm.departureTime}
                  onChange={(value) => setCarryForm({ ...carryForm, departureTime: value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Available capacity: {carryForm.availableKg}kg
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={carryForm.availableKg}
                  onChange={(e) => setCarryForm({ ...carryForm, availableKg: parseInt(e.target.value) })}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(carryForm.availableKg / 20) * 100}%, var(--border-light) ${(carryForm.availableKg / 20) * 100}%, var(--border-light) 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-text-muted mt-1">
                  <span>1kg</span>
                  <span>20kg</span>
                </div>
              </div>

              <ModernCard variant="secondary" className="gradient-accent text-center">
                <div className="text-2xl font-bold accent-text mb-1">
                  €{(carryForm.availableKg * PRICING.TRAVELER_PAYOUT_PER_KG).toFixed(2)}
                </div>
                <div className="accent-text text-sm">Your earnings</div>
                <div className="text-xs accent-text opacity-70 mt-1">€{PRICING.TRAVELER_PAYOUT_PER_KG}/kg guaranteed payout</div>
              </ModernCard>

              <div className="space-y-3">
                <ModernButton
                  variant="primary"
                  fullWidth
                  onClick={submitCarryListing}
                  disabled={!carryForm.fromCity || !carryForm.toCity || !carryForm.travelDate}
                >
                  List My Travel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ModernButton>
                <ModernButton
                  variant="outline"
                  fullWidth
                  onClick={() => setHomeMode('main')}
                >
                  Cancel
                </ModernButton>
              </div>
            </div>
          </ModernCard>
        </div>

        <ModernBottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Location */}
      <div className="bg-background px-4 py-6 pt-12">
        <div className="instagram-compact">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Good morning!</div>
                <div className="font-semibold text-text-primary text-lg">New York, USA</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center shadow-soft hover:shadow-medium transition-all relative">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-soft hover:shadow-medium transition-all"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-xl object-cover"
                />
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search destinations or packages..."
                className="w-full bg-background-card rounded-2xl pl-12 pr-4 py-4 text-text-primary placeholder-text-muted border border-border-light focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-soft hover:shadow-medium transition-all"
              />
            </div>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-background-card rounded-2xl p-1 shadow-soft border border-border-light">
            <button
              onClick={() => handleTabChange('send')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'send'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-hover'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              {t('home.send_package')}
            </button>
            <button
              onClick={() => handleTabChange('carry')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'carry'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-hover'
              }`}
            >
              <Plane className="w-4 h-4 inline mr-2" />
              {t('home.carry_package')}
            </button>
          </div>
        </div>
      </div>

      <div className="instagram-compact px-4 -mt-4 relative z-10">
        {/* Current Shipment */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">{t('home.current_shipment')}</h3>
          <ModernCard className="gradient-accent border-accent/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-black dark:text-black">Mac Mini M4 Pro</div>
                <div className="text-xs text-black/70 dark:text-black/70">ID: H314315796</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-black/70 dark:text-black/70 mb-1">📍 Location</div>
                <div className="font-semibold text-black dark:text-black">Jersey City</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-black/70 dark:text-black/70 mb-1">⏰ Delivery Time</div>
                <div className="font-semibold text-black dark:text-black">1:13 Hours</div>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-black dark:text-black text-sm font-bold mr-3">S</div>
              <div className="flex-1 mx-3 bg-black/20 rounded-full h-2 overflow-hidden">
                <div className="bg-black dark:bg-black h-full rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
              </div>
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-black/50 dark:bg-black/50 rounded-full"></div>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => navigate('/search?type=travelers')}
            className="bg-background-card rounded-xl p-3 text-center hover:bg-primary/5 hover:shadow-elevated hover:border-primary/20 transition-all shadow-soft interactive border border-border-light group"
          >
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
              <Users className="w-3 h-3 text-white" />
            </div>
            <div className="font-medium text-xs text-text-primary group-hover:text-primary transition-colors">{t('home.find_travelers')}</div>
          </button>
          <button
            onClick={() => navigate('/tracking')}
            className="bg-background-card rounded-xl p-3 text-center hover:bg-primary/5 hover:shadow-elevated hover:border-primary/20 transition-all shadow-soft interactive border border-border-light group"
          >
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-all">
              <MapPin className="w-3 h-3 text-white transition-colors" />
            </div>
            <div className="font-medium text-xs text-text-primary group-hover:text-primary transition-colors">Track</div>
          </button>
        </div>

        {/* Main Form for Send Package */}
        {activeTab === 'send' && (
          <ModernCard className="mb-6">
            <div className="space-y-6">
              <h3 className="font-semibold text-text-primary text-lg">{t('home.send_package')}</h3>
              
              {/* Sending Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-text-primary">Sending Type</label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => setSendingType('country')}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      sendingType === 'country'
                        ? 'border-primary bg-primary/10 text-text-primary'
                        : 'border-border-light bg-background-card text-text-secondary hover:border-primary/50'
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
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      sendingType === 'city'
                        ? 'border-primary bg-primary/10 text-text-primary'
                        : 'border-border-light bg-background-card text-text-secondary hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold">City to City</div>
                        <div className="text-sm text-text-muted">Direct city selection</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Route Selection */}
              <div className="space-y-4">
                {sendingType === 'country' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <PillSelect
                        icon={Flag}
                        placeholder="From Country"
                        value={sendForm.fromCountry}
                        onChange={(value) => setSendForm({ ...sendForm, fromCountry: value, fromCity: '' })}
                        options={COUNTRIES}
                      />
                      <PillSelect
                        icon={Flag}
                        placeholder="To Country"
                        value={sendForm.toCountry}
                        onChange={(value) => setSendForm({ ...sendForm, toCountry: value, toCity: '' })}
                        options={COUNTRIES}
                      />
                    </div>
                    
                    {sendForm.fromCountry && (
                      <PillSelect
                        icon={MapPin}
                        placeholder="From City"
                        value={sendForm.fromCity}
                        onChange={(value) => setSendForm({ ...sendForm, fromCity: value })}
                        options={CITIES_BY_COUNTRY[sendForm.fromCountry]?.map(city => ({ value: city, label: city })) || []}
                      />
                    )}
                    
                    {sendForm.toCountry && (
                      <PillSelect
                        icon={MapPin}
                        placeholder="To City"
                        value={sendForm.toCity}
                        onChange={(value) => setSendForm({ ...sendForm, toCity: value })}
                        options={CITIES_BY_COUNTRY[sendForm.toCountry]?.map(city => ({ value: city, label: city })) || []}
                      />
                    )}
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <PillSelect
                      icon={MapPin}
                      placeholder="From City"
                      value={sendForm.fromCity}
                      onChange={(value) => setSendForm({ ...sendForm, fromCity: value })}
                      options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                    />
                    <PillSelect
                      icon={MapPin}
                      placeholder="To City"
                      value={sendForm.toCity}
                      onChange={(value) => setSendForm({ ...sendForm, toCity: value })}
                      options={Object.values(CITIES_BY_COUNTRY).flat().map(city => ({ value: city, label: city }))}
                    />
                  </div>
                )}
              </div>

              <PillSelect
                icon={Package}
                placeholder="Parcel type"
                value={sendForm.parcelType}
                onChange={(value) => setSendForm({ ...sendForm, parcelType: value })}
                options={parcelTypeOptions}
              />

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Weight: {sendForm.weight}kg
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={sendForm.weight}
                  onChange={(e) => setSendForm({ ...sendForm, weight: parseFloat(e.target.value) })}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(sendForm.weight / 20) * 100}%, var(--border-light) ${(sendForm.weight / 20) * 100}%, var(--border-light) 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-text-muted mt-1">
                  <span>0.5kg</span>
                  <span>20kg max</span>
                </div>
              </div>

              <div className="space-y-4">
                <ModernCard variant="secondary" className="bg-background-secondary">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">Fixed rate ({sendForm.weight}kg × €{PRICING.SENDER_RATE_PER_KG})</span>
                    <span className="font-semibold text-text-primary">€{priceCalc.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border-light pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-text-primary text-lg">You Pay</span>
                      <span className="font-bold text-2xl text-primary">€{priceCalc.total.toFixed(2)}</span>
                    </div>
                  </div>
                </ModernCard>
                
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    💡 Add optional insurance for €{PRICING.OPTIONAL_INSURANCE_PER_KG}/kg during checkout
                  </p>
                </div>
              </div>

              <PlatformMessage className="mt-4" />

              <ModernButton
                variant="primary"
                fullWidth
                onClick={() => {
                  if (sendForm.fromCity && sendForm.toCity) {
                    const params = new URLSearchParams({
                      from: sendForm.fromCity,
                      to: sendForm.toCity,
                      weight: sendForm.weight.toString(),
                      type: sendForm.parcelType
                    });
                    navigate(`/search?${params.toString()}`);
                  }
                }}
                disabled={!sendForm.fromCity || !sendForm.toCity}
              >
                {t('home.find_travelers')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </ModernButton>
            </div>
          </ModernCard>
        )}

        {/* Available Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary text-lg">
              {activeTab === 'send' ? t('home.available_travelers') : t('home.parcel_requests')}
            </h3>
            <button className="text-primary text-sm font-semibold hover:underline hover:text-primary-hover transition-all">
              See all
            </button>
          </div>

          {activeTab === 'send' ? (
            <div className="space-y-3">
              {mockTrips.map((trip) => (
                <ModernCard 
                  key={trip.id} 
                  hover 
                  className="bg-background-card cursor-pointer"
                  onClick={() => {
                    setSelectedTraveler(trip);
                    setShowTravelerModal(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-text-on-primary font-bold mr-3 text-sm">
                          {trip.avatar}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-semibold text-text-primary">{trip.traveler}</span>
                            {trip.verified && (
                              <CheckCircle className="w-4 h-4 ml-2 text-primary dark:text-white dark:bg-primary dark:rounded-full dark:p-0.5" />
                            )}
                          </div>
                          <div className="flex items-center text-sm text-text-secondary">
                            <Star className="w-3 h-3 text-accent mr-1 fill-current" />
                            {trip.rating} • {trip.totalTrips} completed trips
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary mb-1">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        {trip.route}
                      </div>
                      <div className="text-sm text-text-muted">{trip.date} • {trip.availableKg}kg available</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-text-primary">€{trip.price}</div>
                      <div className="text-xs text-text-muted">per kg</div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockParcelRequests.map((request) => (
                <ModernCard key={request.id} className="bg-background-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-text-on-primary font-bold mr-4">
                          {request.avatar}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-semibold text-text-primary">{request.sender}</span>
                            {request.verified && (
                              <CheckCircle className="w-4 h-4 ml-2 text-primary dark:text-white dark:bg-primary dark:rounded-full dark:p-0.5" />
                            )}
                          </div>
                          <div className="text-sm text-text-secondary">{request.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        {request.route}
                      </div>
                      <div className="text-sm text-text-muted mb-2">{request.weight}kg • Deadline: {new Date(request.deadline).toLocaleDateString()}</div>
                      <div className="text-sm text-text-secondary">{request.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-primary mb-2">€{request.payment}</div>
                      <div className="text-xs text-text-muted mb-3">your earnings</div>
                      <div className="space-y-2">
                        <ModernButton 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleAcceptRequest(request)}
                          className="w-full"
                        >
                          Accept
                        </ModernButton>
                        <ModernButton 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeclineRequest(request)}
                          className="w-full"
                        >
                          Decline
                        </ModernButton>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <ModernCard className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Decline Request</h3>
              <button 
                onClick={() => setShowDeclineModal(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <X className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-text-secondary">Please select a reason for declining this parcel request:</p>
              
              <div className="space-y-2">
                {declineReasons.map((reason) => (
                  <label key={reason} className="flex items-center p-3 bg-background-secondary rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors">
                    <input
                      type="radio"
                      value={reason}
                      checked={declineReason === reason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      className="mr-3 accent-primary"
                    />
                    <span className="text-text-primary">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <ModernButton 
                variant="primary" 
                fullWidth 
                onClick={submitDecline}
                disabled={!declineReason}
              >
                Submit Decline
              </ModernButton>
              <ModernButton 
                variant="outline" 
                fullWidth 
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Traveler Profile Modal */}
      {selectedTraveler && (
        <TravelerProfileModal
          isOpen={showTravelerModal}
          onClose={() => {
            setShowTravelerModal(false);
            setSelectedTraveler(null);
          }}
          traveler={selectedTraveler}
          onRequestShipping={() => handleRequestShipping(selectedTraveler)}
        />
      )}

      {/* Request Modal */}
      {selectedTraveler && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedTraveler(null);
          }}
          traveler={selectedTraveler}
          onSubmit={handleSubmitRequest}
        />
      )}

      {/* Navigate to Chat Page */}
      {showChatModal && selectedTraveler && (() => {
        const chatParams = new URLSearchParams({
          userId: selectedTraveler.id.toString(),
          userName: selectedTraveler.name || selectedTraveler.traveler,
          userAvatar: selectedTraveler.avatar,
        });
        navigate(`/chat?${chatParams.toString()}`);
        setShowChatModal(false);
        return null;
      })()}

      <ModernBottomNavigation />
    </div>
  );
}
