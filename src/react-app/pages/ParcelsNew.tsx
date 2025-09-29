import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';

interface Parcel {
  id: string;
  trackingNumber: string;
  route: string;
  status: 'In Progress' | 'Delivered';
  eta: string;
  origin: string;
  destination: string;
  progress: number;
}

export default function ParcelsNew() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'All' | 'In Progress' | 'Delivered'>('All');
  
  const [parcels] = useState<Parcel[]>([
    {
      id: '1',
      trackingNumber: '#KA08J9192',
      route: 'USA → Canada',
      status: 'In Progress',
      eta: '25 March, 2024',
      origin: 'USA',
      destination: 'Canada',
      progress: 75,
    },
    {
      id: '2',
      trackingNumber: '#KA0898192',
      route: 'USA → India',
      status: 'Delivered',
      eta: '5 March, 2024',
      origin: 'USA',
      destination: 'India',
      progress: 100,
    },
    {
      id: '3',
      trackingNumber: '#GWQ8J9192',
      route: 'India → Canada',
      status: 'Delivered',
      eta: '28 Feb, 2024',
      origin: 'India',
      destination: 'Canada',
      progress: 100,
    },
    {
      id: '4',
      trackingNumber: '#WRJUR19145',
      route: 'UK → Germany',
      status: 'In Progress',
      eta: '30 March, 2024',
      origin: 'UK',
      destination: 'Germany',
      progress: 45,
    },
  ]);

  const filteredParcels = parcels.filter(parcel => {
    if (activeFilter === 'All') return true;
    return parcel.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-6 pt-12 rounded-b-3xl">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-2xl font-bold text-black">Parcels</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-3">
          {(['All', 'In Progress', 'Delivered'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {filter === 'In Progress' ? 'In - Progress' : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Parcels List */}
        <div className="space-y-4">
          {filteredParcels.map((parcel, index) => {
            if (parcel.status === 'In Progress') {
              return (
                <div 
                  key={parcel.id}
                  onClick={() => navigate(`/parcel-tracking/${parcel.id}`)}
                  className="bg-blue-500 rounded-3xl p-6 text-white cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <div className="text-xl font-bold mb-4">{parcel.trackingNumber}</div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-lg">{parcel.origin}</div>
                    <div className="text-lg">{parcel.destination}</div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-6 relative">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="flex-1 mx-4 h-0.5 border-t-2 border-dotted border-white"></div>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 mx-4 h-0.5 border-t-2 border-dotted border-white"></div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-80 mb-1">Status</div>
                      <div className="font-bold">In Transit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80 mb-1">ETA</div>
                      <div className="font-bold">{parcel.eta}</div>
                    </div>
                  </div>
                </div>
              );
            } else if (parcel.status === 'Delivered' && index === 1) {
              // Second delivered item - black card
              return (
                <div 
                  key={parcel.id}
                  onClick={() => navigate(`/parcel-tracking/${parcel.id}`)}
                  className="bg-black rounded-3xl p-6 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-bold">{parcel.trackingNumber}</div>
                    <div className="text-lg">{parcel.destination}</div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="text-lg mr-4">{parcel.origin}</div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="flex-1 h-0.5 border-t-2 border-dotted border-white mr-4"></div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-80 mb-1">Status</div>
                      <div className="font-bold">Delivered</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80 mb-1">ETA</div>
                      <div className="font-bold">{parcel.eta}</div>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Regular white card for other delivered items
              return (
                <div 
                  key={parcel.id}
                  onClick={() => navigate(`/parcel-tracking/${parcel.id}`)}
                  className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="text-xl font-bold text-black mb-4">{parcel.trackingNumber}</div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-lg text-black">{parcel.origin}</div>
                    <div className="text-lg text-black">{parcel.destination}</div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="flex-1 mx-4 h-0.5 border-t-2 border-dotted border-gray-400"></div>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Status</div>
                      <div className="font-bold text-black">Delivered</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">ETA</div>
                      <div className="font-bold text-black">{parcel.eta}</div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Empty State */}
        {filteredParcels.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-black mb-2">No parcels found</h3>
            <p className="text-gray-500 text-sm">
              No parcels match the selected filter
            </p>
          </div>
        )}
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
