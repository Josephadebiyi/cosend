import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Star, Package, ArrowLeft, Globe, Filter, Search, Car, Plane } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillSelect from '@/react-app/components/PillSelect';

interface Traveler {
  id: number;
  name: string;
  rating: number;
  totalDeliveries: number;
  route: string;
  date: string;
  availableKg: number;
  price: number;
  avatar: string;
  verified: boolean;
  fromCountry: string;
  toCountry: string;
  fromCity: string;
  toCity: string;
  travelMode: 'car' | 'flight';
}

const COUNTRIES = [
  { value: '', label: 'All Countries' },
  { value: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'FR', label: 'France', flag: '🇫🇷' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪' },
  { value: 'ES', label: 'Spain', flag: '🇪🇸' },
  { value: 'IT', label: 'Italy', flag: '🇮🇹' },
  { value: 'NL', label: 'Netherlands', flag: '🇳🇱' },
];

export default function TravelersPage() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mockTravelers: Traveler[] = [
    {
      id: 1,
      name: 'Sarah',
      rating: 4.9,
      totalDeliveries: 23,
      route: 'London → Paris',
      date: 'Dec 28',
      availableKg: 5,
      price: 8,
      avatar: 'S',
      verified: true,
      fromCountry: 'UK',
      toCountry: 'FR',
      fromCity: 'London',
      toCity: 'Paris',
      travelMode: 'flight',
    },
    {
      id: 2,
      name: 'Marcus',
      rating: 4.8,
      totalDeliveries: 15,
      route: 'Berlin → Rome',
      date: 'Dec 30',
      availableKg: 3,
      price: 8,
      avatar: 'M',
      verified: true,
      fromCountry: 'DE',
      toCountry: 'IT',
      fromCity: 'Berlin',
      toCity: 'Rome',
      travelMode: 'flight',
    },
    {
      id: 3,
      name: 'Elena',
      rating: 4.9,
      totalDeliveries: 31,
      route: 'Madrid → Barcelona',
      date: 'Jan 2',
      availableKg: 7,
      price: 8,
      avatar: 'E',
      verified: true,
      fromCountry: 'ES',
      toCountry: 'ES',
      fromCity: 'Madrid',
      toCity: 'Barcelona',
      travelMode: 'car',
    },
    {
      id: 4,
      name: 'James',
      rating: 4.7,
      totalDeliveries: 12,
      route: 'Amsterdam → Berlin',
      date: 'Jan 5',
      availableKg: 4,
      price: 8,
      avatar: 'J',
      verified: false,
      fromCountry: 'NL',
      toCountry: 'DE',
      fromCity: 'Amsterdam',
      toCity: 'Berlin',
      travelMode: 'car',
    },
    {
      id: 5,
      name: 'Sofia',
      rating: 4.9,
      totalDeliveries: 28,
      route: 'Paris → London',
      date: 'Jan 8',
      availableKg: 6,
      price: 8,
      avatar: 'S',
      verified: true,
      fromCountry: 'FR',
      toCountry: 'UK',
      fromCity: 'Paris',
      toCity: 'London',
      travelMode: 'flight',
    },
    {
      id: 6,
      name: 'Miguel',
      rating: 4.6,
      totalDeliveries: 19,
      route: 'Barcelona → Milan',
      date: 'Jan 10',
      availableKg: 8,
      price: 8,
      avatar: 'M',
      verified: true,
      fromCountry: 'ES',
      toCountry: 'IT',
      fromCity: 'Barcelona',
      toCity: 'Milan',
      travelMode: 'flight',
    },
  ];

  const filteredTravelers = mockTravelers.filter(traveler => {
    const matchesLocation = !searchLocation || 
      traveler.route.toLowerCase().includes(searchLocation.toLowerCase()) ||
      traveler.fromCity.toLowerCase().includes(searchLocation.toLowerCase()) ||
      traveler.toCity.toLowerCase().includes(searchLocation.toLowerCase());
    
    const matchesCountry = !filterCountry || 
      traveler.fromCountry === filterCountry || 
      traveler.toCountry === filterCountry;

    return matchesLocation && matchesCountry;
  });

  const handleSelectTraveler = (traveler: Traveler) => {
    navigate(`/book?traveler=${traveler.id}&from=${traveler.fromCity}&to=${traveler.toCity}`);
  };

  return (
    <div className="min-h-screen bg-secondary text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-secondary border-b border-white/10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-white">Available Travelers</div>
          <div className="text-sm text-white/70">{filteredTravelers.length} travelers found</div>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Filter className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search by location or city..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm rounded-full pl-12 pr-4 py-4 text-white placeholder-white/50 border border-white/20 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white/5 rounded-3xl p-6 space-y-4">
              <h3 className="font-semibold text-white">Filters</h3>
              <PillSelect
                icon={Globe}
                placeholder="Filter by Country"
                value={filterCountry}
                onChange={setFilterCountry}
                options={COUNTRIES}
              />
            </div>
          )}
        </div>

        {/* Location Info */}
        <div className="bg-primary rounded-3xl p-6 mb-6 text-center">
          <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Your Location</h2>
          <p className="text-white/70">Shibgoinj, Sylhet</p>
          <p className="text-white/60 text-sm mt-2">Showing travelers worldwide</p>
        </div>

        {/* Travelers List */}
        <div className="space-y-4">
          {filteredTravelers.length > 0 ? (
            filteredTravelers.map((traveler) => (
              <ModernCard 
                key={traveler.id} 
                hover 
                onClick={() => handleSelectTraveler(traveler)}
                className="bg-white/5 border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="relative">
                      <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {traveler.avatar}
                      </div>
                      {traveler.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-secondary text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-bold text-white mr-2">{traveler.name}</h4>
                        <div className="flex items-center">
                          {traveler.travelMode === 'flight' ? (
                            <Plane className="w-4 h-4 text-accent mr-2" />
                          ) : (
                            <Car className="w-4 h-4 text-accent mr-2" />
                          )}
                          <Star className="w-4 h-4 text-accent mr-1 fill-current" />
                          <span className="text-sm font-semibold text-white/80">{traveler.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-white/60 mb-2">
                        <Package className="w-4 h-4 mr-1" />
                        {traveler.totalDeliveries} deliveries
                      </div>
                      <div className="flex items-center text-sm text-white font-medium">
                        <MapPin className="w-4 h-4 mr-1 text-accent" />
                        {traveler.route}
                      </div>
                      <div className="text-sm text-white/60 mt-1">
                        {traveler.date} • {traveler.availableKg}kg available
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-2xl text-accent">€{traveler.price}</div>
                    <div className="text-xs text-white/60">per kg</div>
                    <ModernButton 
                      variant="accent" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => handleSelectTraveler(traveler)}
                    >
                      Send Request
                    </ModernButton>
                  </div>
                </div>
              </ModernCard>
            ))
          ) : (
            <ModernCard className="text-center py-8 bg-white/5 border-white/10">
              <Package className="w-12 h-12 text-white/50 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">No travelers found</h3>
              <p className="text-white/60 text-sm mb-4">
                Try adjusting your search or filters
              </p>
              <ModernButton variant="accent" size="sm" onClick={() => {
                setSearchLocation('');
                setFilterCountry('');
              }}>
                Clear Filters
              </ModernButton>
            </ModernCard>
          )}
        </div>

        {/* Create Alert */}
        <div className="bg-accent/10 rounded-3xl p-6 mt-6 text-center">
          <h3 className="font-bold text-white mb-2">Don't see your route?</h3>
          <p className="text-white/70 text-sm mb-4">
            Create an alert and we'll notify you when a traveler is going your way
          </p>
          <ModernButton variant="accent" onClick={() => navigate('/create-alert')}>
            Create Route Alert
          </ModernButton>
        </div>
      </div>
    </div>
  );
}
