
-- Admin users table
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- 'admin', 'support', 'manager'
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs for tracking all important activities
CREATE TABLE activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  admin_id INTEGER,
  entity_type TEXT NOT NULL, -- 'parcel', 'trip', 'user', 'transaction'
  entity_id INTEGER NOT NULL,
  action TEXT NOT NULL, -- 'created', 'updated', 'status_changed', 'matched', etc.
  details TEXT, -- JSON string with additional details
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages for admin-user communication
CREATE TABLE chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL, -- unique identifier for conversation
  sender_type TEXT NOT NULL, -- 'admin', 'user'
  sender_id INTEGER NOT NULL,
  recipient_type TEXT NOT NULL, -- 'admin', 'user'
  recipient_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'image', 'file'
  is_read BOOLEAN DEFAULT FALSE,
  parcel_id INTEGER, -- optional reference to related parcel
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tracking updates for parcels
CREATE TABLE tracking_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parcel_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  updated_by_admin_id INTEGER,
  updated_by_user_id INTEGER,
  latitude REAL,
  longitude REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin sessions for authentication
CREATE TABLE admin_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_recipient ON chat_messages(recipient_type, recipient_id);
CREATE INDEX idx_tracking_updates_parcel ON tracking_updates(parcel_id);
CREATE INDEX idx_admin_sessions_token ON admin_sessions(token);
