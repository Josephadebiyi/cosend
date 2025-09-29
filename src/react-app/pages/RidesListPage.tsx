import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, User, Car, Clock, Filter, Search, Plane } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import PillInput from '@/react-app/components/PillInput';

interface Ride {
  id: number;
  driverId: string;
  driverName: string;
  driverRating: number;
  driverPhoto?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
  fromLocation: string;
  toLocation: string;
  fromAddress: string;
  toAddress: string;
  vehicleType: string;
  vehicleModel?: string;
  travelMode: 'car' | 'flight';
  comfortLevel?: 'basic' | 'comfort' | 'premium';
  verified: boolean;
  instantBooking: boolean;
}

export default function RidesListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filterDate, setFilterDate] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const fromCity = searchParams.get('from') || 'Paris';
  const toCity = searchParams.get('to') || 'Berlin';

  // Mock data for rides (like BlaBlaCar)
  const mockRides: Ride[] = [
    {
      id: 1,
      driverId: 'sarah_m',
      driverName: 'Sarah M.',
      driverRating: 4.9,
      driverPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=64&h=64&fit=crop&crop=face',
      departureTime: '14:30',
      arrivalTime: '20:45',
      duration: '6h 15m',
      pricePerSeat: 45,
      availableSeats: 2,
      totalSeats: 4,
      fromLocation: fromCity,
      toLocation: toCity,
      fromAddress: 'Gare du Nord Station',
      toAddress: 'Berlin Hauptbahnhof',
      vehicleType: 'Sedan',
      vehicleModel: 'BMW 3 Series',
      travelMode: 'car',
      comfortLevel: 'comfort',
      verified: true,
      instantBooking: true,
    },
    {
      id: 2,
      driverId: 'marcus_k',
      driverName: 'Marcus K.',
      driverRating: 4.8,
      driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      departureTime: '09:15',
      arrivalTime: '11:30',
      duration: '2h 15m',
      pricePerSeat: 120,
      availableSeats: 1,
      totalSeats: 1,
      fromLocation: fromCity,
      toLocation: toCity,
      fromAddress: 'Charles de Gaulle Airport',
      toAddress: 'Berlin Brandenburg Airport',
      vehicleType: 'Flight',
      vehicleModel: 'Lufthansa A320',
      travelMode: 'flight',
      comfortLevel: 'premium',
      verified: true,
      instantBooking: false,
    },
    {
      id: 3,
      driverId: 'elena_r',
      driverName: 'Elena R.',
      driverRating: 4.9,
      driverPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      departureTime: '16:00',
      arrivalTime: '22:30',
      duration: '6h 30m',
      pricePerSeat: 38,
      availableSeats: 3,
      totalSeats: 4,
      fromLocation: fromCity,
      toLocation: toCity,
      fromAddress: 'Place de la République',
      toAddress: 'Alexanderplatz',
      vehicleType: 'SUV',
      vehicleModel: 'Audi Q5',
      travelMode: 'car',
      comfortLevel: 'comfort',
      verified: true,
      instantBooking: true,
    },
    {
      id: 4,
      driverId: 'james_w',
      driverName: 'James W.',
      driverRating: 4.7,
      driverPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      departureTime: '18:45',
      arrivalTime: '01:15',
      duration: '6h 30m',
      pricePerSeat: 42,
      availableSeats: 1,
      totalSeats: 3,
      fromLocation: fromCity,
      toLocation: toCity,
      fromAddress: 'Châtelet-Les Halles',
      toAddress: 'Berlin Central Station',
      vehicleType: 'Hatchback',
      vehicleModel: 'Volkswagen Golf',
      travelMode: 'car',
      comfortLevel: 'basic',
      verified: false,
      instantBooking: false,
    },
  ];

  const handleRideSelect = (ride: Ride) => {
    navigate(`/ride-details/${ride.id}?from=${fromCity}&to=${toCity}`);
  };

  const getComfortIcon = (comfort?: string) => {
    switch (comfort) {
      case 'premium': return '✈️';
      case 'comfort': return '🚗';
      case 'basic': return '🚙';
      default: return '🚗';
    }
  };

  const sortedRides = [...mockRides].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.pricePerSeat - b.pricePerSeat;
      case 'time': return a.departureTime.localeCompare(b.departureTime);
      case 'rating': return b.driverRating - a.driverRating;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Professional Header with Search Summary */}
      <div className="bg-background px-6 py-6 pt-12 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-background-light rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">Available Rides</div>
            <div className="text-sm text-text-secondary">{sortedRides.length} rides found</div>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-background-light rounded-xl transition-colors"
          >
            <Filter className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {/* Professional Search Summary Card */}
        <div className="bg-accent rounded-2xl p-6 mb-6 text-center">
          <div className="text-2xl font-bold text-black mb-2">{fromCity} → {toCity}</div>
          <div className="text-black/70 text-sm">Today • {sortedRides.length} rides available</div>
        </div>

        {/* Professional Filter/Sort Bar */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <button 
            onClick={() => setSortBy('price')}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all ${
              sortBy === 'price' 
                ? 'bg-accent text-black shadow-lg transform scale-105' 
                : 'bg-secondary text-text-primary hover:bg-background-light border border-white/10'
            }`}
          >
            💰 Cheapest First
          </button>
          <button 
            onClick={() => setSortBy('time')}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all ${
              sortBy === 'time' 
                ? 'bg-accent text-black shadow-lg transform scale-105' 
                : 'bg-secondary text-text-primary hover:bg-background-light border border-white/10'
            }`}
          >
            ⏰ Earliest Departure
          </button>
          <button 
            onClick={() => setSortBy('rating')}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all ${
              sortBy === 'rating' 
                ? 'bg-accent text-black shadow-lg transform scale-105' 
                : 'bg-secondary text-text-primary hover:bg-background-light border border-white/10'
            }`}
          >
            ⭐ Highest Rated
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Advanced Filters */}
        {showFilters && (
          <ModernCard className="mb-6">
            <h3 className="font-semibold text-text-primary mb-4">Filters</h3>
            <div className="space-y-4">
              <PillInput
                icon={Search}
                placeholder="Departure date"
                type="date"
                value={filterDate}
                onChange={setFilterDate}
              />
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Price Range: €{priceRange[0]} - €{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-background-light rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </ModernCard>
        )}

        {/* Professional BlaBlaCar-Style Rides List */}
        <div className="space-y-4">
          {sortedRides.map((ride) => (
            <div
              key={ride.id}
              onClick={() => handleRideSelect(ride)}
              className="bg-secondary border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-background-light transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Main Ride Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {/* Time & Duration */}
                  <div className="flex items-center mb-2">
                    <div className="text-2xl font-bold text-text-primary mr-3">
                      {ride.departureTime}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{ride.duration}</span>
                    </div>
                    <div className="text-lg font-semibold text-text-primary ml-auto">
                      {ride.arrivalTime}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center text-sm text-text-secondary mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    <span className="mr-2">{ride.fromAddress}</span>
                    <span className="text-text-muted">→</span>
                    <span className="ml-2">{ride.toAddress}</span>
                  </div>

                  {/* Driver & Vehicle Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Driver */}
                      <div className="flex items-center mr-4">
                        <div className="relative">
                          {ride.driverPhoto ? (
                            <img 
                              src={ride.driverPhoto} 
                              alt={ride.driverName}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                              {ride.driverName.charAt(0)}
                            </div>
                          )}
                          {ride.verified && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-black text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-text-primary text-sm">{ride.driverName}</div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-accent mr-1 fill-current" />
                            <span className="text-xs text-text-secondary">{ride.driverRating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle */}
                      <div className="flex items-center text-xs text-text-secondary">
                        {ride.travelMode === 'flight' ? (
                          <Plane className="w-4 h-4 mr-1" />
                        ) : (
                          <Car className="w-4 h-4 mr-1" />
                        )}
                        <span>{ride.vehicleModel || ride.vehicleType}</span>
                        <span className="ml-2">{getComfortIcon(ride.comfortLevel)}</span>
                      </div>
                    </div>

                    {/* Seats & Instant Booking */}
                    <div className="text-right">
                      <div className="text-xs text-text-secondary mb-1">
                        {ride.availableSeats} of {ride.totalSeats} seats left
                      </div>
                      {ride.instantBooking && (
                        <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                          ⚡ Instant
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price - Professional Highlight */}
                <div className="text-right ml-6">
                  <div className="bg-accent rounded-2xl px-4 py-3 text-center mb-3">
                    <div className="text-2xl font-bold text-black">€{ride.pricePerSeat}</div>
                    <div className="text-xs text-black/70">per seat</div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRideSelect(ride);
                    }}
                    className="w-full bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/80 transition-colors"
                  >
                    Book Seat
                  </button>
                </div>
              </div>

              {/* Professional Amenities Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-text-secondary">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-status-success/20 text-status-success px-2 py-1 rounded-full">
                    <span className="mr-1">🎒</span>
                    <span>Luggage OK</span>
                  </div>
                  <div className="flex items-center bg-background-light px-2 py-1 rounded-full">
                    <span className="mr-1">🚫</span>
                    <span>No Smoking</span>
                  </div>
                  {ride.travelMode === 'car' && (
                    <div className="flex items-center bg-primary/20 text-primary px-2 py-1 rounded-full">
                      <span className="mr-1">⛽</span>
                      <span>Fuel Shared</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center bg-accent/20 text-accent px-2 py-1 rounded-full">
                  <User className="w-3 h-3 mr-1" />
                  <span className="font-semibold">{ride.totalSeats - ride.availableSeats} booked</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional No Results State */}
        {sortedRides.length === 0 && (
          <div className="bg-secondary border border-white/10 rounded-3xl p-12 text-center">
            <Car className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-3">No rides available</h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search criteria or check back later for new rides
            </p>
            <button 
              onClick={() => navigate(-1)}
              className="bg-accent text-black px-8 py-3 rounded-2xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Modify Search
            </button>
          </div>
        )}

        {/* Professional Call-to-Action */}
        <div className="bg-primary rounded-3xl p-8 mt-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Don't see the perfect ride?</h3>
          <p className="text-white/80 mb-6">
            Create a personalized alert and we'll notify you the moment a matching ride becomes available
          </p>
          <button 
            onClick={() => navigate('/create-alert')}
            className="bg-accent text-black px-8 py-4 rounded-2xl font-bold hover:bg-accent/90 transition-colors text-lg"
          >
            🔔 Create Ride Alert
          </button>
        </div>
      </div>
    </div>
  );
}
