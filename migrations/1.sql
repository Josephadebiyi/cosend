
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  user_type TEXT, -- 'sender', 'traveler', or 'both'
  verified BOOLEAN DEFAULT FALSE,
  rating REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  traveler_id INTEGER NOT NULL,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TEXT,
  available_kg REAL NOT NULL,
  used_kg REAL DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parcels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  trip_id INTEGER,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  parcel_type TEXT NOT NULL,
  weight_kg REAL NOT NULL,
  price_euros REAL NOT NULL,
  service_fee_euros REAL NOT NULL,
  status TEXT DEFAULT 'created', -- 'created', 'matched', 'picked_up', 'in_transit', 'delivered'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parcel_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  traveler_id INTEGER,
  amount_euros REAL NOT NULL,
  service_fee_euros REAL NOT NULL,
  traveler_payout_euros REAL NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  paypal_transaction_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trips_traveler ON trips(traveler_id);
CREATE INDEX idx_trips_route ON trips(from_city, to_city);
CREATE INDEX idx_parcels_sender ON parcels(sender_id);
CREATE INDEX idx_parcels_trip ON parcels(trip_id);
CREATE INDEX idx_transactions_parcel ON transactions(parcel_id);
