export const CITIES = [
  'London',
  'Paris',
  'Berlin',
  'Madrid',
  'Rome',
  'Amsterdam',
  'Barcelona',
  'Vienna',
  'Prague',
  'Warsaw',
  'Budapest',
  'Dublin',
  'Stockholm',
  'Copenhagen',
  'Helsinki',
  'Oslo',
  'Brussels',
  'Zurich',
  'Munich',
  'Milan',
  'Naples',
  'Valencia',
  'Seville',
  'Porto',
  'Lisbon',
  'Athens',
  'Zagreb',
  'Ljubljana',
  'Bratislava',
  'Bucharest',
];

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  user_type: 'sender' | 'traveler' | 'both';
  verified: boolean;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: number;
  traveler_id: number;
  from_city: string;
  to_city: string;
  departure_date: string;
  departure_time?: string;
  available_kg: number;
  used_kg: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Parcel {
  id: number;
  sender_id: number;
  trip_id?: number;
  from_city: string;
  to_city: string;
  parcel_type: string;
  weight_kg: number;
  price_euros: number;
  service_fee_euros: number;
  status: 'created' | 'matched' | 'picked_up' | 'in_transit' | 'delivered';
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  parcel_id: number;
  sender_id: number;
  traveler_id?: number;
  amount_euros: number;
  service_fee_euros: number;
  traveler_payout_euros: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  paypal_transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export const PARCEL_TYPES = [
  { value: 'documents', label: 'Documents' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fragile', label: 'Fragile Items' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'books', label: 'Books' },
  { value: 'gifts', label: 'Small Gifts' },
  { value: 'other', label: 'Other' },
];

// New Fixed Pricing Structure
export const PRICING = {
  SENDER_RATE_PER_KG: 8,           // €8/kg - what senders pay
  TRAVELER_PAYOUT_PER_KG: 5,      // €5/kg - what travelers earn
  PLATFORM_FEE_PER_KG: 3,         // €3/kg - platform commission (8-5=3)
  OPTIONAL_INSURANCE_PER_KG: 0.5,  // €0.50/kg - optional insurance
};

// Legacy constants for backward compatibility
export const PRICE_PER_KG = PRICING.SENDER_RATE_PER_KG;
export const SERVICE_FEE_PERCENTAGE = PRICING.PLATFORM_FEE_PER_KG / PRICING.SENDER_RATE_PER_KG; // 37.5%

// Platform Protection
export const PLATFORM_MESSAGE = "Fixed sender rate: €8/kg. Optional insurance €0.50/kg. Conduct all communications and payments inside the app. Attempts to bypass the platform will be flagged and may result in account suspension.";

export const FLAGGED_KEYWORDS = [
  "meet outside app",
  "pay me directly",
  "bank transfer",
  "cash outside",
  "private deal",
  "skip platform",
  "outside app",
  "off the books",
  "ignore fees",
  "no fee",
  "free deal",
  "pay later",
  "deal in person",
  "send outside platform",
  "contact outside",
  "WhatsApp",
  "Telegram",
  "Signal",
  "DM me",
  "text me",
  "message me",
  "email me directly",
  "call me",
  "phone number",
  "personal contact",
  "Venmo",
  "PayPal",
  "Zelle",
  "CashApp",
  "crypto",
  "outside Cosend",
  "outside system",
  "platform bypass",
  "swap outside app",
  "trade outside",
  "meet at my place",
  "home delivery outside",
  "no platform fee",
  "save fee",
  "skip charges"
];

// Pricing calculation helper
export const calculateShippingPrice = (weightKg: number, includeInsurance: boolean = false) => {
  const basePrice = weightKg * PRICING.SENDER_RATE_PER_KG;
  const travelerPayout = weightKg * PRICING.TRAVELER_PAYOUT_PER_KG;
  const platformFee = weightKg * PRICING.PLATFORM_FEE_PER_KG;
  const insurance = includeInsurance ? weightKg * PRICING.OPTIONAL_INSURANCE_PER_KG : 0;
  
  return {
    basePrice,
    travelerPayout,
    platformFee,
    insurance,
    total: basePrice + insurance,
    breakdown: {
      senderPays: basePrice + insurance,
      travelerEarns: travelerPayout,
      platformEarns: platformFee,
      insuranceCost: insurance,
    }
  };
};

// Keyword detection utility
export const detectFlaggedContent = (text: string): boolean => {
  const lowercaseText = text.toLowerCase();
  return FLAGGED_KEYWORDS.some(keyword => 
    lowercaseText.includes(keyword.toLowerCase())
  );
};

export const getFlaggedKeywords = (text: string): string[] => {
  const lowercaseText = text.toLowerCase();
  return FLAGGED_KEYWORDS.filter(keyword => 
    lowercaseText.includes(keyword.toLowerCase())
  );
};
