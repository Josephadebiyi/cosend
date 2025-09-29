import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Star, Package, ArrowLeft, Globe } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import PillSelect from '@/react-app/components/PillSelect';
import { CITIES, PRICING } from '@/shared/types';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState(searchParams.get('from') || '');
  const [toCity, setToCity] = useState(searchParams.get('to') || '');
  const [availableTravelers, setAvailableTravelers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mockTravelers = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 4.9,
      totalDeliveries: 23,
      route: 'London → Paris',
      date: 'Dec 28',
      availableKg: 5,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'SM',
      verified: true,
    },
    {
      id: 2,
      name: 'Marcus K.',
      rating: 4.8,
      totalDeliveries: 15,
      route: 'Berlin → Rome',
      date: 'Dec 30',
      availableKg: 3,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'MK',
      verified: true,
    },
    {
      id: 3,
      name: 'Elena R.',
      rating: 4.9,
      totalDeliveries: 31,
      route: 'Madrid → Barcelona',
      date: 'Jan 2',
      availableKg: 7,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'ER',
      verified: true,
    },
    {
      id: 4,
      name: 'James W.',
      rating: 4.7,
      totalDeliveries: 12,
      route: 'Amsterdam → Berlin',
      date: 'Jan 5',
      availableKg: 4,
      price: PRICING.SENDER_RATE_PER_KG,
      avatar: 'JW',
      verified: false,
    },
  ];

  useEffect(() => {
    if (fromCity && toCity) {
      setLoading(true);
      setTimeout(() => {
        const filtered = mockTravelers.filter(traveler => 
          traveler.route.toLowerCase().includes(fromCity.toLowerCase()) &&
          traveler.route.toLowerCase().includes(toCity.toLowerCase())
        );
        setAvailableTravelers(filtered);
        setLoading(false);
      }, 800);
    }
  }, [fromCity, toCity]);

  const handleSearch = () => {
    if (fromCity && toCity) {
      setLoading(true);
      setTimeout(() => {
        const filtered = mockTravelers.filter(traveler => 
          traveler.route.toLowerCase().includes(fromCity.toLowerCase()) &&
          traveler.route.toLowerCase().includes(toCity.toLowerCase())
        );
        setAvailableTravelers(filtered);
        setLoading(false);
      }, 800);
    }
  };

  const handleSelectTraveler = (traveler: any) => {
    navigate(`/ride-details/${traveler.id}?from=${fromCity}&to=${toCity}`);
  };

  const handleCreateAlert = () => {
    // Store alert in localStorage for demo
    const alertData = {
      id: Date.now().toString(),
      from: fromCity,
      to: toCity,
      created: new Date().toISOString(),
      active: true
    };
    
    const existingAlerts = JSON.parse(localStorage.getItem('travel_alerts') || '[]');
    existingAlerts.push(alertData);
    localStorage.setItem('travel_alerts', JSON.stringify(existingAlerts));
    
    // Show success message
    alert(`Alert created for ${fromCity} → ${toCity}!\n\nYou'll be notified when travelers are available on this route.`);
    
    // Simulate notification after 3 seconds
    setTimeout(() => {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.unshift({
        id: Date.now().toString(),
        title: 'New Traveler Available!',
        message: `A traveler is now available for ${fromCity} → ${toCity}`,
        type: 'alert',
        read: false,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Show notification popup
      alert('🔔 New traveler found for your route! Check notifications.');
    }, 3000);
  };

  const cityOptions = CITIES.map(city => ({
    value: city,
    label: city,
    flag: '🇪🇺',
  }));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border-light px-4 py-4 flex items-center shadow-soft">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-background-hover rounded-xl transition-colors mr-3"
        >
          <ArrowLeft size={24} className="text-text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-text-primary">Find Travelers</h1>
      </div>
      
      <div className="max-w-md mx-auto px-6 py-6">
        {/* Search Form */}
        <ModernCard className="mb-6">
          <h3 className="font-semibold text-text-primary mb-4">Search Route</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <PillSelect
                icon={Globe}
                placeholder="From"
                value={fromCity}
                onChange={setFromCity}
                options={cityOptions}
              />
              <PillSelect
                icon={MapPin}
                placeholder="To"
                value={toCity}
                onChange={setToCity}
                options={cityOptions}
              />
            </div>
            <ModernButton 
              variant="primary" 
              fullWidth 
              onClick={handleSearch}
              disabled={!fromCity || !toCity || loading}
              loading={loading}
            >
              Search Travelers
            </ModernButton>
          </div>
        </ModernCard>

        {/* Results */}
        {loading ? (
          <ModernCard className="text-center py-8">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-background-secondary rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-background-secondary rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-background-secondary rounded w-1/2 mx-auto"></div>
            </div>
          </ModernCard>
        ) : availableTravelers.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">
                Available Travelers ({availableTravelers.length})
              </h3>
              <span className="text-primary text-sm font-semibold">
                {fromCity} → {toCity}
              </span>
            </div>

            {availableTravelers.map((traveler) => (
              <ModernCard key={traveler.id} hover onClick={() => handleSelectTraveler(traveler)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="relative">
                      <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center text-text-on-primary font-bold mr-4">
                        {traveler.avatar}
                      </div>
                      {traveler.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-bold text-text-primary mr-2">{traveler.name}</h4>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-accent mr-1 fill-current" />
                          <span className="text-sm font-semibold text-text-secondary">{traveler.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <Package className="w-4 h-4 mr-1" />
                        {traveler.totalDeliveries} deliveries
                      </div>
                      <div className="flex items-center text-sm text-text-primary font-medium">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        {traveler.route}
                      </div>
                      <div className="text-sm text-text-muted mt-1">
                        {traveler.date} • {traveler.availableKg}kg available
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-2xl text-primary">€{traveler.price}</div>
                    <div className="text-xs text-text-muted">per kg</div>
                    <ModernButton 
                      variant="primary" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => handleSelectTraveler(traveler)}
                    >
                      Send Request
                    </ModernButton>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        ) : fromCity && toCity ? (
          <ModernCard className="text-center py-8">
            <Package className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">No travelers found</h3>
            <p className="text-text-secondary text-sm mb-4">
              No travelers available for {fromCity} → {toCity}
            </p>
            <ModernButton 
              variant="primary" 
              size="sm"
              onClick={handleCreateAlert}
            >
              Create Alert
            </ModernButton>
          </ModernCard>
        ) : null}
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
